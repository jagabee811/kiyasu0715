 // Enhanced smooth scrolling with active state management
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Add loading indicator
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Enhanced header background change on scroll with performance optimization
        let ticking = false;
        
        function updateHeader() {
            const header = document.querySelector('header');
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });

        // Advanced active navigation link highlighting with smooth transitions
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    
                    // Remove active class from all links with animation
                    navLinks.forEach(link => {
                        if (link.classList.contains('active')) {
                            link.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                link.classList.remove('active');
                                link.style.transform = '';
                            }, 150);
                        }
                    });
                    
                    // Add active class to current link with animation
                    setTimeout(() => {
                        const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                            activeLink.style.transform = 'scale(1.05)';
                            setTimeout(() => {
                                activeLink.style.transform = '';
                            }, 200);
                        }
                    }, 200);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Enhanced hamburger menu toggle with advanced animations
        const hamburger = document.querySelector('.hamburger');
        const navLinks_ul = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Add click feedback
            hamburger.style.transform = 'scale(0.9)';
            setTimeout(() => {
                hamburger.style.transform = '';
            }, 100);

            hamburger.classList.toggle('active');
            navLinks_ul.classList.toggle('mobile-active');
            
            // Prevent body scroll when menu is open
            if (navLinks_ul.classList.contains('mobile-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Enhanced mobile menu interactions
        document.querySelectorAll('.nav-link').forEach((link, index) => {
            link.addEventListener('click', (e) => {
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);

                // Close mobile menu with staggered animation
                if (navLinks_ul.classList.contains('mobile-active')) {
                    const menuItems = navLinks_ul.querySelectorAll('li');
                    menuItems.forEach((item, i) => {
                        setTimeout(() => {
                            item.style.animation = 'fadeOutSlide 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                        }, i * 50);
                    });

                    setTimeout(() => {
                        hamburger.classList.remove('active');
                        navLinks_ul.classList.remove('mobile-active');
                        document.body.style.overflow = '';
                        
                        // Reset animations
                        menuItems.forEach(item => {
                            item.style.animation = '';
                        });
                    }, 300);
                }
            });

            // Add hover effect for desktop
            link.addEventListener('mouseenter', () => {
                if (!navLinks_ul.classList.contains('mobile-active')) {
                    link.style.transform = 'translateY(-3px)';
                }
            });

            link.addEventListener('mouseleave', () => {
                if (!navLinks_ul.classList.contains('mobile-active')) {
                    link.style.transform = '';
                }
            });
        });

        // Close mobile menu when clicking outside with smooth animation
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks_ul.contains(e.target)) {
                if (navLinks_ul.classList.contains('mobile-active')) {
                    const menuItems = navLinks_ul.querySelectorAll('li');
                    menuItems.forEach((item, i) => {
                        setTimeout(() => {
                            item.style.animation = 'fadeOutSlide 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                        }, i * 30);
                    });

                    setTimeout(() => {
                        hamburger.classList.remove('active');
                        navLinks_ul.classList.remove('mobile-active');
                        document.body.style.overflow = '';
                        
                        // Reset animations
                        menuItems.forEach(item => {
                            item.style.animation = '';
                        });
                    }, 200);
                }
            }
        });

        // Add fadeOut animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOutSlide {
                to {
                    opacity: 0;
                    transform: translateY(-10px);
                }
            }
        `;
        document.head.appendChild(style);

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('お問い合わせありがとうございます。後日ご連絡いたします。');
            this.reset();
        });

        // Enhanced Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe all skill cards and project cards
        document.querySelectorAll('.skill-card, .project-card').forEach(card => {
            observer.observe(card);
        });

        // Add scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
        });