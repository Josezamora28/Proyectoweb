// script.js - Versión mejorada para responsive
document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVBAR TOGGLE =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.padding = '15px 0';
                navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.97)';
                navbar.style.padding = '18px 0';
                navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
            }
        }
    });

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ===== ELEVATOR ANIMATION =====
    function initElevatorAnimation() {
        const cabin = document.querySelector('.elevator-cabin');
        const doors = document.querySelector('.elevator-doors');
        const leftDoor = document.querySelector('.door.left');
        const rightDoor = document.querySelector('.door.right');
        const doorLight = document.querySelector('.door-light');
        
        // Verificar que todos los elementos existen
        if (!cabin || !doors || !leftDoor || !rightDoor || !doorLight) {
            console.log('Elementos del ascensor no encontrados');
            return;
        }
        
        let isMoving = false;
        
        const animateElevator = () => {
            if (isMoving) return;
            isMoving = true;
            
            // 1. Abrir puertas al inicio (piso 1)
            setTimeout(() => {
                leftDoor.style.transform = 'translateX(-90%)';
                rightDoor.style.transform = 'translateX(90%)';
                doorLight.style.opacity = '1';
            }, 1000);
            
            // 2. Cerrar puertas después de 3 segundos
            setTimeout(() => {
                leftDoor.style.transform = 'translateX(0)';
                rightDoor.style.transform = 'translateX(0)';
                doorLight.style.opacity = '0';
                
                // 3. Subir con puertas cerradas después de 2 segundos
                setTimeout(() => {
                    cabin.style.bottom = '150px';
                    doors.style.bottom = '150px';
                    
                    // 4. Bajar con puertas cerradas después de 5 segundos
                    setTimeout(() => {
                        cabin.style.bottom = '20px';
                        doors.style.bottom = '20px';
                        
                        // 5. Abrir puertas al llegar abajo después de 2 segundos
                        setTimeout(() => {
                            leftDoor.style.transform = 'translateX(-90%)';
                            rightDoor.style.transform = 'translateX(90%)';
                            doorLight.style.opacity = '1';
                            
                            // 6. Reiniciar animación después de 3 segundos
                            setTimeout(() => {
                                isMoving = false;
                                setTimeout(animateElevator, 1000);
                            }, 3000);
                        }, 2000);
                    }, 5000);
                }, 2000);
            }, 4000);
        };
        
        // Start animation
        setTimeout(animateElevator, 1000);
    }

    // Inicializar animación del ascensor
    initElevatorAnimation();

    // ===== FORM HANDLING =====
    const contactForm = document.getElementById('infoForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío (reemplazar con tu lógica real)
            setTimeout(() => {
                alert('¡Gracias por su interés! Nos pondremos en contacto con usted pronto.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== CLIENT DATA LOADING =====
    const clients = [
        {
            name: "Restaurante Ruiz",
            project: "Fabricación de Montaplato 4 pisos",
            capacity: "Montaplato 150 kg",
            location: "Iquitos",
            image: "img/Brochure IMEC (1)_page7_image.png"
        },
        {
            name: "Sunat",
            project: "Vigas de izaje para Monta auto",
            capacity: "Monta auto 3000 kg",
            location: "Lima, distrito de Miraflores",
            image: "img/Brochure IMEC (1)_page8_image.png"
        },
        {
            name: "Clínica Xaron Renal",
            project: "Estructura para Montacamilla",
            capacity: "Monta camilla 1800 kg",
            location: "Ica",
            image: "img/Brochure IMEC (1)_page9_image.png"
        },
        {
            name: "Ingeniería y Construcciones HMBA S.A.C",
            project: "UNFV 2 Estructura para Ascensor",
            capacity: "Ascensor 800 kg",
            location: "Lima, Magdalena",
            image: "img/Brochure IMEC (1)_page10_image.png"
        },
        {
            name: "Citadela",
            project: "Montaplato",
            capacity: "Montaplato 150 kg",
            location: "Lima, Lurín",
            image: "img/Brochure IMEC (1)_page11_image.png"
        },
        {
            name: "Gobierno Regional de Lima",
            project: "Mantenimiento correctivo y preventivo",
            capacity: "Ascensor 800 kg",
            location: "Lima, Huacho",
            image: "img/Brochure IMEC (1)_page12_image.png"
        }
    ];

    // Cargar clientes
    const clientsGrid = document.querySelector('.clients-grid');

    if (clientsGrid) {
        clients.forEach(client => {
            const clientCard = document.createElement('div');
            clientCard.className = 'client-card animate-on-scroll';
            clientCard.innerHTML = `
                <div class="client-image-container">
                    <img src="${client.image}" alt="${client.name}" class="client-image" loading="lazy">
                    <div class="client-image-overlay"></div>
                </div>
                <div class="client-content">
                    <h3>${client.name}</h3>
                    <p><i class="fas fa-project-diagram client-icon"></i><strong>Proyecto:</strong> ${client.project}</p>
                    <p><i class="fas fa-weight client-icon"></i><strong>Capacidad:</strong> ${client.capacity}</p>
                    <p><i class="fas fa-map-marker-alt client-icon"></i><strong>Ubicación:</strong> ${client.location}</p>
                </div>
            `;
            clientsGrid.appendChild(clientCard);
            
            // Observar la nueva tarjeta para animación
            observer.observe(clientCard);
        });
    }

    // ===== IMAGE OPTIMIZATION =====
    function optimizeImages() {
        const images = document.querySelectorAll('.section-image, .service-image-container img');
        
        images.forEach(img => {
            // Agregar loading lazy para mejor rendimiento en móviles
            if (window.innerWidth < 768) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Manejar errores de carga
            img.addEventListener('error', function() {
                console.log('Error cargando imagen:', this.src);
                this.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.innerHTML = '<span style="color: #666; text-align: center;">Imagen no disponible</span>';
            });
        });
    }

    // Optimizar imágenes al cargar
    optimizeImages();

    // Re-optimizar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', optimizeImages);

    console.log('IMEC Elevadores - Sitio cargado correctamente');
});

// ===== FIX CONTENT LAYOUT =====
function fixContentLayout() {
    const contentBlocks = document.querySelectorAll('.content-block');
    
    contentBlocks.forEach(block => {
        const textContent = block.querySelector('.text-content');
        const imageContent = block.querySelector('.image-content');
        
        if (textContent && imageContent) {
            // Asegurar que el contenido de texto tenga el ancho correcto
            textContent.style.flex = '1';
            textContent.style.minWidth = '0'; // Permite que se ajuste
            
            // Asegurar que la imagen se mantenga proporcional
            imageContent.style.flex = '1';
            imageContent.style.minWidth = '0';
        }
    });
}

// Ejecutar al cargar y al redimensionar
document.addEventListener('DOMContentLoaded', fixContentLayout);
window.addEventListener('resize', fixContentLayout);