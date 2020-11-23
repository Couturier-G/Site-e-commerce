let basket = JSON.parse(window.localStorage.getItem('panier'));

if(basket == null) {
    document.getElementById('emptyCart').innerHTML="Votre panier est vide !";
}

//Affichage des produits dans le panier
basket.forEach(function(item, index){
    const section = document.getElementById('recap');
    const pdtContainer = document.createElement('article');
    pdtContainer.id = "itemCase";
    section.appendChild(pdtContainer);

    // affichage nom   
    const itemName = document.createElement('h3');
    itemName.textContent = basket[index].name;
    pdtContainer.appendChild(itemName); 

    //afichage img
    const img = document.createElement('img');
    img.src = basket[index].img;
    img.setAttribute('class', 'cartImg');
    pdtContainer.appendChild(img);

    //affichage options
    function displayOptions(option,pdtContainer){
        let itemOptions = document.createElement('p');
        itemOptions.textContent = option;
        pdtContainer.appendChild(itemOptions);
    }
    const color = basket[index].couleur;
    const lense = basket[index].lenses;
    const furniture = basket[index].varnish;
    if (color){
         displayOptions(color,pdtContainer);
    }
    else if (lense){
        displayOptions(lense,pdtContainer);
    }
    else if (furniture){
        displayOptions(furniture,pdtContainer);
    }
    
    //affichage prix
    const itemPrice = document.createElement('p');
    itemPrice.textContent = basket[index].price + " €";
    pdtContainer.appendChild(itemPrice);

    //bouton supprimer
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    pdtContainer.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', e =>{
        e.preventDefault();
        //suppression affichage du produit
        document.getElementById("itemCase").remove();
        //suppression dans le localstorage
        const item = JSON.parse(localStorage.getItem('panier'));
        item.splice([index],1);
        localStorage.setItem('panier', JSON.stringify(item));
        window.location.reload();       
    })
})

//calcul total
let total = 0;
for(let i in basket)
{
    total += basket[i].price;
}
//affichage total
const section = document.getElementById('recap');
const pdtContainer = document.createElement('article');
pdtContainer.id = "total";
section.appendChild(pdtContainer);
const totalBasket = document.createElement('h3');
totalBasket.textContent = "Votre total : " + total + " €";
pdtContainer.appendChild(totalBasket);

//Bouton vider le panier
const deleteAll = document.createElement("button");
deleteAll.textContent = "Vider le panier";
pdtContainer.appendChild(deleteAll);
deleteAll.addEventListener('click', e =>{
    e.preventDefault();
    //suppression affichage du produit
    localStorage.clear();
    window.location.reload();       
})

//FORMULAIRE
//FORMULAIRE
let bouton = document.getElementById('boutonEnvoi');
bouton.addEventListener('click',(event) => {
    event.preventDefault();
    const contact = {
        lastName : document.getElementById('idNom').value,
        firstName : document.getElementById('idPrenom').value,
        address : document.getElementById('idAdresse').value,
        city : document.getElementById('idVille').value,
        email : document.getElementById('idEmail').value
    }
    const products = []
    for (let i in basket)
    {
        products.push(basket[i].id)
    }  
    const commande = {
        contact,
        products
    }
    const options = {
        method : 'POST',
        body : JSON.stringify(commande),
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    fetch ("http://localhost:3000/api/teddies/order", options)
    .then(function(response){
    return response.json()
    })
    .then(function(response){
        let orderResponse = JSON.stringify(response);
        localStorage.setItem('contact', JSON.stringify(response.contact));
        localStorage.setItem('orderId', JSON.stringify(response.orderId));

        //Fonction test du format
        function checkFormat(testFormat, idInfo){
            if(testFormat === false){
                    document.getElementById('error').innerHTML="Les cases en rouge sont à completer obligatoirement !";
                    idInfo.style.backgroundColor="red";
                    idInfo.style.color="#FFF";
                    return false;
                }
                else
                {
                    idInfo.style.backgroundColor="#9C6";
                    return true;
                }
        }
        // Contrôle sur le nom
        let Nom = document.getElementById('idNom').value;
        let nomId = document.getElementById('idNom');
        let nameFormat = new RegExp(/^[a-zA-ZÀ-ÿ]+$/);
        let testNameFormat = nameFormat.test(Nom);
        checkFormat(testNameFormat,nomId);
    
        // // Contrôle sur le prenom
        let Prenom = document.getElementById('idPrenom').value;
        let prenomId = document.getElementById('idPrenom');
        let prenomFormat = new RegExp(/^[a-zA-ZÀ-ÿ\s-]+$/);
        let testPrenomFormat = prenomFormat.test(Prenom);
        checkFormat(testPrenomFormat, prenomId);

        // //Contrôle sur l'adresse
        let Adresse = document.getElementById('idAdresse').value;
        let adresseId = document.getElementById('idAdresse');
        let adresseFormat = new RegExp(/^([0-9]* )?([a-zA-Z]{2,})+ | [a-zA-Z]{2,}$/);
        let testAdresseFormat = adresseFormat.test(Adresse);
        checkFormat(testAdresseFormat, adresseId);

        // //Contrôle sur la ville
        let Ville = document.getElementById('idVille').value;
        let villeId = document.getElementById('idVille');
        let villeFormat = new RegExp(/^[a-zA-Z\s,.'-]+$/);
        let testVilleFormat = villeFormat.test(Ville);
        checkFormat(testVilleFormat, villeId);

        // // Contrôle sur l'email
        let Email = document.getElementById('idEmail').value;
        let emailId = document.getElementById('idEmail');
        let mailFormat = new RegExp(/^[a-zA-Z0-9_.-]+@[a-z0-9._]{2,}\.[a-z]{2,}$/);
        let testEmailFormat = mailFormat.test(Email);
        checkFormat(testEmailFormat, emailId);

        //RECUPERER TOTAL COMMANDE
        let totalJson = JSON.stringify(total);
        localStorage.setItem('total', totalJson);

        //OUVERTURE PAGE CONFIRMATION
        let infos = JSON.parse(window.localStorage.getItem('orderId'));
        let cart = JSON.parse(window.localStorage.getItem('panier'));
        
        if(infos != null && cart != null && testEmailFormat === true && testVilleFormat === true &&
            testAdresseFormat === true && testPrenomFormat === true && testNameFormat === true){
        let openPage = window.open("confirmation.html");
        }   
    })
})