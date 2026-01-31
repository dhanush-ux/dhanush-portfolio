document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Optional: Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /* -- Project Modal Logic -- */
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImpact = document.getElementById('modal-impact');
    const modalAccuracy = document.getElementById('modal-accuracy');
    const modalAccuracyBar = document.getElementById('modal-accuracy-bar');
    const modalTech = document.getElementById('modal-tech');

    // Data source for projects (matching the Titles in HTML)
    const projectData = {
        "Asteroidanology": {
            description: "A software that predicts the possible impact on Asteroid hitting on surface of the Earth. Designed and crafted in such a way that even a Non-Technical person can understand the possible impacts of the asteroid.",
            impact: "The tools serves as a key to study more about the Asteroid impact on earth with a User-friendly approach even a Non-Technical person can understand and be conscious.",
            accuracy: 85,
            technologies: ["Python", "HTML", "CSS", "Machine Learning", "Data Analysis"]
        },
        "Tracademy": {
            description: "An AI driven Software that can able to analyse the descriptive answers from .jpeg input file and Evaluate the Marks Accordance with the Content in the Answer. This Software serves as a tool for Educational Institutions to Automate descriptive answers Evaluation.",
            impact: "The tool makes the Educational Institutions occupy with Advanced technology usage by Analysing and Evaluating descriptive answers. 'Not only MCQ question can be Automated even Descriptive ones can also be Automated'",
            accuracy: 90,
            technologies: ["Python", "OpenCV", "Word2Vec", "OCR", "Deep Learning", "NLP"]
        }
    };

    // Open Modal
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.project-title').textContent;
            const data = projectData[title] || {
                description: "Details coming soon.",
                impact: "N/A",
                accuracy: 0,
                technologies: []
            };

            // Populate Data
            modalTitle.textContent = title;
            modalDesc.textContent = data.description;
            modalImpact.textContent = data.impact;
            modalAccuracy.textContent = data.accuracy + "%";

            // Populate Tech Tags
            modalTech.innerHTML = data.technologies.map(tech =>
                `<span class="tech-tag">${tech}</span>`
            ).join('');

            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling

            // Animate Accuracy Bar after a slight delay
            setTimeout(() => {
                modalAccuracyBar.style.width = data.accuracy + "%";
            }, 300);
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalAccuracyBar.style.width = '0%'; // Reset bar
    };

    modalCloseBtn.addEventListener('click', closeModal);

    // Close on clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

});
