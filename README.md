# Mon application météo
Une application qui affiche les conditions métérologiques actuelles en utilisant l'API OpenWeatherMap.
L'application récupére la météo d'une ville donnée, affiche les températures actuelles, minimales, maximales, l'humidité, 
la vitesse du vent, et une icôn météo correspondante à la description (pluie, soleil, neige, etc.). 
L'application ajuste également son interface en fonction du jour et de la nuitn en changeant les styles et en générant des 
effets visuels.

[Lien vers l'application météo](https://brief-weatherapp.netlify.app/)

## Fonctionnalités
- Affichage de la météo actuelle, ainsi que les températures minimales et maximales.
- Affichage de la météo ressentie, de l'humidité et de la vitesse du vent.
- Utilisation de l'API OpenWeatherMap pour récupérer les données météo.
- Interface dynamique qui s'adapte selon le jour ou la nuit.
- Génération d'effets visuels comme des nuages animés pour le jour et des étoiles scintillantes la nuit.
- Géolocalisation de l'utilisation pour récuperer la météo en fonction de sa poition.

## 🚨 Avertissement sur la géolocalisation 🚨
🚨 Ce projet utilise la géolocalisation pour récupérer la météo en fonction de votre position actuelle. 
Cependant, **vous n'êtes pas obligé(e)s d'autoriser la géolocalisation**. Si vous choisissez de la bloquer, la météo sera récupérée pour la ville par défaut que j'ai prédéfinie.
 🚨


## Prérequis
- Un navigateur moderne.
- Une clé API valide pour OpenWeatherMap. Tu peux obtenir une clé gratuite [ici](https://openweathermap.org/).

![HTML](https://img.shields.io/badge/HTML-FF69B4)
![CSS](https://img.shields.io/badge/CSS-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow)
![API](https://img.shields.io/badge/API-green)



### Installation 

#### Clonez le dépôt :

```sh 
git clone git@github.com:azorophelie/Brief_Projet.git
```

#### Remplace la clé API par la tienne dans le fichier conf.json (si nécessaire):

```sh
{
  "ville": "Annecy",
  "pays": "FR",
  "api_key": "ta_clé_api"
}
```
3. Ouvre index.html dans ton navigateur pour tester l'application

### Structure des fichiers 
- index.html : La page principale qui charge l'application.
- style.css : Le fichier CSS contenant les styles de l'application.
- meteo.js : Le fichier JavaScript qui va gérer les différents éléments de l'app avec l'API
- script.js : Le fichier sera pour l'arrière plan animé.
- conf.json : Un fichier qui va contenir les infos de la ville principale qui contient une clé API.

## Preview 


![Previewday](https://github.com/user-attachments/assets/116970cd-a1bd-4302-8959-64f5a3cbf05d)


![previewnight](https://github.com/user-attachments/assets/8e29040d-6155-48c8-8d30-3170a65fee74)

