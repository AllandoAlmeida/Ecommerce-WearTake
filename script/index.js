

let listClothes = document.querySelector(".clothes-card");
let countItems = document.querySelector(".count");
let valueItems = document.querySelector(".valueItems");
let itemsCount = 0;
let amount = 0;

function createListClothesCard (clothes){
    
    let clothesCard = document.createElement('li');
    let imgCard = document.createElement('img');
    let tagCard = document.createElement('p');
    let nameItemCard = document.createElement('h2');
    let descriptionCard = document.createElement('p');
    let valueCard = document.createElement('p');
    let addCartCard = document.createElement('p');

    imgCard.src = clothes.img;
    tagCard.innerText = clothes.tag;
    nameItemCard.innerText = clothes.nameItem;
    descriptionCard.innerText = clothes.description;
    valueCard.innerText = `R$ ${clothes.value.toFixed(2)}`;
    addCartCard.innerHTML = 'Adicionar ao carrinho';
    addCartCard.id = `clothes_${clothes.id}`;
    addCartCard.classList.add('clothesAdd');

    clothesCard.className = 'cards-list box';
    tagCard.className = 'Tag-card';
    valueCard.className = 'showcasePrice';
    tagCard.className = 'showcaseTag';
    nameItemCard.className = 'showcaseName';
    descriptionCard.className = 'showcaseDescription';

    clothesCard.id = clothes.id;

    clothesCard.appendChild(imgCard);
    clothesCard.appendChild(tagCard);
    clothesCard.appendChild(nameItemCard);
    clothesCard.appendChild(descriptionCard);
    clothesCard.appendChild(valueCard);
    clothesCard.appendChild(addCartCard);


    addCartCard.addEventListener('click', function(event){
        let idElemento = event.target.id;
        let id= parseInt(idElemento.substring(8));

        itemsCount++;
        countItems.innerHTML = `${itemsCount}`;

        if(itemsCount > 0){
            document.querySelector(".cart-empty").style.display = 'none';
            if (document.querySelector(".cart-empty").style.display == 'none'){
                document.querySelector(".cart-products").style.display = 'flex';
            }
        }else{
            document.querySelector(".cart-products").style.display = 'flex'; 

        };

        amount += clothes.value;
        valueItems.innerHTML = `${amount}`;

        let clothesRender = renderClothes(id);

        let elementClothes = createShoppingCart(clothesRender);
 
        let shoppingCart = document.querySelector(".cart-list");
        shoppingCart.appendChild(elementClothes);
            
    });

    return clothesCard;
}

function listClothesWeartake (array, store) {
    for(let i = 0; i < array.length; i++){
        let result = createListClothesCard(array[i]);
        store.appendChild(result);
    }   
}

function renderClothes(id) {
    for(let i = 0; i< data.length; i++ ){
        if(data[i].id == id){
            return data[i];
        }
    }
};


function createShoppingCart (items){
    let itemsCard = document.createElement('li');
    let imgCard = document.createElement('img');
    let divitens = document.createElement('div')
    let nameItemCard = document.createElement('h2');
    let valueCard = document.createElement('p');
    let removeCartCard = document.createElement('p');
    
    imgCard.src = items.img;
    nameItemCard.innerText = items.nameItem;
    valueCard.innerText = `R$ ${items.value.toFixed(2)}`;
    removeCartCard.innerHTML = 'Remover produto';
    removeCartCard.id = `items_${items.id}`;
    removeCartCard.classList.add('removeItem');

    
    itemsCard.id = items.id;
    itemsCard.className = 'shopping-card';
    divitens.className = 'shopping-detallhesitem';
    valueCard.className = 'priceItemShopp'
    

    
    itemsCard.appendChild(imgCard);
    itemsCard.appendChild(divitens);
    divitens.appendChild(nameItemCard);
    divitens.appendChild(valueCard);
    divitens.appendChild(removeCartCard);
    
    removeCartCard.addEventListener('click', function(event){
        let contar = 0;
        contar++
        
        itemsCount--;
        countItems.innerHTML = `${itemsCount}`;

        amount -= items.value;
        valueItems.innerHTML = `R$ ${amount}`;

        let removerPath = event.composedPath();
        removerPath[2].remove();

        if (contar > 0 && itemsCount == 0){
            document.querySelector(".cart-empty").style.display = 'flex' 
            if (document.querySelector(".cart-empty").style.display == 'flex'){
                document.querySelector(".cart-products").style.display = 'none';                
            }
        }else{
            document.querySelector(".cart-products").style.display = 'flex';
        }

    })
    return itemsCard;
}


function filterItens (list, str) {
    let listTemp = [];
        for(let i = 0; i < list.length; i++){
        if(list[i].tag == str){
            
            listTemp.push(list[i]);
        } if(str == "Todos"){
            
            listTemp.push(list[i]);
        }
    };
    listClothes.innerHTML = '';
    listClothesWeartake(listTemp, listClothes);  
};

const navMenu = document.querySelector(".header-menu");
navMenu.addEventListener('click', function(event){
    let elemFilter = event.target.className;
    filterItens (data, elemFilter);
});


function askingQuestion (searchQuestion, str){
    let lookingForAnswer = [];
    for(let i = 0; i < searchQuestion.length; i++){
        let strNormalized = str.toLowerCase();
        let tagItemNormalized = searchQuestion[i].tag[0].toLowerCase();
        let nameItemNormalized = searchQuestion[i].nameItem.toLowerCase();
        if(tagItemNormalized.includes(strNormalized) || nameItemNormalized.includes(strNormalized)){
            lookingForAnswer.push(searchQuestion[i])
        }
    }
    listClothes.innerHTML = '';
    listClothesWeartake(lookingForAnswer, listClothes); 
};

const searchItems = document.querySelector("#searchItems")
searchItems.addEventListener("click", function(){
    const searchInput = document.querySelector("#searched-item")
    let strSearch = searchInput.value;
    askingQuestion(data, strSearch);

});

listClothesWeartake(data, listClothes);


