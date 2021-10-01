let urlAPI = (location.hostname === "localhost" || location.hostname === "127.0.0.1" || !location.hostname) ? "http://localhost:3000" : "https://api.orinoco.maeltissot.com"

let paramAPI = (new URL(document.location)).searchParams.get('_id');

fetch(urlAPI + "/api/cameras/" + paramAPI)
    .then((response) => {
        if (response.ok) {
            response.json()
                .then((array) => { buildProductPage(array) })
        }
        else {
            console.log('Réponse fetch incorrecte');
        }
    })
    .catch((error) => {
        console.log('Erreur lors du fetch : ' + error.message);
        document.getElementById('productContainer').innerHTML = '<p class="display-6 fs-4 text-center text-danger">Une erreur est survenue, veuillez rééssayer ultérieurement.</p>'
    });


function buildProductPage(data) {
    let formatedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(data.price / 100);
    document.title = `Appareil photo ${data.name} - Orinoco`
    document.querySelector('.hero__Title').innerHTML = data.name
    //document.querySelector('.productHeader').style.backgroundImage = `url('${data.imageUrl}')`;
    document.getElementById('productContainer').innerHTML = `
        <div class="col-12 col-lg-6 p-3"><img src="${data.imageUrl}" class="img-thumbnail" alt="Appareil photo ${data.name}"></div>
        <div class="col-12 col-lg-6 p-3">
            <h2 class="">${data.name}</h2><span class="fw-bold">${formatedPrice}</span>
            <p class="">${data.description}</p>
            <select class="form-select" id="lensChoice" aria-label="Objectifs">
            <option selected>Choissisez votre objectif</option>
            </select>
            <button class="btn btn-primary mt-3"><i class="fas fa-shopping-cart"></i> Ajouter au panier</button>
        </div>    
    `
    data.lenses.forEach((lens, index) => {
        var choice = document.createElement("option");
        choice.value = index
        choice.text = lens
        document.getElementById('lensChoice').add(choice)
    })
}