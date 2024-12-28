//Access JSON document
//Show category Function


//add active class to navlinks

//grab nav links
const homeNavLink = document.getElementById("home-navlink");
const menuNavLink = document.getElementById("menu-navlink");
const aboutNavLink = document.getElementById("about-navlink");

document.getElementById("header").addEventListener("mouseleave", function() {
  document.getElementById("navbar-active").checked = false;
});

function showHomepage() {
  homeNavLink.classList.add("active");
  menuNavLink.classList.remove("active");
  aboutNavLink.classList.remove("active");
  document.getElementById("homepage").style.display = "block";
  document.getElementById("menu-categories").style.display = "none";
  document.getElementById("menu-category").style.display = "none";
  document.getElementById("about").style.display = "none";
}

function showMenu() {
  homeNavLink.classList.remove("active");
  menuNavLink.classList.add("active");
  aboutNavLink.classList.remove("active");
  document.getElementById("homepage").style.display = "none";
  document.getElementById("menu-categories").style.display = "block";
  document.getElementById("menu-category").style.display = "none";
  document.getElementById("about").style.display = "none";
}

function showCategory(menuCategory) {
  homeNavLink.classList.remove("active");
  menuNavLink.classList.add("active");
  aboutNavLink.classList.remove("active");
  document.getElementById("homepage").style.display = "none";
  document.getElementById("menu-categories").style.display = "none";
  document.getElementById("menu-category").style.display = "block";
  document.getElementById("about").style.display = "none";

  fetch('./menu-items.json')
  .then(response => response.json())
  .then(data => {

    let categoryInfo = "";
      if (menuCategory == "Lunch Menu") {
        categoryInfo = "Sunday-Friday 11:15am-3:00pm. Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot & Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll.";
      } else if (menuCategory == "Dinner Menu") {
        categoryInfo = "Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot & Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll.";
      } else if (menuCategory == "Sushi Menu") {
        categoryInfo = "Contains raw ingredients. Consuming raw or undercooked meat, poultry, or seafood may increase your risk of food borne illness.";
      } else {
        categoryInfo = " ";
      };

    let markup = `<h2>${menuCategory}</h2>
      <p class="category-info">${categoryInfo}</p>
      <div class="category-container">`

    for (let i = 0; i < data[menuCategory].length; i++) {
      let name = data[menuCategory][i].name;
      let image = data[menuCategory][i].image;
      let code = data[menuCategory][i].code;
      let info = data[menuCategory][i].info;
      let has2prices = data[menuCategory][i].has2prices;
      let price = `$${data[menuCategory][i].price1} `;
      if (has2prices) {
        price += `<span>${data[menuCategory][i].label1}</span> `;
        price += `$${data[menuCategory][i].price2} `;
        price += `<span>${data[menuCategory][i].label2}</span> `;
      };

      markup += `
        <div class="container-item">
          <div class="flex-div">
            <div class="image">
              <img src=${image} alt=${name} loading="lazy">
              <p class="code">${code}</p>
            </div>
            <p class="price">${price}</p>
          </div>
          <div class="flex-div">
            <h3>${name}</h3>
            <p class="info">${info}</p>
          </div>
        </div>
      `;

      if (i !== data[menuCategory].length - 1) {
        markup += `<hr class="menu-hr">`
      };
    };
    markup += "</div>";
    document.getElementById("menu-category").innerHTML = markup;
  })
  .catch(error => console.error('Error loading JSON:', error));
}

function showRandomCategory() {
  let menuArr = ["Soup Menu", "Appetizers Menu", "Lunch Menu", "Specials Menu", "Chicken Menu", "Beef Menu", "Veal Menu", "Duck Menu", "Vegetables Menu", "Lo Mein Menu", "Mei Fan Menu", "Pan Fried Noodles Menu", "Fried Rice Menu", "Chow Mein Menu", "Sides Menu", "Desserts Menu", "Dinner Menu", "Sushi Menu"];
  let randomIndex = Math.floor(Math.random() * menuArr.length);
  showCategory(menuArr[randomIndex]);
}

function showAbout() {
  homeNavLink.classList.remove("active");
  aboutNavLink.classList.add("active");
  menuNavLink.classList.remove("active");
  document.getElementById("homepage").style.display = "none";
  document.getElementById("menu-categories").style.display = "none";
  document.getElementById("menu-category").style.display = "none";
  document.getElementById("about").style.display = "block";
}