// Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// 🧩 Animación completa del ascensor (puertas + pisos + display)
function enhanceElevatorAnimation() {
    const elevatorDoors = document.querySelector('.elevator-doors');
    const floorIndicators = document.querySelectorAll('.floor-indicator');
    const buttons = document.querySelectorAll('.button');
    const elevatorDisplay = document.querySelector('.elevator-display');

    if (elevatorDoors) {
        // Estado inicial cerrado
        elevatorDoors.classList.add('closed');

        // Alterna apertura/cierre cada 4 segundos
        setInterval(() => {
            elevatorDoors.classList.toggle('open');
            elevatorDoors.classList.toggle('closed');
        }, 4000);
    }
    
    // Animación suave de los indicadores de piso
    if (floorIndicators.length > 0) {
        setInterval(() => {
            setTimeout(() => {
                // Planta baja
                floorIndicators[0].classList.add('active');
                floorIndicators[1].classList.remove('active');
                if (elevatorDisplay) elevatorDisplay.textContent = '1';
                buttons[0]?.classList.add('active');
                buttons[1]?.classList.remove('active');
            }, 0);
            
            setTimeout(() => {
                // Primer piso
                floorIndicators[0].classList.remove('active');
                floorIndicators[1].classList.add('active');
                if (elevatorDisplay) elevatorDisplay.textContent = '2';
                buttons[0]?.classList.remove('active');
                buttons[1]?.classList.add('active');
            }, 3500);
            
            setTimeout(() => {
                // Regresa al piso 1
                floorIndicators[0].classList.add('active');
                floorIndicators[1].classList.remove('active');
                if (elevatorDisplay) elevatorDisplay.textContent = '1';
                buttons[0]?.classList.add('active');
                buttons[1]?.classList.remove('active');
            }, 6500);
        }, 8000);
    }

    // Parpadeo del display
    if (elevatorDisplay) {
        setInterval(() => {
            setTimeout(() => {
                elevatorDisplay.style.opacity = '0.5';
                setTimeout(() => elevatorDisplay.style.opacity = '1', 100);
            }, 3400);
            setTimeout(() => {
                elevatorDisplay.style.opacity = '0.5';
                setTimeout(() => elevatorDisplay.style.opacity = '1', 100);
            }, 6400);
        }, 8000);
    }
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    const cards = document.querySelectorAll('.service-card, .value-card, .project-card, .process-step');
    cards.forEach(card => observer.observe(card));

    // Inicializar animación del ascensor
    enhanceElevatorAnimation();
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        console.log('Form submitted:', Object.fromEntries(formData.entries()));
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .loaded .hero-content > * {
        animation: fadeInUp 0.8s ease forwards;
    }
    .loaded .hero-content .hero-badge { animation-delay: 0.2s; }
    .loaded .hero-content .hero-title { animation-delay: 0.4s; }
    .loaded .hero-content .hero-description { animation-delay: 0.6s; }
    .loaded .hero-content .hero-buttons { animation-delay: 0.8s; }
    .loaded .hero-content .contact-info { animation-delay: 1s; }
`;
document.head.appendChild(style);
