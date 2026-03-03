// ===== DOM Elements =====
const themeToggle = document.getElementById('themeToggle');
const soundToggle = document.getElementById('soundToggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');
const loadingScreen = document.getElementById('loadingScreen');
const matrixCanvas = document.getElementById('matrixCanvas');
const particlesContainer = document.getElementById('particles');
const stackInfo = document.getElementById('stackInfo');
const terminalCommand = document.getElementById('terminalCommand');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');
const formStatus = document.getElementById('formStatus');

// ===== State Variables =====
let isDarkMode = true;
let isSoundOn = true;
let currentTech = null;

// ===== Tech Stack Information =====
const techInfo = {
    html: "HTML5: Markup language for web pages, latest version with semantic elements and improved APIs.",
    css: "CSS3: Styling language with modern features like flexbox, grid, animations, and variables.",
    js: "JavaScript: Programming language for interactive web applications, supports ES6+ features.",
    react: "React: JavaScript library for building user interfaces with component-based architecture.",
    python: "Python: Versatile programming language used for web development, data science, and automation.",
    git: "Git: Version control system for tracking changes in source code during development.",
    database: "SQL: Language for managing and querying relational databases.",
    vscode: "VS Code: Powerful code editor with built-in Git support, debugging, and extensions.",
    scikit: "Scikit-learn: Python library for machine learning with algorithms for classification, regression, and clustering.",
    tensorflow: "TensorFlow: Open-source platform for machine learning with tools for building and deploying ML models."
};

// ===== Terminal Commands =====
const terminalCommands = [
    "npm start",
    "git status",
    "python main.py",
    "node server.js",
    "docker-compose up",
    "code .",
    "git push origin main"
];

// ===== Initialize Portfolio =====
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
});

// ===== Core Functions =====
function initializePortfolio() {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize matrix background
    initializeMatrix();
    
    // Initialize particles
    initializeParticles();
    
    // Initialize typing effect
    startTerminalTyping();
    
    // Initialize skill animations
    initializeSkillAnimations();
    
    // Initialize statistics counter
    initializeStatsCounter();
    
    // Initialize tech stack interactions
    initializeTechStack();
    
    // Initialize project carousel
    initializeProjectCarousel();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
}

// ===== Theme Toggle =====
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', !isDarkMode);
    
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon', isDarkMode);
    icon.classList.toggle('fa-sun', !isDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
});

// ===== Sound Toggle =====
soundToggle.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    
    const icon = soundToggle.querySelector('i');
    icon.classList.toggle('fa-volume-up', isSoundOn);
    icon.classList.toggle('fa-volume-mute', !isSoundOn);
    
    // Play/pause any background sounds if implemented
    // This is a placeholder for future audio features
});

// ===== Mobile Navigation =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Back to Top Button =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update navbar background on scroll
    updateNavbarOnScroll();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Matrix Background =====
function initializeMatrix() {
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const chars = "01";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = "rgba(10, 10, 15, 0.04)";
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    });
    
    // Start animation
    setInterval(drawMatrix, 35);
}

// ===== Particle System =====
function initializeParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;
        particle.style.background = `rgba(0, 123, 255, ${Math.random() * 0.3 + 0.1})`;
        particle.style.boxShadow = `0 0 ${size * 2}px rgba(0, 123, 255, 0.5)`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation ends and create new one
        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle();
        });
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle linear infinite;
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Terminal Typing Effect =====
function startTerminalTyping() {
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeTerminalCommand() {
        const currentCommand = terminalCommands[commandIndex];
        
        if (isDeleting) {
            terminalCommand.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
        } else {
            terminalCommand.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentCommand.length) {
            isDeleting = true;
            setTimeout(typeTerminalCommand, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % terminalCommands.length;
            setTimeout(typeTerminalCommand, 500);
        } else {
            setTimeout(typeTerminalCommand, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(typeTerminalCommand, 1000);
}

// ===== Skill Animations =====
function initializeSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = `${width}%`;
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== Statistics Counter =====
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => observer.observe(number));
}

// ===== Tech Stack Interactions =====
function initializeTechStack() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tech = item.getAttribute('data-tech');
            if (techInfo[tech]) {
                stackInfo.textContent = techInfo[tech];
                stackInfo.style.color = 'var(--accent)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            stackInfo.textContent = 'Hover over a technology to see details';
            stackInfo.style.color = 'var(--text-light)';
        });
        
        item.addEventListener('click', () => {
            const tech = item.getAttribute('data-tech');
            if (techInfo[tech]) {
                // Add visual feedback on click
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 200);
            }
        });
    });
}

