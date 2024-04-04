# Projet_GIO1
Ce projet est un projet basique de programmation Web. 
Il inclut des notions simples de:
  - HTML
  - css
  - Javascript
  - Openlayers: 6.9.0
### Description du cours
Ce module (GIO1) intervient dans le cadre du master en développement territorial (MDT) dans la filière ingénierie géomatique.
Les objectifs du cours visent à acquérir les compétences suivantes:
  - Structurer du code en front-end (ex. HTML, CSS, JS)
  - Utiliser des outils de développement web (ex. git)
  - Développer avec un framework web (ex. VueJS)
  - Intégrer une librairie web cartographique (ex. Leaflet)

## Installation
Pour commencer, il est possible de cloner le projet avec Git:

```
git clone https://github.com/romaindlz/Projet_GIO1.git your_projet_name
```
A présent, le dossier git est cloné sur votre machine et il est possible d'exécuter les différents fichiers afin de visualiser notre application.

## Introduction
### Description du projet
Notre projet est un visualisateur des phénomènes météorologiques. Il consiste à pouvoir afficher ou non certaines données météorologiques (températures, précipitations, etc.). 
L'objectif de ce projet est de pouvoir visualiser ces différentes données sur une application web principale. Notre projet permettra également la visualisation de ces phénomènes selon une période donnée. Une barre "temporelle" permettra de choisir la période dans laquelle les données devraient s'afficher. Une fonctionnalité de prédiction des phénomènes météorologiques fera également parti du projet. Le but de cette fonctionnalité serait de pouvoir estimer les phénomènes étudiés dans notre application qui se produirait dans une certaine période future. Imaginons que nous voulons estimer la température qu'il fera en 2050, cette fonctionnalité pourra être intéressante.
### Notre groupe
Nous sommes trois étudiants de première année dans la filière ingénierie géomatique du master MDT. 
Notre équipe se compose de trois étudiants:
  - Romain Délèze: Ingénieur en géomatique et gestion du territoire depuis été 2023. Ses tâches principales ont été le développement HTML, CSS et Javascript ainsi que la recherche des améliorations à appliquer au projet.
  - Benjamin Melchiorre: Ingénieur en géomatique et gestion du territoire depuis été 2023. Ses tâches principales ont été le développement HTML, CSS et Javascript, l'élaboration du markdown ainsi que la recherche des améliorations à appliquer au projet.
  - Mohamed Mazhoud: Etudiant en échange de Tunisie, ses tâches principales ont été le développement HTML, CSS et Javascript ainsi que la recherche et le développement de l'outil de prédiction des phénomènes météorologiques.

### Collaboration au sein du groupe
Pour collaborer ensemble sur ce projet, un répertoire Github a été créé. Tous les documents utiles au projet ont été déposé sur ce répertoire. Pour effectuer certains développement des "branches" git ont été créées, notamment pour le développement de la prédiction des phénomènes météorologiques en VueJs.

## Projet d'application pour la visualisation de phénomènes météos
Le projet cloné contient plusieurs fichiers:
  - *LandingPage.htmml* : Page de démarrage de notre application.
  - *map.html* : Fichier permettant de générer notre application principale avec la carte et les différentes fonctions implémentées.
  - *style.css* : Fichier permettant de styliser notre application principale.
  - *script.js* : Fichier qui contient tout le développement Javascript de notre projet.
  - *XXX.jpg et XXX.png* : Différents logos utilisés dans notre projet.
  - Dossiers *public* et *src* : Différents dossiers contenant le développement dans le Framework *VueJs* de la fonction de prédictions des phénomènes météorologiques.

La fonction de prédiction des phénomènes météos a été implémentée en VueJs, contrairement à notre application principale, et n'est pas intégrée dans cette dernière. 
Après avoir rencontré des difficultés à intégrer cette fonction dans l'application principale ainsi que par manque de temps, nous n'avons pas pu intégrer cette fonctionnalité dans notre application. 

### Landing page
Cette page de garde est la page de démarrage de notre application. Elle permet de faire le lien pour accéder à notre application principale. Un boutton permet également de faire le lien avec notre répértoire Github. \
L'image en fond représente un paysage montagneux lors d'une tempête. Ce fond représente bien le thème de notre projet. Cette image de fond à été générée par une IA.

### Application principale
Notre application permet la visualisation de différents phénomènes météorologiques, comme la température moyenne de l'air en juillet sur la période 1961-1990, les précipitations sur cette même période, etc. sur le territoire suisse. 
Le fond de carte peut être modifié selon deux fonds de carte Bing différents (*Road* ou *Aerial*).
Les différents fonds de carte et couches s'affichent à l'aide des bibliothèques *Openlayers*. \
Lorsqu'un togglebButton est activé ou désactivé, une tuile WMS provenant de GeoAdmin est activée ou désactivée. 
Toutes les données que nous affichons sont donc des données raster. \
Une slidebar permet de modifier la période de visualisation des différents phénomènes.
Une fonction de recherche permet de faire une recherche selon une ville, un village, etc. 
Cette fonction de recherche est possible à l'aide d'une API *OpenWeather* de *Geocoding*. 
Une fois qu'une ville est recherchée dans la barre de recherche, une requête *GET* permet de récupérer la longitude et la latitude de la ville recherchée.
Une fonction permet ensuite de zoomer sur la carte aux coordonnées obtenues avec la requête précédente. \
A la fin du fichier *script.js*, la fonctionnalité de prédiction des phénomènes météos a été ajoutée afin d'essayer de l'intégrer dans l'application principale.
Après plusieurs essais sans succès, nous avons arreté de chercher à l'implémenter dans notre application principale et nous l'avons implémenter en VueJs dans un dossier à part.

