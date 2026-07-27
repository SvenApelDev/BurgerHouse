// ------ PRODUCTS DATA ------

let products = [
	{
		name: "Veggie mushroom black burger",
		description:
			"Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
		price: 16.9,
		image: "assets/images/veggie-burger.png",
		category: "burger",
	},
	{
		name: "All meat burger",
		description:
			"Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ souse",
		price: 15.9,
		image: "assets/images/meat-burger.png",
		category: "burger",
	},
	{
		name: "Beef red burger",
		description: "Beef, Cheese, Tomatoes, Lettuce, Onion",
		price: 14.9,
		image: "assets/images/beef-burger.png",
		category: "burger",
	},
	{
		name: "Big chicken burger",
		description: "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
		price: 15.9,
		image: "assets/images/chicken-burger.png",
		category: "burger",
	},
	{
		name: "Pizza Margherita",
		description: "Tomato Sauce, Mozzarella",
		price: 11.9,
		image: "assets/images/margherita-pizza.png",
		category: "pizza",
	},
	{
		name: "Pizza Chorizo",
		description: "Tomato slices, Mozzarella, Chorizo",
		price: 13.9,
		image: "assets/images/chorizo-pizza.png",
		category: "pizza",
	},
	{
		name: "Pizza Funghi",
		description: "Red onion, Olives, Button Mushrooms, Mozzarella",
		price: 12.9,
		image: "assets/images/funghi-pizza.png",
		category: "pizza",
	},
	{
		name: "Quattro Formaggi with Chicken",
		description:
			"Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
		price: 16.9,
		image: "assets/images/quattro-pizza.png",
		category: "pizza",
	},
	{
		name: "Warm beef arugula salad",
		description:
			"Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried Tomatoes, Balsamic-vinegar dressing",
		price: 16.9,
		image: "assets/images/beef-arugula-salad.png",
		category: "salad",
	},
	{
		name: "Mini green Salad",
		description: "Green salad, Cucumber, Carrots, Parsley, Radishes",
		price: 7.9,
		image: "assets/images/mini-green-salad.png",
		category: "salad",
	},
	{
		name: "Green Salad with sea food",
		description:
			"Mixed greens, Cherry tomatoes, Red onion, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing with dill",
		price: 16.9,
		image: "assets/images/green-sea-food-salad.png",
		category: "salad",
	},
	{
		name: "Vegan green salad with tofu",
		description:
			"Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",
		price: 14.9,
		image: "assets/images/vegan-green-salad.png",
		category: "salad",
	},
];

// ------ BASKET ------

let basket = [];

// ------ CATEGORIES ------

const categories = [
	{ name: "burger", ref: "list-burger" },
	{ name: "pizza", ref: "list-pizza" },
	{ name: "salad", ref: "list-salad" },
];

// ------ INIT ------

function init() {
	renderProducts();
	renderBasket();
}

init();

// ------ RENDERS ------

function renderProducts() {
	for (let c = 0; c < categories.length; c++) {
		const listRef = document.getElementById(categories[c].ref);
		listRef.innerHTML = "";

		for (let i = 0; i < products.length; i++) {
			if (products[i].category === categories[c].name) {
				listRef.innerHTML += getProductTemplate(i);
			}
		}
	}
}

function renderBasket() {
	const basketRef = document.getElementById("basket-items");
	basketRef.innerHTML = "";

	for (let i = 0; i < basket.length; i++) {
		const item = basket[i];
		const product = products[item.index];
		basketRef.innerHTML += getBasketItemTemplate(product, item);
	}
	renderInvoice();
}

function renderInvoice() {
	let subtotal = 0;

	for (let i = 0; i < basket.length; i++) {
		const item = basket[i];
		const product = products[item.index];
		subtotal = subtotal + product.price * item.amount;
	}
	const deliveryFee = 4.99;
	const total = subtotal + deliveryFee;
	document.getElementById("subtotal").textContent =
		getFormattedPrice(subtotal);
	document.getElementById("total").textContent = getFormattedPrice(total);
}

function renderInvoice() {
	let subtotal = 0;

	for (let i = 0; i < basket.length; i++) {
		const item = basket[i];

		const product = products.find(function (p) {
			return p.id === item.id;
		});

		subtotal = subtotal + product.price * item.amount;
	}

	const deliveryFee = 4.99;
	const total = subtotal + deliveryFee;
	document.getElementById("subtotal").textContent =
		getFormattedPrice(subtotal);
	document.getElementById("total").textContent = getFormattedPrice(total);
}

// ------ TEMPLATES ------

function getProductTemplate(i) {
	return /*html*/ `
        <div class="product-card">
            <img src="${products[i].image}" alt="" />
            <div class="product-info">
                <h3>${products[i].name}</h3>
                <p>${products[i].description}</p>
            </div>
            <div class="product-price-basket">
                <data class="price" value="${products[i].price}">${getFormattedPrice(products[i].price)}</data>
                <button class="add-to-basket" onclick="addToBasket(${i})">Add to basket</button>
            </div>
        </div>		
	`;
}

function getBasketItemTemplate(product, item) {
	return /*html*/ `
		<div class="basket-item">
			<div class="basket-item-top">
				<p class="basket-item-name">${product.name}</p>
				<button onclick="removeFromBasket(${item.index})">
					<img src="assets/icons/ic-trash.svg" alt="Entfernen" />
				</button>
			</div>
			<div class="basket-item-bottom">
				<div class="number">
					<button onclick="counterDownAmount(${item.index})">-</button>
					<span>${item.amount}</span>
					<button onclick="counterUpAmount(${item.index})">+</button>
				</div>
				<data class="basket-item-price">${getBasketItemPrice(product, item)}</data>
			</div>
		</div>
	`;
}

