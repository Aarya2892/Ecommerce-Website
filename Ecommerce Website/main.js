let cardIcon = document.querySelector('#card-icon');
let cart = document.querySelector(".cart");
let closedCart = document.querySelector('#closed-cart');

cardIcon.onclick = ()=>{
    cart.classList.add("active");
}

closedCart.onclick = ()=>{
    cart.classList.remove("active");
}

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}
//buy button work
document.getElementsByClassName("btn-buy")[0].addEventListener("click",buybutton)
function buybutton(){
    //alert("Your order is placed")
    onclick(open('orderPlaced.html'))
    let cartContent = document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
 //remove items from cart
function ready(){
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(let i=0; i<removeCartButtons.length; i++){
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem)
    }
}

//Quantity chnages
let quantityInputs = document.getElementsByClassName("cart-quantity");
for(let i=0; i<quantityInputs.length; i++){
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanges);
}

//Add to cart
let addtocart = document.getElementsByClassName("add-cart")
for(let i=0; i<addtocart.length; i++){
    let button = addtocart[i];
    button.addEventListener("click", addCartClicked);
}
function addCartClicked(){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerHTML;
    let price = shopProducts.getElementsByClassName("price")[0].innerHTML;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}
function addProductToCart(title, price, productImg){
     let cartshopbox = document.createElement('div');
     cartshopbox.classList.add('cart-box');
     let cartitems = document.getElementsByClassName("cart-content")[0];
     let cartItemsNames = cartitems.getElementsByClassName('cart-product');
     for(let i=0; i< cartItemsNames.length; i++){
        if(cartItemsNames[i].innerHTML == title){
        alert("You already add this product into your cart")
        return;
     }
    }
let cartBoxContent = `<img src="${productImg}" alt="" class="card-img">
                      <div class="detail-box">
                      <div class="cart-product">${title}</div>
                      <div class="cart-price">${price}</div>
                      <input type="number" value="1" class="cart-quantity">
                      </div>
                      <i class='bx bxs-box cart-remove'></i>`;
cartshopbox.innerHTML = cartBoxContent
cartitems.append(cartshopbox)
cartshopbox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
cartshopbox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanges);
}

function removeCartItem(event){
   let buttonClicked = event.target;
   buttonClicked.parentElement.remove();
   updateTotal();
}

//Quantity changes
function quantityChanges(event){
    let input = event.target;
    if(isNaN(input.value)|| input.value <=0){
        input.value = 1;
    }
    updateTotal();
}

//update total
function updateTotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0]
    let cartBoxes = cartContent.getElementsByClassName("cart-box")
    let total = 0;
    for(let i=0; i<cartBoxes.length; i++){
         let cartBox = cartBoxes[i];
         let priceElement = cartBox.getElementsByClassName("cart-price")[0];
         let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
         let price =parseFloat(priceElement.innerHTML.replace("$", ""));
         let quantity = quantityElement.value;
         total = total + price * quantity;
         total= Math.round(total * 100)/100 ;

         document.getElementsByClassName("total-price")[0].innerHTML = "$" + total};
}
