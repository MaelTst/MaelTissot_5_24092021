let urlApi = (location.hostname === "localhost" || location.hostname === "127.0.0.1" || !location.hostname) ? "http://localhost:3000" : "https://api.orinoco.maeltissot.com"
let storedOrders = JSON.parse(localStorage.getItem("orders")) || []
let currentCart = JSON.parse(localStorage.getItem("products")) || []

// Appelle la fonction cartPreview() une fois le DOM chargé
window.addEventListener('DOMContentLoaded', (event) => {
    cartPreview()
});

/**
 * Convertit la valeur price retournée par l'API en un prix intelligible
 * @param { number } basePrice
 * @return { number } Prix formaté 
 */
function priceConverter(basePrice) {
    let price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(basePrice / 100);
    return price
}

/**
 * Convertit le timestamp retourné par Date.now() en date intelligible
 * @param { number } baseDate
 * @return { string } Date formatée
 */
function dateConverter(baseDate) {
    let fullDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(baseDate);
    return fullDate
}

/**
 * Compte le nombre de produits présents dans le localStorage et l'affiche sur l'icone Panier du menu
 */
function cartPreview() {
    let currentCart = JSON.parse(localStorage.getItem("products")) || []
    let currentCartCount = 0
    currentCart.forEach((line) => {
        if (line.quantity) {
        currentCartCount = currentCartCount + parseInt(line.quantity)
        }
    })
    if (currentCartCount !== 0) {
        document.getElementById('cartCount').innerHTML = currentCartCount
    } else {
        document.getElementById('cartCount').innerHTML = ""
    }
}

/** Remplace les caractères &<>"' par leurs équivalents HTML
 * @param { string } output
 * @return { string } output echappé
 */
function escapeOutput(output) {
    return output
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
  }

let errorMsg = `<div class="col-12 p-3 text-center p-5">
                <i class="fas fa-exclamation-triangle display-1 mb-3"></i>
                <p class="display-6 fs-4 text-center text-danger">Une erreur est survenue, veuillez réessayer ultérieurement.</p>
                </div>`