import Route from "./Route.js";

//Définir les routes ici
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
    new Route("/carte", "La Carte", "/pages/carte.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html"),
];

//Le titre s'affichera comme ceci : Route.titre - websiteName
export const websiteName = "Quai Antique";