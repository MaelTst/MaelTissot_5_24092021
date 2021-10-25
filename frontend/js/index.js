// une fois le DOM chargé, fetch l'API et ajoute le contenu retourné par la fonction buildCards si la réponse est ok, sinon, affiche un message d'erreur
window.addEventListener('DOMContentLoaded', (event) => {
    fetch(urlApi + "/api/cameras")
        .then((response) => {
            if (response.ok) {
                response.json()
                    .then((array) => { document.getElementById('productContainer').innerHTML = buildCards(array) })
            }
            else {
                console.log(`Echec de la requete : ${response.status} (${response.statusText})`)
                document.getElementById('productContainer').innerHTML = errorMsg
            }
        })
        .catch((error) => {
            console.log('Erreur lors du fetch : ' + error.message)
            document.getElementById('productContainer').innerHTML = errorMsg
        });
});

// Construit et retourne le contenu de la page index
function buildCards(data) {
    let homepageList = `<h2 class="text-center pb-5 m-0 display-6">Decouvrez nos appareils photo</h2>`
    data.forEach((item) => {
        let price = priceConverter(item.price)
        homepageList += `
            <div class="col-12 col-md-6 col-xl-4 p-3">
                <div class="card text-center shadow-sm">
                    <div class="overflow-hidden">
                    <a href="product.html?_id=${item._id}"><img src="${item.imageUrl}" class="card-img-top" alt="Appareil photo ${item.name}"></a>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-text">${item.description}</p>
                        <a href="product.html?_id=${item._id}" class="btn btn-primary"><i class="fas fa-shopping-cart"></i> À partir de ${price}</a>
                    </div>
                </div>
            </div>`
    })
    return homepageList
}