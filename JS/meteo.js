// Fonction pour récupérer les données météo à partir de l'API
function getWeatherData(city, country, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                
                const temperature = Math.round(data.main.temp); // Température actuelle 
                const tempMin = Math.round(data.main.temp_min); // Température min 
                const tempMax = Math.round(data.main.temp_max); // Température max 
                const description = data.weather[0].description;
                const feelsLike = Math.round(data.main.feels_like); // Température ressentie
                const humidity = data.main.humidity; // Humidité
                const windSpeed = data.wind.speed; // Vitesse du vent
                const weatherIcon = diffWeatherIcon(description); // Icon de méteo

                // Conversion des températures en Fahrenheit
                const tempFahrenheit = celsiusToFahrenheit(temperature);
                const tempMinFahrenheit = celsiusToFahrenheit(tempMin);
                const tempMaxFahrenheit = celsiusToFahrenheit(tempMax);
                const feelsLikeFahrenheit = celsiusToFahrenheit(feelsLike);

                // Mettre à jour l'interface
                document.getElementById('city').textContent = city;
                document.getElementById('temperature').textContent = `${temperature}°C / ${tempFahrenheit}°F`; // Température actuelle
                document.getElementById('temp-min').textContent = `Min: ${tempMin}°C / ${tempMinFahrenheit}°F`; // Température min
                document.getElementById('temp-max').textContent = `Max: ${tempMax}°C / ${tempMaxFahrenheit}°F`; // Température max
                document.getElementById('description').textContent = description;
                document.getElementById('feels-like').textContent = `${feelsLike}°C / ${feelsLikeFahrenheit}°F`; // Température ressentie
                document.getElementById('humidity').textContent = `${humidity}`;
                document.getElementById('wind').textContent = `${windSpeed}`;

                // Ajouter l'icône météo
                document.getElementById('weather-icon').className = weatherIcon;
                  
          
                showTimeAndDate();

            } else {
                console.error('Erreur lors de la récupération des données météo');
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données météo :", error);
        });
}

// Fonction pour convertir Celsius en Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Fonction pour déterminer l'icône en fonction de la description
function diffWeatherIcon(description) {
    description = description.toLowerCase(); 

    if (description.includes('ensoleillé') || description.includes('soleil') || description.includes('ciel dégagé')) {
        return 'fas fa-sun'; 
    } else if (description.includes('nuageux') || description.includes('nuage') || description.includes('couvert')) {
        return 'fas fa-cloud'; 
    } else if (description.includes('pluie') || description.includes('averse')) {
        return 'fas fa-cloud-showers-heavy'; 
    } else if (description.includes('neige')) {
        return 'fas fa-snowflake'; 
    } else if (description.includes('orage') || description.includes('éclair')) {
        return 'fas fa-bolt'; 
    } else if (description.includes('brouillard') || description.includes('brume')) {
        return 'fas fa-smog'; 
    } else {
        return null; 
    }
}

// Fonction pour afficher l'heure et le jour
function showTimeAndDate() {
    const today = new Date();

    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const day = days[today.getDay()];

    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const month = months[today.getMonth()];

    const date = today.getDate();

    
    let hours = today.getHours();
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes; 

    const time = `${hours}:${minutes}`;

    // Mettre à jour l'interface
    document.getElementById('current-time').textContent = time;
    document.getElementById('current-date').textContent = `${day} ${date} ${month}`;
}

// Fonction pour récupérer la position de l'utilisateur et la météo
function locationAndWeather() {
    fetch('conf.json')  // Charger le fichier JSON pour obtenir la configuration
        .then(response => response.json())
        .then(config => {
            const { ville, pays, api_key } = config;  // Extraire les informations du fichier JSON

            // Utiliser la géolocalisation pour obtenir la position de l'utilisateur
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;

                        // Utiliser la latitude et la longitude dans l'URL de la géolocalisation
                        const geolocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric&lang=fr`;

                        // Faire la requête pour récupérer les données météo avec la géolocalisation
                        fetch(geolocationUrl)
                            .then(response => response.json())
                            .then(data => {
                                const city = data.name;
                                const country = data.sys.country;

                                // Passer les données de géolocalisation à la fonction pour afficher les données météo
                                getWeatherData(city, country, api_key);
                            })
                            .catch(error => {
                                console.error("Erreur lors de la récupération de la météo via géolocalisation :", error);
                                // En cas d'erreur, on utilise les valeurs par défaut du fichier JSON
                                getWeatherData(ville, pays, api_key);
                            });
                    },
                    (error) => {
                        console.error("Erreur de géolocalisation", error);
                        // Si la géolocalisation échoue, utiliser les valeurs du fichier JSON
                        getWeatherData(ville, pays, api_key);
                    }
                );
            } else {
                console.log("La géolocalisation n'est pas supportée par ce navigateur.");
                // Si la géolocalisation n'est pas supportée, utiliser les valeurs par défaut du fichier JSON
                getWeatherData(ville, pays, api_key);
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement du fichier JSON :", error);
            // Si le fichier JSON ne peut pas être chargé, utiliser des valeurs par défaut
            getWeatherData("Annecy", "FR", "d65f845c402f5a51a7e5febb42cf6466");
        });
}

// Initialiser la récupération de la météo
locationAndWeather();

// Mise à jour toutes les heures
setInterval(() => locationAndWeather(), 3600000); 