// ===== Project Carousel - UPDATED FOR PAGINATION (3 projects per page) =====
function initializeProjectCarousel() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const carousel = document.querySelector('.carousel-container');
    const projectCards = document.querySelectorAll('.project-card');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!prevBtn || !nextBtn || !carousel || projectCards.length === 0) return;
    
    let currentPage = 0;
    const projectsPerPage = 3;
    const totalPages = Math.ceil(projectCards.length / projectsPerPage);
    
    // Hide all projects first
    projectCards.forEach(card => {
        card.style.display = 'none';
    });
    
    // Show first page
    showPage(0);
    
    function showPage(pageIndex) {
        // Hide all projects
        projectCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show projects for current page
        const start = pageIndex * projectsPerPage;
        const end = Math.min(start + projectsPerPage, projectCards.length);
        
        for (let i = start; i < end; i++) {
            projectCards[i].style.display = 'flex';
        }
        
        // Update indicators
        if (indicators.length) {
            indicators.forEach((indicator, index) => {
                if (index === pageIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Update button states
        prevBtn.style.opacity = pageIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = pageIndex === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = pageIndex >= totalPages - 1 ? '0.5' : '1';
        nextBtn.style.cursor = pageIndex >= totalPages - 1 ? 'not-allowed' : 'pointer';
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });
    
    // Add click handlers to indicators
    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentPage = index;
                showPage(currentPage);
            });
        });
    }
    
    // Auto-rotate carousel on mobile
    if (window.innerWidth <= 768) {
        setInterval(() => {
            if (currentPage < totalPages - 1) {
                currentPage++;
            } else {
                currentPage = 0;
            }
            showPage(currentPage);
        }, 5000);
    }
}

// ===== Scroll Animations =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .section-title, .role-tag');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Navbar Scroll Effect =====
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// ===== Contact Form with Email Integration =====
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Show sending status
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        if (formStatus) {
            formStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending your message...';
            formStatus.className = 'form-status info';
        }
        
        try {
            // Using FormSubmit.co service (free, no backend required)
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);
            formData.append('_to', 'kan080bct054@kec.edu.np'); // Your email
            formData.append('_subject', `Portfolio Contact: ${subject}`);
            formData.append('_replyto', email);
            formData.append('_template', 'table');
            
            // Send to FormSubmit
            const response = await fetch('https://formsubmit.co/ajax/kan080bct054@kec.edu.np', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    _template: 'table'
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // Success
                if (formStatus) {
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                }
                
                // Reset form
                contactForm.reset();
                
                // Update button
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = 'var(--success)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    
                    if (formStatus) {
                        formStatus.innerHTML = '';
                        formStatus.className = 'form-status';
                    }
                }, 3000);
            } else {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Show error but still reset button
            if (formStatus) {
                formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send. Please email me directly at kan080bct054@kec.edu.np';
                formStatus.className = 'form-status error';
            }
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Also show alert as backup
            alert(`Thank you, ${name}! Due to technical issues, please email me directly at kan080bct054@kec.edu.np with your message.`);
        }
    });
}

// ===== Load Saved Preferences =====
function loadPreferences() {
    // Load theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        isDarkMode = savedDarkMode === 'true';
        document.body.classList.toggle('dark-mode', !isDarkMode);
        
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon', isDarkMode);
        icon.classList.toggle('fa-sun', !isDarkMode);
    }
}

// Call loadPreferences on initialization
loadPreferences();

// ===== Window Resize Handling =====
window.addEventListener('resize', () => {
    // Re-initialize matrix canvas
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
});

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Toggle theme with Ctrl+T
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Toggle sound with Ctrl+M
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        soundToggle.click();
    }
    
    // Scroll to top with Home key
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});