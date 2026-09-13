/* =========================================================
   CV Interactivo - Alan Nilz Ticona Ramos
   Tecnologías Web I - SIS-214
   Funcionalidades:
   - Modo claro/oscuro con persistencia
   - Menú responsive (hamburguesa)
   - Validación del formulario de contacto
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- 1. MODO CLARO / OSCURO ---------- */
    const botonModo = document.getElementById("boton_modo");

    // Recuperar preferencia guardada
    if (localStorage.getItem("tema") === "oscuro") {
        document.body.classList.add("modo_oscuro");
        botonModo.textContent = "☀️ modo claro";
    }

    botonModo.addEventListener("click", () => {
        document.body.classList.toggle("modo_oscuro");
        const oscuro = document.body.classList.contains("modo_oscuro");
        botonModo.textContent = oscuro ? "☀️ modo claro" : "🌙 modo oscuro";
        localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
    });


    /* ---------- 2. MENÚ HAMBURGUESA ---------- */
    const botonMenu = document.getElementById("boton_menu");
    const listaMenu = document.getElementById("menu_lista");

    if (botonMenu && listaMenu) {
        botonMenu.addEventListener("click", () => {
            const abierto = listaMenu.classList.toggle("activo");
            botonMenu.setAttribute("aria-expanded", abierto);
        });

        // Cerrar menú al hacer clic en un enlace
        listaMenu.querySelectorAll("a").forEach(enlace => {
            enlace.addEventListener("click", () => {
                listaMenu.classList.remove("activo");
                botonMenu.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* ---------- 3. VALIDACIÓN DEL FORMULARIO ---------- */
    const formulario = document.getElementById("formulario_contacto");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");
    const mensajeForm = document.getElementById("mensaje_formulario");

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mostrarError(input, idError, texto) {
        document.getElementById(idError).textContent = texto;
        input.classList.add("error");
    }

    function limpiarError(input, idError) {
        document.getElementById(idError).textContent = "";
        input.classList.remove("error");
    }

    // Validación en tiempo real (mientras escribe)
    nombre.addEventListener("input", () => {
        if (nombre.value.trim().length >= 3)
            limpiarError(nombre, "error_nombre");
    });

    correo.addEventListener("input", () => {
        if (regexCorreo.test(correo.value.trim()))
            limpiarError(correo, "error_correo");
    });

    mensaje.addEventListener("input", () => {
        if (mensaje.value.trim().length >= 10)
            limpiarError(mensaje, "error_mensaje");
    });

    // Envío del formulario
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;
        mensajeForm.textContent = "";

        // Validar nombre
        if (nombre.value.trim().length < 3) {
            mostrarError(nombre, "error_nombre", "el nombre debe tener al menos 3 caracteres");
            valido = false;
        } else {
            limpiarError(nombre, "error_nombre");
        }

        // Validar correo
        if (!regexCorreo.test(correo.value.trim())) {
            mostrarError(correo, "error_correo", "ingresa un correo electrónico válido");
            valido = false;
        } else {
            limpiarError(correo, "error_correo");
        }

        // Validar mensaje
        if (mensaje.value.trim().length < 10) {
            mostrarError(mensaje, "error_mensaje", "el mensaje debe tener al menos 10 caracteres");
            valido = false;
        } else {
            limpiarError(mensaje, "error_mensaje");
        }

        // Si todo está bien
        if (valido) {
            mensajeForm.textContent = "✅ ¡Mensaje enviado correctamente!";
            formulario.reset();
            setTimeout(() => {
                mensajeForm.textContent = "";
            }, 5000);
        }
    });

});