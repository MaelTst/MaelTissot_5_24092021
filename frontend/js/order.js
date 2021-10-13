window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('productContainer').innerHTML = buildOrders()
    if (document.getElementById('collapse0')) { new bootstrap.Collapse(document.getElementById('collapse0')) }
});


function buildOrders() {
    totalPrice = 0
    let orderList = `<h2 class="text-center display-6 p-3 mt-3">Historique de vos commandes</h2>`
    if (storedOrders.length != 0) {
        storedOrders.forEach((line, index) => {
            orderList += `
            <div class="accordion p-3">
                <div class="accordion-item shadow-sm">
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button display-6 fs-6 collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                            <span class="p-3">${dateConverter(line.infos.date)}</span>
                            <span class="p-3 border-start d-none d-md-block">n°${line.infos.orderKey}</span>
                            <span class="p-3 border-start">${priceConverter(line.infos.orderPrice)}</span>
                        </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}">
                        <div class="accordion-body p-0">
                            <div class="col-12 p-3">
                                <div class="row justify-content-evenly align-items-center ms-0 me-0">
                                    <div class="col-12 col-md-8 text-center p-3">
                                        <h3 class="text-center text-success display-6 fs-4 p-0 pt-2 pb-2 mt-2 mb-2">Commande validée
                                        </h3>
                                        <p class="text-center fs-6 p-0 pt-2 pb-2 mt-2 mb-2">Cher
                                            ${escapeOutput(line.contact.firstName)}, nous avons le plaisir de vous confirmer la
                                            validation de votre commande <br><strong>n°${line.infos.orderKey}</strong><br></p>
                                        <p class="text-center fs-6 p-0 pt-2 pb-2 mt-2 mb-2">Un email de confirmation vient de vous
                                            être envoyé à l'adresse suivante :
                                            <br><strong>${escapeOutput(line.contact.email)}</strong>
                                        </p>
                                        <p class="text-center display-6 fs-5 p-0 pt-2 pb-2 mt-2 mb-2">Orinoco vous remercie de votre
                                            confiance</p>
                                    </div>
                                    <div class="col-12 col-md-4 text-center p-3 border bg-light">
                                        <h3 class="text-center fs-6 mb-3">Adresse de livraison</h3>
                                        <p class="mb-0">${escapeOutput(line.contact.firstName)}
                                            ${escapeOutput(line.contact.lastName)}</p>
                                        <p class="mb-0">${escapeOutput(line.contact.address)}</p>
                                        <p class="mb-0">${escapeOutput(line.contact.city)}</p>
                                        <a href="#" class="btn btn-primary w-100 mt-3 rounded-0">Suivre mon colis</a>
                                    </div>
                                </div>
                            </div>
                            <h4 class="text-center display-6 fs-3 bg-secondary text-light p-3">Récapitulatif de la commande</h4>
                            <div class="col-12 p-3 align-self-start">
                                <div class="row align-items-center display-5 fs-5 ms-0 me-0">
                                    <div class="col-md-2 d-none d-md-block p-3"></div>
                                    <div class="col-md-3 d-none d-md-block p-3">Produit</div>
                                    <div class="col-md-2 d-none d-md-block p-3">Prix</div>
                                    <div class="col-md-3 d-none d-md-block p-3">Quantité</div>
                                    <div class="col-md-2 d-none d-md-block p-3">Sous-total</div>
                                </div>
                                <div id="cartListContainer">` + buildProductList(index) + `
                                </div>
                            </div>
                            <h4 class="text-center display-6 fs-3 bg-light p-3 mb-0">Total :
                                ${priceConverter(line.infos.orderPrice)}</h4>
                        </div>
                    </div>
                </div>
            </div>`
        })
    } else {
        orderList = `
            <div class="col-12 p-3 text-center p-5">
                <i class="fas fa-archive display-1 mb-3"></i>
                <h2 class="display-6 text-center">Vous n'avez aucune commande</h2>
                <h3 class="display-6 text-center fs-4">Pourquoi ne pas aller découvrir nos produits ?</h3>
                <a href="index.html" class="btn btn-primary mt-3">Découvrez nos produits</a>
            </div>`
    }
    return orderList
}


function buildProductList(index) {
    let productList = ""
    storedOrders[index].products.forEach((line) => {
        productList += `
            <div class="row border-top align-items-center ms-0 me-0">
                <div class="col-md-2 col-6 p-3"><img src="${line.imageUrl}" class="img-thumbnail" alt="${line.name}"></div>
                <div class="col-md-3 col-6 p-3">${line.name}<br>Objectif : ${line.lensesText}</div>
                <div class="col-md-2 col-0 d-none d-md-block p-3">${priceConverter(line.price)}</div>
                <div class="col-md-3 col-6 text-center text-md-start p-3">
                    <div class="input-group justify-content-center justify-content-md-start">
                        <span class="input-group-text bg-white">${line.quantity}</span>
                    </div>
                </div>
                <div class="col-md-2 col-6 p-3 fw-bold">${(priceConverter(line.price * line.quantity))}</div>
            </div>`
    })
    return productList
}
