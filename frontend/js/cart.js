buildCart()


function buildCart() {
    let totalPrice = 0
    document.getElementById('cartListContainer').innerHTML = ""
    currentCart = JSON.parse(localStorage.getItem("products")) || []
    if (currentCart.length != 0) {
        currentCart.forEach((line, index) => {
            totalPrice = (totalPrice + (line.price * line.quantity))
            document.getElementById('cartListContainer').innerHTML += `
                <div class="row border-top align-items-center ms-0 me-0">
                    <div class="col-md-2 col-6 p-3"><img src="${line.imageUrl}" class="img-thumbnail"></div>
                    <div class="col-md-3 col-6 p-3">${line.name}<br>Objectif : ${line.lensesText}</div>
                    <div class="col-md-2 col-0 d-none d-md-block p-3">${priceConverter(line.price)}</div>

                    <div class="col-md-3 col-6 text-center text-md-start p-3">
                    <div class="input-group justify-content-center justify-content-md-start">
                    <button class="btn bg-secondary text-white" onclick="modifyCart('subtract', ${index})">-</button>
                    <span class="input-group-text bg-white">${line.quantity}</span>
                    <button class="btn bg-primary text-white" onclick="modifyCart('add', ${index})">+</button>
                    </div>
                    </div>
                    
                    <div class="col-md-2 col-6 p-3 fw-bold">${(priceConverter(line.price * line.quantity))}</div>
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


function modifyCart(operator, index) {
    switch (operator) {
        case "subtract": 
            if (currentCart[index].quantity < 2) { 
                currentCart.splice(index, 1)
                localStorage.setItem('products', JSON.stringify(currentCart))
            } else {
                currentCart[index].quantity--
                localStorage.setItem('products', JSON.stringify(currentCart))
            }
            break;
        case "add": 
        currentCart[index].quantity++
        localStorage.setItem('products', JSON.stringify(currentCart))
            break;
        default:
            console.log("erreur")
    }
    buildCart()
    cartPreview()
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