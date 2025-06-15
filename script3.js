document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. INITIALIZE PARTICLES
    // ======================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#2563eb" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#2563eb", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // ======================
    // 2. MOBILE MENU TOGGLE
    // ======================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // ======================
    // 3. TYPING ANIMATION
    // ======================
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const phrases = ["Frontend Developer", "Data Analyst", ];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function type() {
            const fullTxt = phrases[currentPhrase];
            
            if (isDeleting) {
                typingElement.textContent = fullTxt.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingElement.textContent = fullTxt.substring(0, currentChar + 1);
                currentChar++;
            }
            
            if (!isDeleting && currentChar === fullTxt.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        
        setTimeout(type, 1000);
    }

    // ======================
    // 4. RESUME PDF DOWNLOAD
    // ======================
    const downloadButtons = document.querySelectorAll('#download-cv, #contact-download');
    
    if (downloadButtons.length > 0) {
        downloadButtons.forEach(button => {
            button.addEventListener('click', async function(e) {
                e.preventDefault();
                
                try {
                    // Check if jsPDF is available
                    if (typeof jsPDF === 'undefined') {
                        throw new Error('PDF library not loaded');
                    }

                    // Create new PDF document
                    const doc = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });

                    // ======================
                    // PDF CONTENT CREATION
                    // ======================
                    
                    // Header Section
                    doc.setFontSize(22);
                    doc.setTextColor(37, 99, 235);
                    doc.text('Abdelrahman Fikry Abdelmoghny', 105, 20, { align: 'center' });
                    
                    doc.setFontSize(16);
                    doc.setTextColor(0, 0, 0);
                    doc.text('frontend Developer & Data Analyst', 105, 28, { align: 'center' });
                    
                    // Contact Information
                    doc.setFontSize(12);
                    doc.text('Email: abdelrahmanfikry1.com | Phone: 01552294082', 105, 36, { align: 'center' });
                    doc.text('Cairo, Egypt | Portfolio: abdelrahmanfikry1@gmail.com | GitHub:https://github.com/abdelrahmanfikry', 105, 42, { align: 'center' });
                    
                    // Divider Line
                    doc.setDrawColor(37, 99, 235);
                    doc.setLineWidth(0.5);
                    doc.line(15, 48, 195, 48);
                    
                    // Professional Summary
                    doc.setFontSize(16);
                    doc.text('PROFESSIONAL SUMMARY', 15, 58);
                    doc.setFontSize(14);
                    const summaryText = `Experienced frontend developer 
                    and data analysis. Proven track record of delivering high-quality solutions using modern 
                    technologies including excel , power bi , and Python. Strong problem-solving skills and 
                    ability to work in agile environments.`;
                    doc.text(summaryText, 15, 65, { maxWidth: 180 });
                    
                    // Technical Skills
                    doc.setFontSize(16);
                    doc.text('TECHNICAL SKILLS', 15, 95);
                    doc.setFontSize(12);
                    
                    // Skills Columns
                    const skills = [
                        {
                            title: "Frontend",
                            items: ["HTML5","CSS3", "JavaScript", "React.js",]
                        },
                      /*  {
                            title: "Backend",
                            items: ["Node.js", "Python", "Express", "Django", "REST APIs"]
                        },*/
                        {
                            title: "Data analysis",
                            items: ["Pandas/Numpy", "SQL",  "Data Visualization", "Machine Learning","Excel","power bi"]
                        }
                    ];
                    
                    let columnX = 20;
                    skills.forEach(category => {
                        doc.setFontSize(14);
                        doc.text(category.title, columnX, 100);
                        doc.setFontSize(12);
                        
                        let yPos = 108;
                        category.items.forEach(skill => {
                            doc.text(`• ${skill}`, columnX, yPos);
                            yPos += 7;
                        });
                        
                        columnX += 60;
                    });
                    
                    // Work Experience
                    doc.setFontSize(16);
                    doc.text('WORK EXPERIENCE', 20, 140);
                    doc.setFontSize(12);
                    
                    // Job 1
                    doc.setFontSize(14);
                    doc.text('Senior Frontend Developer', 20, 150);
                    doc.setFontSize(12);
                    doc.text('Tech Solutions Inc. | Jan 2021 - Present', 20, 157);
                    doc.text('- Developed and maintained 10+ React applications', 25, 164);
                    doc.text('- Improved application performance by 40%', 25, 171);
                    doc.text('- Led team of 5 junior developers', 25, 178);
                    
                    // Job 2
                    doc.setFontSize(14);
                    doc.text('Data Analyst', 20, 190);
                    doc.setFontSize(12);
                    doc.text('Data Insights Co. | Mar 2018 - Dec 2020', 20, 197);
                    doc.text('- Analyzed large datasets using Python and Pandas', 25, 204);
                    doc.text('- Created interactive dashboards for business insights', 25, 211);
                    doc.text('- Automated reporting processes saving 20+ hours/week', 25, 218);
                    
                    // Education
                    doc.setFontSize(16);
                    doc.text('EDUCATION', 15, 230);
                    doc.setFontSize(14);
                    doc.text('BSc in Computer Science', 20, 240);
                    doc.setFontSize(12);
                    doc.text('Cairo University | 2014 - 2018', 20, 247);
                    doc.text('GPA: 3.8/4.0', 20, 254);
                    
                    // Save the PDF
                    doc.save('Abdelrahman_Fikry_Abdelmoghny.pdf');
                    
                    showNotification('Resume downloaded successfully!', 'success');
                    
                } catch (error) {
                    console.error('Error generating PDF:', error);
                    showNotification('Error generating PDF. Downloading text version.', 'error');
                    
                    // Fallback text version
                    const resumeContent = `Abdelarhman fikry - Resume\n\n
                    PROFESSIONAL SUMMARY:
                    Experienced full-stack developer with 5+ years specializing in web development 
                    and data analysis.
                    
                    TECHNICAL SKILLS:
                    - Frontend: HTML5/CSS3, JavaScript, React.js
                    - Backend: Node.js, Python, Express
                    - Data: Pandas, SQL, MongoDB
                    
                    WORK EXPERIENCE:
                    Senior Frontend Developer at Tech Solutions Inc. (2021-Present)
                    Data Analyst at Data Insights Co. (2018-2020)
                    
                    EDUCATION:
                    BSc in Computer Science, Cairo University (2014-2018)`;
                    
                    const blob = new Blob([resumeContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'Abdelrahman_fikry_abdelmoghny.txt';
                    link.click();
                }
            });
        });
    }

    // ======================
    // 5. CONTACT FORM HANDLING
    // ======================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send data to a server
            console.log('Form submitted:', data);
            
            showNotification('Thank you for your message! I will contact you soon.', 'success');
            contactForm.reset();
        });
    }

    // ======================
    // 6. NOTIFICATION SYSTEM
    // ======================
    function showNotification(message, type = 'success') {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle'
        };
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${icons[type]}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // ======================
    // 7. SCROLL ANIMATIONS
    // ======================
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('aos-animate');
            }
        });
    }

    // Initial animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});