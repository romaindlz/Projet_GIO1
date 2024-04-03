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
  - Mazhoud Mohamed: Etudiant en échange de Tunisie, ses tâches principales ont été le développement HTML, CSS et Javascript ainsi que la recherche et le développement de l'outil de prédiction des phénomènes météorologiques.

### Collaboration au sein du groupe
Pour collaborer ensemble sur ce projet, un répertoire Github a été créé. Tous les documents utiles au projet ont été déposé sur ce répertoire. Pour effectuer certains développement des "branches" git ont été créées, notamment pour le développement de la prédiction des phénomènes météorologiques en VueJs.

## Fonctionnement du projet
Le projet cloné contient plusieurs fichiers:
  - *LandingPage.htmml* : Page de démarrage de notre application.
  - *map.html* : Fichier permettant de générer notre application principale avec la carte et les différentes fonctions implémentées.
  - *style.css* : Fichier permettant de styliser notre application principale.
  - *script.js* : Fichier qui contient tout le développement Javascript de notre projet.
  - *XXX.jpg et XXX.png* : Différents logos utilisés dans notre projet.
  - Dossiers *public* et *src* : Différents dossiers contenant le développement VueJs de la fonction de prédictions des phénomènes météorologiques.

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




## Difficultés rencontrées

## Améliorations possibles
