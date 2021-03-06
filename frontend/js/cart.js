let orderForm = document.getElementById("orderForm")
let listId
let totalPrice

// Une fois le DOM chargé, appelle la fonction buildCart()
window.addEventListener('DOMContentLoaded', (event) => {
    buildCart()
});

// Ecoute l'event submit sur l'élement orderForm, 
// bloque le comportement par défaut de l'envoi du formulaire et appelle la fonction postRequest()
orderForm.addEventListener("submit", function (event) {
    event.preventDefault()
    postRequest()
})

// Construit et ajoute le contenu de la page Panier
function buildCart() {
    totalPrice = 0
    listId = []
    document.getElementById('cartListContainer').innerHTML = ""
    currentCart = JSON.parse(localStorage.getItem("products")) || []
    if (currentCart.length != 0) {
        currentCart.forEach((line, index) => {
            listId.push(line._id)
            totalPrice = (totalPrice + (line.price * line.quantity))
            document.getElementById('cartListContainer').innerHTML += `
                <div class="row border-top align-items-center ms-0 me-0">
                    <div class="col-md-2 col-6 p-3"><img src="${line.imageUrl}" class="img-thumbnail" alt="Appareil photo ${line.name}"></div>
                    <div class="col-md-3 col-6 p-3"><h3 class="fs-6">${line.name}</h3>Objectif : ${line.lensesText}</div>
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
                <h2 class="display-6 text-center">Oh ! Votre panier est vide</h2>
                <h3 class="display-6 text-center fs-4">Pourquoi ne pas aller découvrir nos produits ?</h3>
                <a href="index.html" class="btn btn-primary mt-3">Découvrez nos produits</a>
            </div>
        `
    }
}

// Supprime la clé 'products' du localStorage puis rafraichit les données de la page en appelant les fonctions buildCart() et cartPreview()
function clearCart() {
    localStorage.removeItem('products');
    buildCart()
    cartPreview()
}

/**
 * Modifie la valeur quantity de l'item [index] du localStorage (ou le supprime si quantity < 2),
 * puis rafraichit les données de la page en appelant les fonctions buildCart() et cartPreview()
 * @param { string } operator actions add/substract
 * @param { int } index index du produit à modifier
 */
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

// Verifie la validité des champs du formulaire et affiche les messages d'erreur de validation si champs non conformes, sinon, 
// construit et envoie les arrays à l'API, stocke la réponse dans le localStorage, appelle la fonction clearCart() puis redirige vers la page Order.
function postRequest() {
    if (!orderForm.checkValidity()) {
        orderForm.classList.add('was-validated')
    } else {
        let orderData = {
            contact: {
                firstName: document.getElementById('inputName').value,
                lastName: document.getElementById('intputLastName').value,
                email: document.getElementById('intputEmail').value,
                address: document.getElementById('intputAddress').value,
                city: document.getElementById('intputCity').value,
            },
            products: listId
        }
        fetch(urlApi + "/api/cameras/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((array) => {
                            let orderInfos = {
                                infos: {
                                    orderKey: array.orderId,
                                    orderPrice: totalPrice,
                                    date: Date.now(),
                                },
                                contact: array.contact,
                                products: currentCart
                            }
                            storedOrders.unshift(orderInfos)
                            localStorage.setItem('orders', JSON.stringify(storedOrders))
                            clearCart()
                            window.location.href = "order.html"
                        })
                }
                else {
                    console.log(`Echec de la requete : ${response.status} (${response.statusText})`)
                }
            })
            .catch((error) => {
                console.log('Erreur lors du fetch : ' + error.message)
            });
    }
}