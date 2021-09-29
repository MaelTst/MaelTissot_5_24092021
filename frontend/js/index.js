let urlAPI = (location.hostname === "localhost" || location.hostname === "127.0.0.1" || !location.hostname) ? "http://localhost:3000" : "https://api.orinoco.maeltissot.com"

fetch(urlAPI + "/api/cameras")
    .then((response) => {
        if (response.ok) {
            response.json()
                .then((array) => { buildProducts(array) })
        }
        else {
            console.log('Réponse fetch incorrecte');
        }
    })
    .catch((error) => {
        console.log('Erreur lors du fetch : ' + error.message);
        document.getElementById('productContainer').innerHTML = '<p class="display-6 fs-4 text-center text-danger">Une erreur est survenue, veuillez rééssayer ultérieurement.</p>'
    });


function buildProducts(data) {
    document.getElementById('productContainer').innerHTML = ""
    data.forEach((item) => {
        // Formate le prix du produit 
        let formatedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price / 100);
        // Construit la carte produit de chaque objet du tableau
        document.getElementById('productContainer').innerHTML += `
                    <div class="col-12 col-md-6 col-xl-4 p-3">
                        <div class="card text-center shadow-sm">
                            <div class="overflow-hidden">
                                <img src="${item.imageUrl}" class="card-img-top" alt="Appareil photo ${item.name}">
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">${item.name}</h3>
                                <p class="card-text">${item.description}</p>
                                <a href="/produit.html?id=${item._id}" class="btn btn-primary"><i class="fas fa-shopping-cart"></i> À partir de ${formatedPrice}</a>
                            </div>
                        </div>
                    </div>`
    })
}