// ------ HELPERS ------

function getFormattedPrice(price) {
	const fixedPrice = price.toFixed(2);
	const germanPrice = fixedPrice.replace(".", ",");
	return `${germanPrice} €`;
}

function getBasketItemPrice(product, item) {
	const totalPrice = product.price * item.amount;
	return getFormattedPrice(totalPrice);
}

// ------ ACTIONS ------

function addToBasket(index) {
	const bookedItem = basket.find(function (item) {
		return item.index === index;
	});

	if (bookedItem) {
		bookedItem.amount = bookedItem.amount + 1;
	} else {
		basket.push({ index: index, amount: 1 });
	}

	renderBasket();
}

function removeFromBasket(index) {
	const position = basket.findIndex(function (item) {
		return item.index === index;
	});
	basket.splice(position, 1);
	renderBasket();
}

function counterUpAmount(index) {
	const bookedItem = basket.find(function (item) {
		return item.index === index;
	});
	bookedItem.amount = bookedItem.amount + 1;
	renderBasket();
}

function counterDownAmount(index) {
	const bookedItem = basket.find(function (item) {
		return item.index === index;
	});

	if (bookedItem.amount >= 2) {
		bookedItem.amount = bookedItem.amount - 1;
	}
	renderBasket();
}

// 	if (bookedItem) {
// 		bookedItem.amount = bookedItem.amount + 1;
// 	} else {
// 		basket.push({ id: id, amount: 1 });
// 	}

// const categories = [
// 	{ name: "burger", ref: "tlist-burger" },
// 	{ name: "pizza", ref: "list-pizza" },
// 	{ name: "salad", ref: "list-salad" },
// ];

// // ------ BASKET ------

// let basket = [];

// // ------ INIT ------

// function init() {
// 	renderProducts();
// 	renderBasket();
// }
// init();

// // ------ RENDER ------

// function renderProducts() {
// 	for (let c = 0; c < categories.length; c++) {
// 		const listRef = document.getElementById(categories[c].ref);
// 		listRef.innerHTML = "";

// 		for (let i = 0; i < products.length; i++) {
// 			if (products[i].category === categories[c].name) {
// 				listRef.innerHTML += getProductTemplate(i);
// 			}
// 		}
// 	}
// }

// function renderBasketItems(basketRef) {
// 	for (let i = 0; i < basket.length; i++) {
// 		const item = basket[i];

// 		const product = products.find(function (p) {
// 			return p.id === item.id;
// 		});
// 		basketRef.innerHTML += getBasketItemTemplate(product, item);
// 	}
// }

// function renderBasket() {
// 	const basketRef = document.getElementById("basket-items");
// 	basketRef.innerHTML = "";

// 	if (basket.length === 0) {
// 		basketRef.innerHTML = getEmptyBasketTemplate();
// 	} else {
// 		renderBasketItems(basketRef);
// 	}
// 	renderInvoice();
// 	renderBadge();
// }

// function openBasket() {
// 	document.getElementById("basket").classList.add("show");
// }

// function closeBasket() {
// 	document.getElementById("basket").classList.remove("show");
// }

// function checkout() {
// 	basket = [];
// 	renderBasket();
// 	document.getElementById("confirmation").classList.add("show");
// }

// function closeConfirmation() {
// 	document.getElementById("confirmation").classList.remove("show");
// }

// function openMenu() {
// 	document.getElementById("header-menu").classList.add("show");
// 	document.getElementById("menu-backdrop").classList.add("show");
// }

// function closeMenu() {
// 	document.getElementById("header-menu").classList.remove("show");
// 	document.getElementById("menu-backdrop").classList.remove("show");
// }

// function renderBadge() {
// 	let count = 0;

// 	for (let i = 0; i < basket.length; i++) {
// 		count = count + basket[i].amount;
// 	}
// 	document.getElementById("basket-badge").textContent = count;
// }

// // ------ TEMPLATES ------

// function getEmptyBasketTemplate() {
// 	return /*html*/ `
// 		<div class="basket-empty">
// 			<p>Nothing here yet.
// Go ahead and choose something delicious!</p><img src="assets/icons/ic-basket-empty.svg" alt="" />
// </div>
// 	`;
// }

// function getFormattedPrice(price) {
// 	const fixedPrice = price.toFixed(2);
// 	const germanPrice = fixedPrice.replace(".", ",");
// 	return `${germanPrice} €`;
// }

// function removeFromBasket(id) {
// 	const index = basket.findIndex(function (item) {
// 		return item.id === id;
// 	});
// 	basket.splice(index, 1);
// 	renderBasket();
// }

// function addToBasket(id) {
// 	const bookedItem = basket.find(function (item) {
// 		return item.id === id;
// 	});

// 	if (bookedItem) {
// 		bookedItem.amount = bookedItem.amount + 1;
// 	} else {
// 		basket.push({ id: id, amount: 1 });
// 	}

// 	renderBasket();
// }

// function getBasketItemTemplate(product, item) {
// 	return /*html*/ `
//         <div class="basket-item">
// 			<div class="basket-item-top">
// 				<p class="basket-item-name">${product.name}</p>
// 				<button onclick="removeFromBasket(${product.id})">
// 					<img src="assets/icons/ic-trash.svg" alt="Entfernen" />
// 				</button>
// 			</div>
// 			<div class="basket-item-bottom">
// 				<div class="number">
// 					<button onclick="counterDownAmount(${product.id})">-</button>
// 					<span>${item.amount}</span>
// 					<button onclick="counterUpAmount(${product.id})">+</button>
// 				</div>
// 				<data class="basket-item-price">${getBasketItemPrice(product, item)}</data>
// 			</div>
// 		</div>
//     `;
// }
