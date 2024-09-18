// Gestion du nom
const champNom = document.getElementById('nom'); // Remplacez 'monChamp' par l'ID de votre champ
const cocheNom = document.getElementById('cocheNom');
var nomok=false;
var prenomok=false;

champNom.addEventListener('input', function () {
    const valeur = champNom.value.trim();
    // Utilisez une expression régulière pour autoriser les lettres accentuées et le caractère "ç"
    const regex = /^[a-zA-ZÀ-ÿÇç]+$/;
    if (valeur.length > 5 && valeur.length < 15 && regex.test(valeur)) {
        cocheNom.style.display = 'inline'; // Affiche la coche verte
        champNom.style.background = 'white';
        nomok = true;
    } else {
        cocheNom.style.display = 'none'; // Cache la coche verte
        champNom.style.background = 'red';
        nomok = false;
    }
});

const champPrenom = document.getElementById('prenom'); // Remplacez 'monChamp' par l'ID de votre champ
const cochePrenom = document.getElementById('cochePrenom');
champPrenom.addEventListener('input', function () {
    const valeur = champPrenom.value.trim();
    // Utilisez une expression régulière pour autoriser les lettres accentuées et le caractère "ç"
    const regex = /^[a-zA-ZÀ-ÿÇç]+$/;
    if (valeur.length > 5 && valeur.length < 15 && regex.test(valeur)) {
        cochePrenom.style.display = 'inline'; // Affiche la coche verte
        champPrenom.style.background = 'white';
        prenomok = true;
    } else {
        cochePrenom.style.display = 'none'; // Cache la coche verte
        champPrenom.style.background = 'red';
        prenomok = false;
    }
});

const formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", function(event) {
    if (!valide()) {
        event.preventDefault(); // Bloque l'envoi du formulaire si la validation échoue
        alert("Veuillez remplir correctement tous les champs du formulaire.");
    }
});

function valide()
{
    if ( nomok && prenomok )
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Liste des noms de villes (exemple)
const villes = [
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
];

const champSaisie = document.getElementById("champSaisie");
const suggestions = document.getElementById("suggestions");

// Fonction pour mettre à jour les suggestions
function mettreAJourSuggestions() {
    const saisie = champSaisie.value.toLowerCase();
    suggestions.innerHTML = "";

    const suggestionsFiltrees = villes.filter(ville =>
        ville.toLowerCase().includes(saisie)
    );

    if (suggestionsFiltrees.length<3)
    {
        suggestionsFiltrees.forEach(ville => {
            const li = document.createElement("li");
            li.textContent = ville;
            suggestions.appendChild(li);
        });
    }

    
}

// Écoutez l'événement d'entrée dans le champ de saisie
champSaisie.addEventListener("input", mettreAJourSuggestions);

// Écoutez l'événement de clic sur une suggestion et remplacez la saisie par la suggestion sélectionnée
suggestions.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        champSaisie.value = event.target.textContent;
        suggestions.innerHTML = "";
    }
});