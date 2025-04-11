import { menuArray } from "./data.js";
let order = [];
//Handling click event based on data-set
document.addEventListener("click", function (e) {
  if (e.target.dataset.itemid) {
    handleAddtoCart(e.target.dataset.itemid);
  }
});

function handleAddtoCart(itemId) {
  const orderObj = menuArray.filter((menuItem) => {
    return menuItem.id == itemId;
  })[0];

  order.push(orderObj);
  displayOrder(order);
}

function displayOrder(order) {
  let orderDetailsHtml = "";
  orderDetailsHtml += ` 
                     
                     <h1>Your Order</h1>
                            ${order
                              .map((item) => {
                                return `  <div class="menu-items">
                                             <div class="item-row">
                                               <span class="item-name">${item.name} <span class="remove">remove</span></span>
                                               
                                             <div class="item-actions">
                                               
                                                 <span class="rate">$${item.price}</span>
                                              </div>
                                             </div>
                                           </div>
                               `;
                              })
                              .join("")}
                          
                    `;

  if (order.length > 0) {
    orderDetailsHtml += `<div class="total">
             <hr>
                       
                       
                
                   
            
                        <h1>Total Price:$ ${order.reduce(
                          (newTotal, currentPrice) => {
                            return newTotal + currentPrice.price;
                          },
                          0
                        )}</h1>
              
                       
                        <button class="btn">Complete Order</button>
                        </div>
                        `;
  }
  document.getElementById("order-details").innerHTML = orderDetailsHtml;
}
//rendering menu on page

const menuItems = menuArray
  .map((item) => {
    return `
      <div class="menu">
                        <div class="menu-img">
                            <span>${item.emoji}<span>

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

function renderMenu() {
  document.getElementById("container").innerHTML += menuItems;
}

renderMenu();
