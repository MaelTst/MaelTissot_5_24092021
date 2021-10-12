let listOrders
buildOrders()



function buildOrders() {
    totalPrice = 0
    listId = []
    listOrders = JSON.parse(localStorage.getItem("orders")) || []
    if (listOrders.length != 0) {
        listOrders.forEach((line, index) => {
            document.getElementById('orderListContainer').innerHTML += `


            <div class="accordion pt-3">


            <div class="accordion-item shadow-sm">
              <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button display-6 fs-6 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                    <span class="p-3">${dateConverter(line.infos.date)}</span>
                    <span class="p-3 border-start d-none d-md-block">n°${line.infos.orderKey}</span>
                    <span class="p-3 border-start">${priceConverter(line.infos.orderPrice)}</span>
                </button>
              </h2>
              <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}">
                <div class="accordion-body p-0">
                <div class="text-center">
                <i class="fas fa-check display-1 text-success"></i>
                <h3 class="text-center fs-6 p-3">Cher ${escapeOutput(line.contact.lastName)}, nous avons le plaisir de vous informer que votre commande n°${line.infos.orderKey} a été validée, Orinoco vous remercie pour votre confiance</h3>
                </div>
               

                <h4 class="text-center display-6 fs-3 bg-light p-3">Récapitulatif de la commande</h4>
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
                <h4 class="text-center display-6 fs-3 bg-secondary text-light p-3 mb-0">Total : ${priceConverter(line.infos.orderPrice)}</h4>
              </div>
  
  
  
            </div></div>
            </div>`

        })
        new bootstrap.Collapse(document.getElementById('collapse0'))
    } else {
        document.getElementById('productContainer').innerHTML = `
            <div class="col-12 p-3 text-center p-5">
            <i class="fas fa-archive display-1 mb-3"></i>
            <p class="display-6 text-center">Vous n'avez aucune commande</p>
            <p class="display-6 text-center fs-4">Pourquoi ne pas aller découvrir nos produits ?</p>
            <a href="index.html" class="btn btn-primary mt-3">Découvrez nos produits</a>
            </div>
        `
    }

}



function buildProductList(index) {
    let productList = ""
    listOrders[index].products.forEach((line) => {
        productList += `<div class="row border-top align-items-center ms-0 me-0">
                    <div class="col-md-2 col-6 p-3"><img src="${line.imageUrl}" class="img-thumbnail"></div>
                    <div class="col-md-3 col-6 p-3">${line.name}<br>Objectif : ${line.lensesText}</div>
                    <div class="col-md-2 col-0 d-none d-md-block p-3">${priceConverter(line.price)}</div>
                    <div class="col-md-3 col-6 text-center text-md-start p-3">
                    <div class="input-group justify-content-center justify-content-md-start">
                    <span class="input-group-text bg-white">${line.quantity}</span>
                    </div>
                    </div>
                    
                    <div class="col-md-2 col-6 p-3 fw-bold">${(priceConverter(line.price * line.quantity))}</div>
                    </div>
        `
    })
    return productList
}
