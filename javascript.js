let articles = ['teddies', 'cameras', 'furniture'];
for (let i in articles){
  fetch("http://localhost:3000/api/" + articles[i])
    .then(function(response){
      return response.json();
    })
    .then(function (items){
      for (let item of items){

      //creation container article
      const section = document.getElementById('all-'+ articles[i]);
      const pdtContainer = document.createElement('article');
      pdtContainer.id = "item";
      section.appendChild(pdtContainer);
      
      //Affichage image
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.setAttribute('class', 'productImg');
      pdtContainer.appendChild(img);

      //affichage name
      const name = document.createElement('h3');
      name.textContent = item.name;
      pdtContainer.appendChild(name);

      //affichage price
      const price = document.createElement('p');
      price.textContent = item.price/100 +" €";
      pdtContainer.appendChild(price);

      //affichage bouton
      const btn = document.createElement("button");
      btn.setAttribute('class', 'btn');
      btn.setAttribute('data-id', item._id);
      btn.textContent = "Voir l'article";
      pdtContainer.appendChild(btn);
      }
      //recuperations des boutons
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(btn => {
      btn.addEventListener('click', (event) => {
      event.preventDefault();
      let id = btn.getAttribute('data-id');
      let page = window.open("product.html?item=" + articles[i]+ "&id="+ id)
      })
    })
  })
}