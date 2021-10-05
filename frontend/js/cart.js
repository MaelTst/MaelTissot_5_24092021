let totalPrice = 0
buildCart()


function buildCart() {
    let currentCart = JSON.parse(localStorage.getItem("products")) || []
    if (currentCart.length != 0) { 
        currentCart.forEach((line) => {
            totalPrice = (totalPrice + (line.price * line.quantity))
            document.getElementById('productListCart').insertAdjacentHTML('afterbegin', `
                <tr>
                    <td><img src="${line.imageUrl}" height="100"></td>
                    <td>${line.name}<br>Objectif : ${line.lensesText}</td>
                    <td>${priceConverter(line.price)}</td>
                    <td>${line.quantity}</td>
                    <td>${(priceConverter(line.price * line.quantity))}</td>
                    <td></td>
                </tr>
            `)
        })
        document.getElementById('CartTotalPrice').innerHTML = priceConverter(totalPrice)
    } else {
        document.getElementById('productContainer').innerHTML = `
            <div class="col-12 p-3 text-center">
            <i class="fas fa-shopping-cart display-1 mb-3"></i>
            <p class="display-6 text-center">Oh ! Votre panier est vide</p>
            <p class="display-6 text-center fs-4">Pourquoi ne pas aller découvrir nos produits ?</p>
            <a href="index.html" class="btn btn-primary mt-3">Découvrez nos produits</a>
            </div>
        `
    }

}