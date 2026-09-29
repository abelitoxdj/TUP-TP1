document.addEventListener("DOMContentLoaded", () => {
    // 1. Navegación tipo SPA (Single Page Application)
    const enlacesMenu = document.querySelectorAll('.nav-link-custom'); 
    const todasLasSecciones = document.querySelectorAll('main section');

    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', function(evento) {
            evento.preventDefault();
            
            // Cambiar clase activa en los botones del menú
            enlacesMenu.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Ocultar todas las secciones
            todasLasSecciones.forEach(seccion => {
                seccion.classList.remove('seccion-activa');
                seccion.classList.add('seccion-oculta');
            });

            // Mostrar la sección correspondiente
            const idDestino = this.getAttribute('href'); 
            const seccionAMostrar = document.querySelector(idDestino);
            if (seccionAMostrar) {
                seccionAMostrar.classList.remove('seccion-oculta');
                seccionAMostrar.classList.add('seccion-activa');
            }
        });
    });

    // 2. Simulador de Promedio Final
    const btnCalcular = document.getElementById('btn-calcular');
    const resultadoTexto = document.getElementById('resultado-promedio');

    if (btnCalcular) {
        btnCalcular.addEventListener('click', () => {
            const n1 = parseFloat(document.getElementById('nota1').value);
            const n2 = parseFloat(document.getElementById('nota2').value);
            const n3 = parseFloat(document.getElementById('nota3').value);

            if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
                resultadoTexto.innerHTML = `<span class="badge bg-warning text-dark px-3 py-2 fs-6">⚠️ Por favor, ingresa las 3 notas</span>`;
                return;
            }

            const promedio = ((n1 + n2 + n3) / 3).toFixed(2);
            if (promedio >= 6) {
                resultadoTexto.innerHTML = `<span class="badge bg-success px-3 py-2 fs-6">¡Aprobado! Promedio: ${promedio}</span>`;
            } else {
                resultadoTexto.innerHTML = `<span class="badge bg-danger px-3 py-2 fs-6">Desaprobado. Promedio: ${promedio}</span>`;
            }
        });
    }

    // 3. Botón de reiniciar vista
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', (evento) => {
            evento.preventDefault();
            window.location.reload();
        });
    }

    // 4. Imprimir boletín
    const btnImprimirNotas = document.getElementById('btn-imprimir-notas');
    if (btnImprimirNotas) {
        btnImprimirNotas.addEventListener('click', () => window.print());
    }

    // 5. Buscador de materias en tiempo real
    const buscador = document.getElementById('buscador-materias');
    const itemsMateria = document.querySelectorAll('.materia-item');

    if (buscador) {
        buscador.addEventListener('input', (e) => {
            const texto = e.target.value.toLowerCase();
            itemsMateria.forEach(item => {
                const titulo = item.querySelector('.titulo-materia').textContent.toLowerCase();
                item.style.display = titulo.includes(texto) ? 'block' : 'none';
            });
        });
    }

    // 6. Cálculo dinámico de la próxima clase
    function calcularProximaClase() {
        const textoProximaClase = document.getElementById('texto-proxima-clase');
        if (!textoProximaClase) return;

        const ahora = new Date();
        const diaSemana = ahora.getDay(); 
        const horaActual = ahora.getHours();
        const minActual = ahora.getMinutes();
        const tiempoActual = horaActual + (minActual / 60);
        
        const grillaHorarios = [
            { dia: 1, inicio: 14.0, materia: "Programación IV", profe: "TUP Costilla, Georgina" },
            { dia: 1, inicio: 16.0, materia: "Gestión de desarrollo de Software", profe: "Ing. Ayunta, Irene" },
            { dia: 2, inicio: 14.0, materia: "Programación IV", profe: "Ing. Moreno, Javier" },
            { dia: 2, inicio: 16.0, materia: "Legislación", profe: "Dra. Juarez, Ma. Laura" },
            { dia: 3, inicio: 14.0, materia: "Programación IV", profe: "Ing. Moreno, Javier" },
            { dia: 3, inicio: 16.0, materia: "Gestión de desarrollo de Software", profe: "Ing. Ayunta, Irene" },
            { dia: 4, inicio: 14.0, materia: "Metodología de Sistemas II", profe: "Ing. Estrada, Cynthia" },
            { dia: 4, inicio: 16.0, materia: "Introducción al análisis de Datos", profe: "Ing. Trevisan, Gabriel" },
            { dia: 5, inicio: 14.0, materia: "Programación IV", profe: "TUP Costilla, Georgina" },
            { dia: 5, inicio: 16.0, materia: "Metodología de Sistemas II", profe: "Ing. Estrada, Cynthia" }
        ];

        const clasesDeHoy = grillaHorarios.filter(clase => clase.dia === diaSemana && clase.inicio >= tiempoActual);
        clasesDeHoy.sort((a, b) => a.inicio - b.inicio);

        if (diaSemana === 0 || diaSemana === 6) {
            textoProximaClase.innerHTML = '<i class="fa-solid fa-mug-hot me-2"></i> ¡Es fin de semana! No tienes clases programadas.';
            textoProximaClase.className = "alert alert-success border-0 shadow-sm mb-0";
        } else if (clasesDeHoy.length > 0) {
            const proxima = clasesDeHoy[0];
            const horaStr = Math.floor(proxima.inicio);
            const minStr = Math.round((proxima.inicio - horaStr) * 60).toString().padStart(2, '0');
            
            textoProximaClase.innerHTML = `<i class="fa-solid fa-circle-info me-2"></i> Próxima clase: <strong>${proxima.materia}</strong> (${proxima.profe}) a las <strong>${horaStr}:${minStr}</strong> hs.`;
            textoProximaClase.className = "alert alert-primary border-0 shadow-sm mb-0 bg-primary-subtle text-primary";
        } else {
            textoProximaClase.innerHTML = '<i class="fa-solid fa-check-double me-2"></i> ¡Jornada finalizada! Ya no tienes más clases por hoy.';
            textoProximaClase.className = "alert alert-success border-0 shadow-sm mb-0";
        }
    }

    calcularProximaClase();
    setInterval(calcularProximaClase, 60000);

    // 7. Carrusel automático de imágenes en el Inicio
    const contenedorCarrusel = document.querySelector('.hero-carousel');
    if (contenedorCarrusel) {
        const slides = contenedorCarrusel.querySelectorAll('img');
        const contenedorDots = document.getElementById('hero-dots');
        let indiceActual = 0;

        // Crear los puntos indicadores dinámicamente
        slides.forEach((_, i) => {
            const punto = document.createElement('span');
            if (i === 0) punto.classList.add('dot-activo');
            punto.addEventListener('click', () => mostrarSlide(i));
            contenedorDots.appendChild(punto);
        });
        const puntos = contenedorDots.querySelectorAll('span');

        function mostrarSlide(indice) {
            slides[indiceActual].classList.remove('slide-activa');
            puntos[indiceActual].classList.remove('dot-activo');

            indiceActual = indice;

            slides[indiceActual].classList.add('slide-activa');
            puntos[indiceActual].classList.add('dot-activo');
        }

        function siguienteSlide() {
            const siguiente = (indiceActual + 1) % slides.length;
            mostrarSlide(siguiente);
        }

        // Cambia de imagen automáticamente cada 4 segundos
        setInterval(siguienteSlide, 4000);
    }

    // 8. Botón de Configuración: Tema oscuro
    const toggleTema = document.getElementById('toggle-modo-oscuro');
    if (toggleTema) {
        toggleTema.addEventListener('click', (evento) => {
            evento.preventDefault();
            document.body.classList.toggle('tema-oscuro');
            const activado = document.body.classList.contains('tema-oscuro');
            toggleTema.innerHTML = activado
                ? '<i class="fa-solid fa-sun me-2 text-primary"></i> Tema claro'
                : '<i class="fa-solid fa-moon me-2 text-primary"></i> Tema oscuro';
        });
    }

    // 9. Cerrar sesión desde el menú de Configuración
    const btnCerrarSesionMenu = document.getElementById('btn-cerrar-sesion-menu');
    if (btnCerrarSesionMenu) {
        btnCerrarSesionMenu.addEventListener('click', (evento) => {
            evento.preventDefault();
            window.location.reload();
        });
    }

    // 10. Formulario de cambio de contraseña (simulado en cliente)
    const formPassword = document.getElementById('form-password');
    if (formPassword) {
        formPassword.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const modalEl = document.getElementById('modalPassword');
            const modalInstancia = bootstrap.Modal.getInstance(modalEl);
            if (modalInstancia) modalInstancia.hide();
            formPassword.reset();
        });
    }

    // 11. Formulario de Editar Perfil (simulado en cliente)
    const formPerfil = document.getElementById('form-perfil');
    if (formPerfil) {
        formPerfil.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const modalEl = document.getElementById('modalPerfil');
            const modalInstancia = bootstrap.Modal.getInstance(modalEl);
            if (modalInstancia) modalInstancia.hide();
        });
    }

    // 12. Vista previa de la nueva foto de perfil
    const inputFoto = document.getElementById('input-foto-perfil');
    if (inputFoto) {
        inputFoto.addEventListener('change', (evento) => {
            const archivo = evento.target.files[0];
            if (!archivo) return;
            const lector = new FileReader();
            lector.onload = (e) => {
                document.querySelector('#modalPerfil img').src = e.target.result;
            };
            lector.readAsDataURL(archivo);
        });
    }
});