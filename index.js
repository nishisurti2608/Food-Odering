import { menuArray } from "./data.js";

const containerEl = document.getElementById("container");

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
                        <div class="add-icon">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                           
                        </div>
                     

                       `;
  })
  .join("");

containerEl.innerHTML = menuItems;
console.log(menuArray);
