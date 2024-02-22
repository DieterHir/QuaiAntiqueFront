import Route from "./Route.js";

//Définir les routes ici
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
];

//Le titre s'affichera comme ceci : Route.titre - websiteName
export const websiteName = "Quai Antique";