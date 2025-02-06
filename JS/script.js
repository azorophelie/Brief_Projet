// Fonction pour vérifier si c'est le jour
function isDaytime() {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;              
}

// Fonction pour appliquer les styles dynamiques (jour ou nuit)
function DayNightStyles() {
    const weatherCard = document.querySelector('.weather-card'); 
    if (isDaytime()) {
        weatherCard.classList.add('daytime'); 
        weatherCard.classList.remove('nighttime');
        console.log("La classe 'daytime' a été ajoutée.");
    } else {
        weatherCard.classList.add('nighttime'); 
        weatherCard.classList.remove('daytime'); 
        console.log("La classe 'nighttime' a été ajoutée.");
    }
}

// Fonction pour générer des nuages animés
function generateClouds() {
    const cloudsContainer = document.createElement('div');
    cloudsContainer.id = 'clouds';
    document.body.appendChild(cloudsContainer);

    for (let i = 0; i < 15; i++) { 
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');

        // Taille des nuages
        const size = Math.random() * 200 + 150; 
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size / 2}px`;

        // Position aléatoire sur l'écran
        const y = Math.random() * window.innerHeight * 0.8; 
        cloud.style.top = `${y}px`;

        // Vitesse de mouvement 
        const duration = Math.random() * 30 + 30; 
        cloud.style.animationDuration = `${duration}s`;

        cloudsContainer.appendChild(cloud);
    }
}

// Fonction pour générer des étoiles
function generateStars() {
    const starsContainer = document.getElementById('stars') || document.createElement('div');
    starsContainer.id = 'stars';
    document.body.appendChild(starsContainer);

    const starCount = 200; 

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Position aléatoire
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Taille des étoiles
        const size = Math.random() * 3 + 1; // Taille entre 1px et 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Variation de la couleur pour un effet plus réaliste
        const colors = ["#FFFFFF", "#FFD700", "#ADD8E6", "#F0E68C"]; // Blanc, doré, bleu pâle, jaune clair
        star.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Variation de l'intensité de scintillement
        const twinkleDuration = Math.random() * 2 + 1.5; // Entre 1.5s et 3.5s
        star.style.animationDuration = `${twinkleDuration}s`;

        // Léger mouvement des étoiles
        if (Math.random() > 0.8) { // Certaines étoiles dérivent légèrement
            star.style.animation = `twinkle ${twinkleDuration}s infinite alternate ease-in-out, drift 10s infinite alternate ease-in-out`;
        }

        // Placement des étoiles
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;

        starsContainer.appendChild(star);
    }
}

// Fonction pour mettre à jour les éléments (nuages ou étoiles) en fonction de l'heure
function backgroundEffect() {
    const isDay = isDaytime();

    // Nettoyer les précédents éléments
    const existingClouds = document.getElementById('clouds');
    const existingStars = document.getElementById('stars');
    if (existingClouds) existingClouds.remove();
    if (existingStars) existingStars.remove();

    // Générer des nuages ou des étoiles en fonction de l'heure
    if (isDay) {
        generateClouds();
    } else {
        generateStars();
    }
}

// Mise à jour toutes les minutes (60000ms)
setInterval(() => {
    backgroundEffect();
    DayNightStyles(); 
}, 60000);


backgroundEffect();
DayNightStyles();
