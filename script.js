/* ==========================================
   FECHA DEL MOMENTO ESPECIAL
   27 DE SEPTIEMBRE DE 2026 - 8:26 AM
========================================== */

const fechaObjetivo = new Date(
    "2026-09-27T08:26:00-05:00"
);


/* ==========================================
   ELEMENTOS
========================================== */

const inicio = document.getElementById("inicio");
const contador = document.getElementById("contador");
const transicion = document.getElementById("transicion");
const carta = document.getElementById("carta");

const btnEntrar = document.getElementById("btnEntrar");
const btnFinal = document.getElementById("btnFinal");

const musica = document.getElementById("musica");


/* ==========================================
   ELEMENTOS DEL RELOJ
========================================== */

const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");


/* ==========================================
   VARIABLE DEL CONTADOR
========================================== */

let intervalo;


/* ==========================================
   ENTRAR
========================================== */

btnEntrar.addEventListener("click", () => {

    inicio.classList.add("oculto");

    contador.classList.remove("oculto");

    iniciarContador();

});


/* ==========================================
   CONTADOR
========================================== */

function iniciarContador() {

    actualizarContador();

    intervalo = setInterval(actualizarContador, 1000);

}


function actualizarContador() {

    const ahora = new Date();

    const diferencia = fechaObjetivo - ahora;


    /* ==============================
       CUANDO LLEGA A LAS 8:26
    ============================== */

    if (diferencia <= 0) {

        clearInterval(intervalo);

        dias.textContent = "00";
        horas.textContent = "00";
        minutos.textContent = "00";
        segundos.textContent = "00";

        mostrarFinal();

        return;
    }


    /* ==============================
       CALCULAR TIEMPO
    ============================== */

    const diasRestantes = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horasRestantes = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutosRestantes = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );

    const segundosRestantes = Math.floor(
        (diferencia / 1000) % 60
    );


    dias.textContent = formato(diasRestantes);
    horas.textContent = formato(horasRestantes);
    minutos.textContent = formato(minutosRestantes);
    segundos.textContent = formato(segundosRestantes);

}


/* ==========================================
   FORMATO 01, 02, 03...
========================================== */

function formato(numero) {

    return String(numero).padStart(2, "0");

}


/* ==========================================
   MOSTRAR FINAL
========================================== */

function mostrarFinal() {

    /* Ocultar contador */

    contador.classList.add("oculto");


    /* Mostrar ojos */

    transicion.classList.remove("oculto");


    /* Intentar reproducir música */

    reproducirMusica();


    /* Después de 5 segundos aparece la carta */

    setTimeout(() => {

        transicion.classList.add("oculto");

        carta.classList.remove("oculto");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 5000);

}


/* ==========================================
   MÚSICA
========================================== */

function reproducirMusica() {

    if (!musica) {
        console.log("No se encontró el elemento de música.");
        return;
    }

    musica.currentTime = 0;

    musica.play().catch((error) => {

        console.log(
            "El navegador bloqueó la reproducción automática:",
            error
        );

    });

}


/* ==========================================
   BOTÓN "VER FINAL AHORA"
========================================== */

btnFinal.addEventListener("click", () => {

    clearInterval(intervalo);

    mostrarFinal();

});
