let title = document.querySelector("#title");
let prices = document.querySelector(".prices");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector(".total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submitBtn = document.querySelector("#submit");
let tbody = document.querySelector("table tbody");
let deleteAllButton = document.querySelector(".deleteAll");
let isUpdateMode = false;
let selectedIndex = -1;

//Get Total Price
function getTotal() {
  price.addEventListener("keyup", updateTotal);
  taxes.addEventListener("keyup", updateTotal);
  ads.addEventListener("keyup", updateTotal);
  discount.addEventListener("keyup", updateTotal);
}

function updateTotal() {
  let priceValue = parseFloat(price.value) || 0;
  let taxesValue = parseFloat(taxes.value) || 0;
  let adsValue = parseFloat(ads.value) || 0;
  let discountValue = parseFloat(discount.value) || 0;

  if (price.value != "") {
    let totalPrice = priceValue + taxesValue + adsValue - discountValue;
    total.innerHTML = `${totalPrice.toFixed(2)}`;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = ``;
    total.style.backgroundColor = "red";
  }
}
getTotal();

//****************************************************************** */
//creat product
let products;
if (localStorage.product != null) {
  products = JSON.parse(localStorage.getItem("product"));
} else {
  products = [];
}

submitBtn.addEventListener("click", submitClickHandler);

function submitClickHandler() {
  if (isUpdateMode) {
    products[selectedIndex].title = title.value;
    products[selectedIndex].price = price.value;
    products[selectedIndex].taxes = taxes.value;
    products[selectedIndex].ads = ads.value;
    products[selectedIndex].discount = discount.value;
    products[selectedIndex].count = count.value;
    products[selectedIndex].category = category.value;
    products[selectedIndex].total = total.textContent;
    isUpdateMode = false;
    clearData();
  } else {
    if (title.value != "" && (price.value != "") & (category.value != "")) {
      let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value || 0,
        ads: ads.value || 0,
        discount: discount.value || 0,
        total: total.textContent,
        count: count.value || 1,
        category: category.value,
      };
      products.push(newProduct);
      clearData();
    }
  }

  submitBtn.innerHTML = "Submit";
  saveToLocalStorage();
  showData(products);

  updateDeleteAllButtonVisibility();
}
//****************************************************************** */
//save in local storage
function saveToLocalStorage() {
  localStorage.setItem("product", JSON.stringify(products));
}
//****************************************************************** */
//clear inputs after submit
function clearData() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });

  total.innerHTML = "Total: ";
  total.style.backgroundColor = "red";
}
//****************************************************************** */
//read
function showData(products) {
  getTotal();
  tbody.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let row = document.createElement("tr");

    let id = document.createElement("td");
    let idContent = document.createTextNode(i + 1);
    id.appendChild(idContent);
    row.appendChild(id);

    let titleElement = document.createElement("td");
    let titleContent = document.createTextNode(products[i].title);
    titleElement.appendChild(titleContent);
    row.appendChild(titleElement);

    let priceElement = document.createElement("td");
    let priceContent = document.createTextNode(products[i].price);
    priceElement.appendChild(priceContent);
    row.appendChild(priceElement);

    let adsElement = document.createElement("td");
    let adsContent = document.createTextNode(products[i].ads);
    adsElement.appendChild(adsContent);
    row.appendChild(adsElement);

    let taxesElement = document.createElement("td");
    let taxesContent = document.createTextNode(products[i].taxes);
    taxesElement.appendChild(taxesContent);
    row.appendChild(taxesElement);

    let discountElement = document.createElement("td");
    let discountContent = document.createTextNode(products[i].discount);
    discountElement.appendChild(discountContent);
    row.appendChild(discountElement);

    let totalElement = document.createElement("td");
    let totalContent = document.createTextNode(products[i].total);
    totalElement.appendChild(totalContent);
    row.appendChild(totalElement);

    let countElement = document.createElement("td");
    let countContent = document.createTextNode(products[i].count);
    countElement.appendChild(countContent);
    row.appendChild(countElement);

    let categoryElement = document.createElement("td");
    let categoryContent = document.createTextNode(products[i].category);
    categoryElement.appendChild(categoryContent);
    row.appendChild(categoryElement);

    let updateElement = document.createElement("td");
    updateElement.innerHTML = `<button class="btn bg-green update c-white rad-6" data-index="${i}"> Update </button>`;
    row.appendChild(updateElement);

    let dele = document.createElement("td");
    dele.innerHTML = `<button class="btn bg-red delete c-white rad-6" data-index="${i}"> Delete </button>`;
    row.appendChild(dele);

    tbody.appendChild(row);
  }
}
showData(products);
//****************************************************************** */
//delete
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    let index = event.target.getAttribute("data-index");
    products.splice(index, 1);
    event.target.parentNode.parentNode.remove();
    saveToLocalStorage();
    showData(products);
    updateDeleteAllButtonVisibility();
  }
});
//****************************************************************** */
//delete All
function updateDeleteAllButtonVisibility() {
  if (products.length === 0) {
    deleteAllButton.style.display = "none";
  } else {
    deleteAllButton.style.display = "block";
    deleteAllButton.innerHTML = `Delete All (${products.length})`;
    deleteAllButton.style.color = "white";
  }
}
updateDeleteAllButtonVisibility();

deleteAllButton.addEventListener("click", () => {
  products = [];
  saveToLocalStorage();
  showData(products);
  updateDeleteAllButtonVisibility();
});
//****************************************************************** */
//update
//update
function update() {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("update")) {
      let index = event.target.getAttribute("data-index");
      title.value = products[index].title;
      price.value = products[index].price;
      taxes.value = products[index].taxes;
      ads.value = products[index].ads;
      discount.value = products[index].discount;
      count.value = products[index].count;
      category.value = products[index].category;
      getTotal();
      total.innerHTML = products[index].total;
      total.style.backgroundColor = "green";
      isUpdateMode = true;
      selectedIndex = index;
      submitBtn.innerHTML = "Update";
      submitBtn.style.backgroundColor = "#0d69d5";
      submitBtn.style.color = "white";
      scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}
update();

//****************************************************************** */
//search
// let searchMode = "";
// let results = [];
// let searchInput = document.querySelector("input[type='search']");
// let searchTitle = document.querySelector(".search-title");
// let searchCategory = document.querySelector(".search-category");

// searchTitle.addEventListener("click", () => {
//   searchMode = "title";
//   search();
// });

// searchCategory.addEventListener("click", () => {
//   searchMode = "category";
//   search();
// });

// function search() {
//   results = [];
//   let searchValue = searchInput.value;
//   for (let i = 0; i < products.length; i++) {
//     if (products[i][searchMode] === searchValue) {
//       results.push(products[i]);
//     }
//   }
//   showData(results);
//   searchInput.value = "";
// }

let searchMode = "title";
let results = [];
let searchInput = document.querySelector(".search-products");
let searchTitle = document.querySelector(".search-title");
let searchCategory = document.querySelector(".search-category");

searchTitle.addEventListener("click", () => {
  searchMode = "title";
  searchInput.value = "";
  searchInput.placeholder = "Search by Title";
});

searchCategory.addEventListener("click", () => {
  searchMode = "category";
  searchInput.value = "";
  searchInput.placeholder = "Search by Category";
});

function searchData(value) {
  results = []; // Clear the previous search results
  for (let i = 0; i < products.length; i++) {
    if (products[i][searchMode].toLowerCase().includes(value.toLowerCase())) {
      results.push(products[i]);
    }
  }
  showData(results);
}
