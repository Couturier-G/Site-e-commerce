let infos = JSON.parse(window.localStorage.getItem('contact'));
let total = JSON.parse(window.localStorage.getItem('total'));
let cart = JSON.parse(window.localStorage.getItem('panier'));
let orderId = JSON.parse(window.localStorage.getItem('orderId'));

function confirmation (info, index){
    const section = document.getElementById('infoRecap');
    const pdtContainer = document.createElement('article');
    pdtContainer.id = "infoBulle";
    section.appendChild(pdtContainer);

    //affichage du N° commande
    const orderNumber = document.createElement('p');
    orderNumber.textContent = "Commande N° : " + orderId ;
    pdtContainer.appendChild(orderNumber);

    //affichage du total de la commande
    const cartTotal = document.createElement('p');
    cartTotal.textContent = "Récapitulatif du total de votre commande : " + total + " €";
    pdtContainer.appendChild(cartTotal);

    //affichage de remerciement de commande
    const thanks = document.createElement('p');
    thanks.textContent = infos.lastName + " " + infos.firstName + " merci de votre commande.";
    pdtContainer.appendChild(thanks);

    const mailConfirm = document.createElement('p');
    mailConfirm.textContent = "Vous recevrez la confirmation de commande sur votre adresse mail : " + infos.email;
    pdtContainer.appendChild(mailConfirm);

    const addressConfirm = document.createElement('p');
    addressConfirm.textContent = "Votre commande sera livré a l'adresse suivante : " + infos.address +" "+ infos.city;
    pdtContainer.appendChild(addressConfirm);
}
confirmation();