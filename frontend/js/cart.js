let totalPrice = 0
buildCart()


function buildCart() {
    let currentCart = JSON.parse(localStorage.getItem("products")) || []
    if (currentCart.length != 0) {
        currentCart.forEach((line) => {
            totalPrice = (totalPrice + (line.price * line.quantity))
            document.getElementById('cartListContainer').innerHTML += `
                <div class="row border-top align-items-center ms-0 me-0">
                    <div class="col-md-2 col-4 p-3"><img src="${line.imageUrl}" class="img-thumbnail"></div>
                    <div class="col-md-4 col-8 p-3">${line.name}<br>Objectif : ${line.lensesText}</div>
                    <div class="col-md-2 col-0 d-none d-md-block p-3">${priceConverter(line.price)}</div>
                    <div class="col-md-2 col-4 text-center text-md-start p-3">${line.quantity}</div>
                    <div class="col-md-2 col-8 p-3 fw-bold">${(priceConverter(line.price * line.quantity))}</div>
                </div>    
            `
        })
        document.getElementById('CartTotalPrice').innerHTML = priceConverter(totalPrice)
    } else {
        document.getElementById('productContainer').innerHTML = `
            <div class="col-12 p-3 text-center p-5">
            <i class="fas fa-shopping-cart display-1 mb-3"></i>
            <p class="display-6 text-center">Oh ! Votre panier est vide</p>
            <p class="display-6 text-center fs-4">Pourquoi ne pas aller découvrir nos produits ?</p>
            <a href="index.html" class="btn btn-primary mt-3">Découvrez nos produits</a>
            </div>
        `
    }

}



(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()