### Difficultés rencontrées
Lors de la réalisation de notre projet, nous avons rencontré plusieurs difficultés. \
Premièrement, le manque d'expérience nous a grandement ralenti dans l'exécution de notre projet. En effet, aucun de nous ne fait de programmation Web dans sa profession actuelle.
Nos connaissances en la matière datent alors de plusieurs mois. Il nous a fallu alors reprendre nos bases pour pouvoir élaborer notre projet. Ceci nous a donc fortement ralenti dans l'implémentation de notre application.\
Une seconde difficulté rencontrée a été la recherche de données. A la base, notre idée d'application consistait à pouvoir visualiser plusieurs variables météorologiques, comme la température par exemple, sur les X précédents/prochains jours.
Nous avions l'ambition de pouvoir faire des prédictions dans le temps de ces différents variables. Comme par exemple, estimer la température le 10 juin 2040 sur la ville de Lausanne. Lors de nos recherches, nous avons rencontré des difficultés à rencontrer ces données. Nous avons trouvé des API qui permettent de faire des requêtes afin d'obtenir différentes données météorologiques. Néanmoins, dans la totalité des API trouvées, le nombre de requêtes quotidiennes est limité à 50 pour obtenir les informations gratuitement. Si l'on désire effectuer plus de requêtes, ce service devient payant. Le nombre de requête étant très limité, cela ne nous a pas permis de développer notre application à l'aide de ces API. Nous avons donc du nous limiter à afficher des données raster en WMS. \
Une difficulté supplémentaire rencontrée a été l'intégration des nouveaux outils vus en cours dans notre projet. Le temps à disposition à la suite des cours théoriques étant plutôt court, nous avons décidé de débuter le projet avant d'avoir vu tous les outils étudiés en cours. L'intégration de ces nouveaux éléments dans notre projet déjà commencé n'a pas été simple pour nous. L'adaptation de notre projet dans le Framework *VueJS* a été très compliqué pour nous. Le temps venant à manquer, nous avons alors décidé de garder notre implémentation de départ. De plus, ce Framework est basé sur une approche de programmation orientée objet (POO). Dans le cadre de notre Bachelor, nous avons principalement effectué de la programmation fonctionnel, ce qui n'a fait que rendre plus compliqué l'adaptation de notre projet dans le Framework *VueJs*.

### Améliorations possibles
Cette dernière section concerne les potentielles améliorations que nous pourrions intégrer à notre application. \
Une première amélioration aurait pu être de séparer les responsabilités dans notre application. En effet, notre fichier *script.js* prend toutes les responsabilités. Le fait de séparer les responsabilités permet de déboguer plus facilement notre programme, de rendre plus claire notre modèle, etc. Nous aurions alors pu séparer notre programme en plusieurs unités:
  1. Première unité qui est responsable de l'initialisation de la carte et la gestion des couches.
  2. Seconde unité qui est responsable de la gestion des événements des boutons.
  3. Troisième unité qui est responsable de la gestion des événements de recherche pour les villes.
  4. Quatrième unité qui est responsable des évènements de prédiction des phénomènes météorologiques.

Une seconde amélioration aurait été d'implémenter notre projet avec le Framework *VueJs*. Ce Framework a deux principales fonctionnalités très importantes qui sont le rendu déclaratif et la réactivité, ce qui est particulièrement adapté pour la construction d'interfaces utilisateurs. Comme expliqué dans la section précédente, nous avons tenté d'adapter notre projet à ce Framework mais nous avons rencontré de nombreux problèmes. Si nous avions implémenté notre projet avec le Framework *VueJs*, nous aurions pu avoir l'architecture suivante: 
```
src/
  |_ components/ 
     |_ SearchLocation.vue
     |_ Map.vue 
     |_ Temperature.vue 
     |_ Precipitation.vue
     |_ Prediction.vue
     |_ ... 
  |_ assets/ 
  |_ main.js
  |_ App.vue  
```
Les différents composants *Vue* aurait les responsabilités suivantes:
  - *SearchLocation.vue* : Ce composant serait reponsable de gérer la fonction de recherche. Il récupérerait le texte tapé dans l'input "text" présent sur l'application et ferait appel à l'API permettant la recherche par location.
  - *Map.vue* : Ce composant serait responsable de récupérer l'état du toggle spécifique aux fonds de carte dans l'application et d'afficher le fond de carte demandé.
  - *Temperature.vue* : Ce composant serait responsable de récupérer l'état du toggle spécifique à cette donnée dans l'application et d'afficher la donnée spécifique sur la carte.
  - *Precipitation.vue* : Ce composant serait responsable de récupérer l'état du toggle spécifique à cette donnée dans l'application et d'afficher la donnée spécifique sur la carte.
  - *Prediction.vue* : Ce composant serait responsable de récupérer la valeur de la slidebar dans l'application afin d'utiliser cette valeur pour la prédiction des phénomènes météos. Il serait également reponsable d'afficher ensuite les données calculées sur la carte.
  - *...* : Nous aurions pu ajouter autant de composants que de données que nous voudrions afficher avec la même logique que les composants précédents.






