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
                        <div class="price">
                    
                            ${order
                              .map((item) => {
                                return `<h1>${item.name}<span class="remove">remove</span> <span class="rate">$${item.price}</span></h1>  
                               `;
                              })
                              .join("")}
                          
                        </div>`;

  if (order.length > 0) {
    orderDetailsHtml += `<div class="price">
                        <h1>Total Price:</h1>
                
                        <p class="rate"> ${order.reduce(
                          (newTotal, currentPrice) => {
                            return newTotal + currentPrice.price;
                          },
                          0
                        )}</p>
                       
                        </div>
                        `;
  }
  document.getElementById("order-details").innerHTML = orderDetailsHtml;
}

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

function render() {
  document.getElementById("container").innerHTML += menuItems;
}

render();
