import { menuArray } from "./data.js";
let order = []; //saving user order in this array in Object format
const formEl = document.getElementById("pay-form");

//Step:1 -> creating UI as per the array which we received and adding data-set to + button

const menuItems = menuArray
  .map((item) => {
    return `
      <div class="menu">
                        <div class="menu-img">
                            <span>${item.emoji}</span>

                        </div>

                            <div class="item-info">
                                <p class="item-name">${item.name}</p>
                                <p class="item-contains">${item.ingredients}</p>
                                <p class="item-price">$${item.price}</p>

                            </div>
                        <button id="add-icon" data-itemid=${item.id}>
                            <i class="fa-solid fa-plus"></i>
                        </button>
                           
                        </div>
                        <hr>
                       
                     

                       `;
  })
  .join("");

//step-2 : creating function to render HTML structure to main page/ div
function renderMenu() {
  document.getElementById("container").innerHTML += menuItems;
}

//step-3 : rendering HTML structure to main page/ div
renderMenu();

// step-4 : listening for add-to cart "+" button remove and pay btn

document.addEventListener("click", function (e) {
  e.preventDefault();
  const itemBtn = e.target.closest("[data-itemid]"); //because we need to listen for both i and btn tag
  if (itemBtn) {
    handleAddtoCart(itemBtn.dataset.itemid);
  }

  //listening for remove click
  if (e.target.dataset.itemname) {
    removeCartItem(e.target.dataset.itemname);
  }

  // step: 9 - open card-details popup on complete order button click
  if (e.target.id === "order-btn") {
    formEl.style.display = "flex";
  }
});

// step-5 : Adding Items into order array for user

function handleAddtoCart(itemId) {
  const orderObj = menuArray.find((item) => item.id == itemId);

  // confirming right menu items from menuArray

  order.push(orderObj); //pushing object into order array

  displayOrder(order); // passing an array of objects
}

// step:6 Displaying users order if user added items in cart and also added  data-set for remove

function displayOrder(order) {
  let orderDetailsHtml = "";
  if (order.length > 0) {
    orderDetailsHtml += ` <h1>Your Order</h1>
                              ${order
                                .map((item) => {
                                  return `  <div class="menu-items">
                                               <div class="item-row">
                                                 <span class="item-name">${item.name} <span class="remove" data-itemname=${item.name}>remove</span></span>
                                                 
                                               <div class="item-actions">
                                                 
                                                   <span class="rate">$${item.price}</span>
                                                </div>
                                               </div>
                                             </div>
                                 `;
                                })
                                .join("")}
                            
                      `;
    //step: 8 - add discount for combo
    const price = order.reduce(
      (newTotal, currentPrice) => newTotal + currentPrice.price,
      0
    );

    //combo logic
    let discount = 5;
    const drinkName = ["Beer"]; //infuture there can be more drinks
    let drinkCount = 0;
    let foodCount = 0;
    let totalDiscount = 0;
    order.forEach((item) => {
      drinkName.includes(item.name) ? drinkCount++ : foodCount++;
    });

    const combo = Math.min(drinkCount, foodCount);
    combo > 0 ? (totalDiscount = combo * discount) : (totalDiscount = 0);

    orderDetailsHtml += `<div class="total">
               <hr>
                         
                         
                  
                       <h1>Before Discount: <span class="total-amount">$ ${price}</span></h1>
             <h1>Combo Discount: <span class="total-amount">$ ${totalDiscount}</span></h1>
                         <h1>Total Price: <span class="total-amount">$ ${
                           price - totalDiscount
                         }</span></h1>
                
                         
                          <button id="order-btn" class="btn">Complete Order</button>
                          </div>
                          `;
  }

  document.getElementById("order-details").innerHTML = orderDetailsHtml;
}

// step:7 - add remove functionality
function removeCartItem(itemName) {
  const itemIndex = order.findIndex((menuItem) => menuItem.name === itemName);
  if (itemIndex !== -1) {
    order.splice(itemIndex, 1);
  }
  displayOrder(order);
}

// step: 10 - close card-details popup

document
  .getElementById("card-close-btn")
  .addEventListener("click", function () {
    formEl.style.display = "none";
  });

//   step:11 on PAY button click change div

document.getElementById("pay-btn").addEventListener("click", function () {
  document.getElementById(
    "order-details"
  ).innerHTML = `<div id="complete">"Thanks, James! Your Oder is on its way!"</div>`;
  formEl.style.display = "none";
});
