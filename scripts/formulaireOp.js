// Fonction générique qui me permet de valider les champs 
// champ : nom du champ à vérifier
// coche : indique l'id pour mettre la coche verte
// conditionLongueur : sur la longueur min et max du champ
// typeValidation : indique le type attendu (texte, alphanumérique, numerique)
// Liste des noms de villes (exemple)
/*const villes = [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Toulon",
    "Nice",
    "Nantes",
    "Strasbourg",
    "Bordeaux",
    "Montpellier",
    "Lille",
    "Rennes",
    "Reims",
    // Ajoutez plus de villes au besoin
];*/


// source du fichier json : https://www.data.gouv.fr/fr/datasets/villes-de-france/#/resources
let villes = [];

// Charger les noms de ville depuis un fichier JSON
fetch('../scripts/cities.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Extraire les noms de ville et filtrer les doublons
        villes = [...new Set(data.cities.map(city => city.label.toLowerCase()))]; // Utilise Set pour éliminer les doublons
        console.log(villes); // Afficher les villes sans doublons
    })
    .catch(error => console.error('Erreur de chargement du fichier JSON:', error));


const nbrVilleSuggestion = 8
const regexTab = {
    texte: /^[a-zA-ZÀ-ÿÇç]+$/,
    alphanum: /^[a-zA-ZÀ-ÿÇç0-9]+$/,
    numerique: /^[0-9]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

let validationEtats = {
    nom: false,
    prenom: false,
    telephone: false,
    email: false,
    ville: false,
    societe: false
};

function validerChamp(champ, coche, conditionLongueur, typeValidation, champEtat) {
    champ.addEventListener('input', function () {
        const valeur = champ.value.trim();
        const regex = regexTab[typeValidation];

        if (conditionLongueur(valeur) && regex.test(valeur)) {
            coche.style.display = 'inline'; // Affiche la coche verte
            champ.style.background = 'white';
            validationEtats[champEtat] = true;
        } else {
            coche.style.display = 'none'; // Cache la coche verte
            champ.style.background = 'red';
            validationEtats[champEtat] = false;
        }
    });
}

// Vérifie si tous les champs du formulaire sont valides
function formValide() {
    return Object.values(validationEtats).every(state => state === true);
}

// Fonction pour mettre à jour les suggestions
function mettreAJourSuggestions() {
    const saisie = champVille.value.toLowerCase();
    suggestions.innerHTML = "";

    const suggestionsFiltrees = villes.filter(ville =>
        ville.toLowerCase().includes(saisie)
    );

    if (suggestionsFiltrees.length<=nbrVilleSuggestion)
    {
        suggestionsFiltrees.forEach(ville => {
            const li = document.createElement("li");
            li.textContent = ville;
            suggestions.appendChild(li);
        });
    }
}

// On récupère pour les Id HTML dans le JS
const champNom = document.getElementById('nom');
const cocheNom = document.getElementById('cocheNom');
const champPrenom = document.getElementById('prenom');
const cochePrenom = document.getElementById('cochePrenom');
const champTelephone = document.getElementById("telephone");
const cocheTelephone = document.getElementById("cocheTelephone");
const champEmail = document.getElementById("email");
const cocheEmail = document.getElementById("cocheEmail");
const champVille = document.getElementById("ville");
const cocheVille = document.getElementById('cocheVille');
const suggestions = document.getElementById("suggestions");
const champSociete = document.getElementById("societe");
const cocheSociete = document.getElementById("cocheSociete");
const formulaire = document.getElementById("formulaireContact");

// Appeler la fonction générique pour chaque champ avec le type de validation correspondant
validerChamp(champNom, cocheNom, (valeur) => valeur.length > 5 && valeur.length < 15, 'texte', 'nom');
validerChamp(champPrenom, cochePrenom, (valeur) => valeur.length > 5 && valeur.length < 15, 'texte', 'prenom');
validerChamp(champSociete, cocheSociete, (valeur) => valeur.length > 10 && valeur.length < 25, 'texte', 'societe');
validerChamp(champVille, cocheVille, (valeur) => valeur.length > 5 && valeur.length < 25, 'texte', 'ville');
validerChamp(champTelephone, cocheTelephone, (valeur) => valeur.length === 10, 'numerique', 'telephone');
validerChamp(champEmail, cocheEmail, (valeur) => valeur.length > 5, 'email', 'email');


// Les écouteurs

// Ecouteur pour la validation
formulaire.addEventListener("submit", function(event) {
    if (!formValide()) {
        event.preventDefault(); // Bloque l'envoi du formulaire si la validation échoue
        alert("Veuillez remplir correctement tous les champs du formulaire.");
    }
});

// Écoutez l'événement d'entrée dans le champ de saisie
champVille.addEventListener("input", mettreAJourSuggestions);

// Écoutez l'événement de clic sur une suggestion et remplacez la saisie par la suggestion sélectionnée
suggestions.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        champVille.value = event.target.textContent;
        champVille.style.background = 'white';
        cocheVille.style.display = 'inline';
        suggestions.innerHTML = "";
    }
});