let urlApi = (location.hostname === "localhost" || location.hostname === "127.0.0.1" || !location.hostname) ? "http://localhost:3000" : "https://api.orinoco.maeltissot.com"

let productId = (new URL(document.location)).searchParams.get('_id');
let productData = []


if (productId) {
    fetch(urlApi + "/api/cameras/" + productId)
        .then((response) => {
            if (response.ok) {
                response.json()
                    .then((array) => {
                        productData = array
                        buildProductPage()
                    })
            }
            else {
                document.getElementById('productContainer').innerHTML = errorMsg
                console.log(`Echec de la requete : ${response.status} (${response.statusText})`);
            }
        })
        .catch((error) => {
            document.getElementById('productContainer').innerHTML = errorMsg
            console.log('Erreur lors du fetch : ' + error.message)
            
        });
} else {
    document.getElementById('productContainer').innerHTML = errorMsg
}





function buildProductPage() {
    let price = priceConverter(productData.price)
    document.title = `Appareil photo ${productData.name} - Orinoco`
    document.querySelector('.hero__Title').innerHTML = productData.name
    document.getElementById('productContainer').innerHTML = `
        <div class="col-12 col-lg-6 p-3"><img src="${productData.imageUrl}" class="img-thumbnail" alt="Appareil photo ${productData.name}"></div>
        <div class="col-12 col-lg-6 p-3">
            <h2 class="">${productData.name}</h2><span class="fw-bold">${price}</span>
            <h3 class="mt-3 mb-3 fs-6 fw-normal lh-base">${productData.description}</h3>
            <div class="row">
                <div class="col-sm-9 col-12">
                    <label for="lensChoice" class="form-label">Objectif</label>
                    <select class="form-select mb-3" id="lensChoice" aria-label="Objectifs"></select>
                </div>
                <div class="col-sm-3 col-12">
                    <label for="productQty" class="form-label">Quantité</label>
                    <input type="number" id="productQty" class="form-control mb-3" value="1" min="1" max="100">
                </div>
            </div>
            <div class="col-12">
                <button class="btn btn-primary w-100 mt-3 mb-3" type="button" data-bs-toggle="modal" data-bs-target="#addedToCart" onclick="addToCart()"><i class="fas fa-shopping-cart"></i> Ajouter au panier</button>
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
    let selOption = document.getElementById('lensChoice')
    let existingProduct
    let indexProduct
    let purchaseList =
    {
        _id: productData._id,
        name: productData.name,
        price: productData.price,
        imageUrl: productData.imageUrl,
        lenses: selOption.value,
        lensesText: selOption.options[selOption.value].text,
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