let urlApi = (location.hostname === "localhost" || location.hostname === "127.0.0.1" || !location.hostname) ? "http://localhost:3000" : "https://api.orinoco.maeltissot.com"

let getApi = (new URL(document.location)).searchParams.get('_id');
let productData = []



fetch(urlApi + "/api/cameras/" + getApi)
    .then((response) => {
        if (response.ok) {
            response.json()
                .then((array) => {
                    productData = array
                    buildProductPage()
                })
        }
        else {
            console.log('Réponse fetch incorrecte');
        }
    })
    .catch((error) => {
        console.log('Erreur lors du fetch : ' + error.message)
        document.getElementById('productContainer').innerHTML = '<p class="display-6 fs-4 text-center text-danger">Une erreur est survenue, veuillez rééssayer ultérieurement.</p>'
    });





function buildProductPage() {
    let price = priceConverter(productData.price)
    document.title = `Appareil photo ${productData.name} - Orinoco`
    document.querySelector('.hero__Title').innerHTML = productData.name
    //document.querySelector('.productHeader').style.backgroundImage = `url('${data.imageUrl}')`;
    document.getElementById('productContainer').innerHTML = `
        <div class="col-12 col-lg-6 p-3"><img src="${productData.imageUrl}" class="img-thumbnail" alt="Appareil photo ${productData.name}"></div>
        <div class="col-12 col-lg-6 p-3">
            <h2 class="">${productData.name}</h2><span class="fw-bold">${price}</span>
            <h3 class="mb-3 fs-6 fw-normal lh-base">${productData.description}</h3>
            <span class="input-group-text" id="inputGroup-sizing-sm"><label for="lensChoice">Objectif</label></span>
            <select class="form-select" id="lensChoice" aria-label="Objectifs"></select>

            <div class="input-group mb-3 mt-3">
            <span class="input-group-text" id="inputGroup-sizing-sm"><label for="productQty">Quantité</label></span>
            <input type="number" id="productQty" class="form-control" value="1" min="1" max="100">


            <button class="btn btn-primary form-control" type="button" onclick="addToCart()"><i class="fas fa-shopping-cart"></i> Ajouter au panier</button>
            </div>
        </div>    
    `
    productData.lenses.forEach((lens, index) => {
        let choice = document.createElement("option");
        choice.value = index
        choice.text = lens
        document.getElementById('lensChoice').add(choice)
    })
}






function addToCart() {
    let currentCart = JSON.parse(localStorage.getItem("products")) || []
    let existingProduct
    let indexProduct
    let purchaseList =
    {
        _id: productData._id,
        name: productData.name,
        price: productData.price,
        imageUrl: productData.imageUrl,
        lenses: document.getElementById('lensChoice').value,
        quantity: document.getElementById('productQty').value
    }

    currentCart.forEach((line, index) => {
        if (line._id == purchaseList._id && line.lenses == purchaseList.lenses) {
            existingProduct = true
            indexProduct = index
        }
    })

    if (existingProduct) {
        currentCart[indexProduct].quantity = parseInt(currentCart[indexProduct].quantity) + parseInt(purchaseList.quantity)
        localStorage.setItem('products', JSON.stringify(currentCart))
    } else {
        currentCart.push(purchaseList)
        localStorage.setItem('products', JSON.stringify(currentCart))
    }
    cartPreview()

}