fetch("http://127.0.0.1:3000/api/cameras/")
            .then ((response) => response.json())
            .then ((array) => { buildProducts(array) })


            function buildProducts(data) {
                data.forEach((item) => { 
                    // Formate le prix du produit 
                    let formatedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price / 100);
                    // Construit la carte produit de chaque objet du tableau
                    document.getElementById('productContainer').innerHTML += `
                    <div class="col-12 col-md-6 col-xl-4 p-3">
                        <div class="card text-center">
                            <img src="${item.imageUrl}" class="card-img-top" alt="Appareil photo ${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                                <a href="/produit.html?id=${item._id}" class="btn btn-primary"><i class="fas fa-shopping-cart"></i> À partir de ${formatedPrice}</a>
                            </div>
                        </div>
                    </div>`
                 })
            }