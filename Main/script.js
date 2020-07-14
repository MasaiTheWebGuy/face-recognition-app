if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

  function ready(){
  var span = document.getElementsByClassName("close")[0];
 

  var btn = document.getElementsByClassName("food")
  for(i=0; i<btn.length; i++){
  var button = btn[i];
  button.addEventListener('click', showFood)
  }
  
  
  var navLink = document.querySelector(".nav")
 navLink.addEventListener('click', function(){
  var nav = document.querySelector("ul")
  if (nav.style.display === "block"){
    nav.style.display = "none";
  } else {
    nav.style.display = "block"
  }
 })
 
  //create the button, multiple buttons? create for loop to distribute functionality
  var removeCartItemButtons = document.getElementsByClassName('btn');
  for(var i=0; i < removeCartItemButtons.length; i++){
      var button = removeCartItemButtons[i];
      button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++){
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  var addToCartButton = document.getElementsByClassName('btn-purchase')
  for (var i = 0; i < addToCartButton.length; i++){
   var button = addToCartButton[i]
   button.addEventListener('click', addToCartClicked)
  }
  document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked)
}

function showFood(event){ 
  var modal = this.getElementsByClassName('modal')[0]
  var span = this.getElementsByClassName("close")[0];
  modal.style.display = "block";
  if (event.target == modal || event.target == span) {
    modal.style.display = "none";
  }
}

function showMenu(){ 
  var menu = document.getElementById('sidemenu')
  menu.classList.toggle("active")
  }


function addToCartClicked(event){
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var modal = button.parentElement.parentElement.parentElement.parentElement.parentElement
  var name = shopItem.getElementsByClassName('food-name')[0].innerText
  var price = shopItem. getElementsByClassName('cart-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('food-pic')[0].src
  var noCondo = shopItem.getElementsByClassName('condo').value
  var quantity = shopItem.querySelector('.cart-quantity-input').value;
  var menu = modal.querySelector('.modal')
  var checkout = modal.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
  var checkOutPop = checkout.querySelector(".sidemenu")
  event.stopPropagation()

  addItemToCart(name, price, quantity, imageSrc, noCondo)
  updateCartTotal()
  alert('item ordered')
  menu.style.display = 'none'
  checkOutPop.classList.add("active")
}

function addItemToCart(name, price, quantity, imageSrc){
  var cartRow = document.createElement('div')
  cartRow.classList.add('item')
  var cartItems = document.getElementsByClassName('ordered-items')[0]
  var cartRowContents = `
                    <div class="pic">
                        <img src="${imageSrc}">
                    </div>
                    <div class="name">
                        <h3>${name}</h3>
                    </div>
                    <div class="total">
                        <span class="cart-price">${price}</span>
                        <input class="cart-quantity-input" type="number" value="${quantity}">
                        <button class="btn">REMOVE</button>
                    </div>
                    `
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function closeNav(){
  var menu = document.getElementById('sidemenu')
  menu.classList.toggle("active")
 
}

var span = document.getElementsByClassName("close")[0];

var modal = document.getElementById("foodModal");

//updating cart and total
function updateCartTotal(){
  var cartItemContainer = document.getElementsByClassName('ordered-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('item')
  var total = 0
  for(var i = 0; i < cartRows.length; i++){
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.textContent.replace('$',''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
 }

 //update how many for each food
 function quantityChanged(event){
  var input = event.target
  if(isNaN(input.value) || input.value <= 0){
      input.value = 1
  }
  updateCartTotal() 
}

//remove button
function removeCartItem(event){
  var buttonClicked = event.target
     buttonClicked.parentElement.parentElement.remove()
     updateCartTotal()
}

//click on Purchase button
function purchaseClicked(){
  alert('thank you for your purchase')
  cartItems = document.getElementsByClassName('ordered-items')[0]
  while(cartItems.hasChildNodes()){
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}




