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
    }
}