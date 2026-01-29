const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    const glare = card.querySelector('.glare');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        // Get the center of the card
        centerX = rect.width / 2;
        centerY = rect.height / 2;

        // Calculate mouse position relative to the center of the card
        const x = e.clientX - rect.left - centerX;
        const y = e.clientY - rect.top - centerY;

        // Convert mouse offset to rotation values 
        // and scale to control tilt strength
        const rotateX = y / -15;
        const rotateY = x / 15;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Move the glare background opposite to the mouse for realism
        glare.style.opacity = 1;
        glare.style.background = `
            radial-gradient(circle at 50% 50%, 
            rgba(255, 255, 255, 0.5), transparent)
        `;
    })   

    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        glare.style.opacity = 0;
    })
})
