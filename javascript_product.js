//recuperation de l'id de l'url
let url = new URL(document.URL);
let search_param = url.searchParams;
let id = search_param.get('id');
let article = search_param.get('item')

function Display(){
    fetch("http://localhost:3000/api/"+ article + "/" + id)
    .then(function(response){
        return response.json();
    })
    .then(function(product)
    {
        //creation container article
        const section = document.getElementById('product');
        const pdtContainer = document.createElement('article');
        pdtContainer.id = "productItem";
        section.appendChild(pdtContainer);

        //creation img
        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.id = "itemImg";
        pdtContainer.appendChild(img);

        //affichage name
        const name = document.createElement('h3');
        name.textContent = product.name;
        pdtContainer.appendChild(name);

        //affichage price
        const price = document.createElement('p');
        price.textContent = product.price/100 +" €";
        pdtContainer.appendChild(price);

        //affichage description
        const desc = document.createElement('p');
        desc.textContent = product.description;
        pdtContainer.appendChild(desc);

        //Selection de l'option
        const selection = document.createElement('select');
        selection.id = "mySelect";
        pdtContainer.appendChild(selection);
        const teddyOptions = product.colors;
        const cameraOptions = product.lenses;
        const furnitureOptions = product.varnish;
        function selectOptions(options, selection){
            for (let option of options){
                let optionElt = document.createElement("option")
                optionElt.setAttribute("value", option);
                optionElt.text = option;
                selection.appendChild(optionElt)
            }
        }
        if (teddyOptions){
            selectOptions(teddyOptions,selection); 
        }   
        else if (cameraOptions){
            selectOptions(cameraOptions,selection);
        }    
        else if (furnitureOptions){
            selectOptions(furnitureOptions,selection);
        }

        //affichage bouton "ajouter au panier"
        const btn = document.createElement("button");
        btn.setAttribute('class', 'btn');
        btn.setAttribute('data-url', url);
        btn.textContent = "Ajouter au panier";
        pdtContainer.appendChild(btn);
        
         //au clic du bouton "ajouter au panier"
         btn.addEventListener('click', e =>{
            e.preventDefault();
            function alreadyCart (specifications,cartItems,product){
                let cartObject = {
                    name : product.name,
                    price : product.price/100,
                    id : id,
                    couleur : specifications[0],
                    img : product.imageUrl,
                }
                cartItems.push(cartObject);
                localStorage.setItem('panier', JSON.stringify(cartItems));
                alert('Produit ajouté au panier');
            }
            function createCart (specification, product){
                let newBasket = new Array();
                const newobject = {
                    name : product.name,
                    price : product.price/100,
                    id : id,
                    couleur : specification[0],
                    img : product.imageUrl,
                }
                newBasket.push(newobject);
                localStorage.setItem('panier',JSON.stringify(newBasket));
                alert('Produit ajouté au panier');
            }
            //Il y a deja un item dans le panier
            if (localStorage.getItem('panier')){
                let cartItems = (localStorage.getItem('panier'));
                cartItems = JSON.parse(cartItems);
                if (teddyOptions){
                    alreadyCart(teddyOptions,cartItems,product);
                }
                else if (cameraOptions){
                    alreadyCart(cameraOptions,cartItems,product);
                }
                else if (furnitureOptions){
                    alreadyCart(furnitureOptions,cartItems,product)
                }
            }
            //IL n'y a rien dans le panier
            else{
                if(teddyOptions){
                    createCart(teddyOptions, product);
                }
                if(cameraOptions){
                    createCart(cameraOptions, product);
                }
                if(furnitureOptions){
                    createCart(furnitureOptions, product);
                }
            }
        })
    })
}
Display();