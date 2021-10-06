cartPreview()

function priceConverter(basePrice) {
    let price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(basePrice / 100);
    return price
}

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


function clearLocalStorage() {
    localStorage.clear()
    buildCart()
    cartPreview()

}

let errorMsg = `<div class="col-12 p-3 text-center p-5">
                <i class="fas fa-exclamation-triangle display-1 mb-3"></i>
                <p class="display-6 fs-4 text-center text-danger">Une erreur est survenue, veuillez rééssayer ultérieurement.</p>
                </div>`