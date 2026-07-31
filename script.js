// ------ PRODUCTS DATA ------

let products = [
	{
		name: "Veggie mushroom black burger",
		description:
			"Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
		price: 16.9,
		imageMobile: "assets/images/veggie-burger.png",
		imageDesktop: "assets/images/veggie-burger-desktop.png",
		category: "burger",
	},
	{
		name: "All meat burger",
		description:
			"Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ souse",
		price: 15.9,
		imageMobile: "assets/images/meat-burger.png",
		imageDesktop: "assets/images/meat-burger-desktop.png",
		category: "burger",
	},
	{
		name: "Beef red burger",
		description: "Beef, Cheese, Tomatoes, Lettuce, Onion",
		price: 14.9,
		imageMobile: "assets/images/beef-burger.png",
		imageDesktop: "assets/images/beef-burger-desktop.png",
		category: "burger",
	},
	{
		name: "Big chicken burger",
		description: "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
		price: 15.9,
		imageMobile: "assets/images/chicken-burger.png",
		imageDesktop: "assets/images/chicken-burger-desktop.png",
		category: "burger",
	},
	{
		name: "Pizza Margherita",
		description: "Tomato Sauce, Mozzarella",
		price: 11.9,
		imageMobile: "assets/images/margherita-pizza.png",
		imageDesktop: "assets/images/margherita-pizza-desktop.png",
		category: "pizza",
	},
	{
		name: "Pizza Chorizo",
		description: "Tomato slices, Mozzarella, Chorizo",
		price: 13.9,
		imageMobile: "assets/images/chorizo-pizza.png",
		imageDesktop: "assets/images/chorizo-pizza-desktop.png",
		category: "pizza",
	},
	{
		name: "Pizza Funghi",
		description: "Red onion, Olives, Button Mushrooms, Mozzarella",
		price: 12.9,
		imageMobile: "assets/images/funghi-pizza.png",
		imageDesktop: "assets/images/funghi-pizza-desktop.png",
		category: "pizza",
	},
	{
		name: "Quattro Formaggi with Chicken",
		description:
			"Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
		price: 16.9,
		imageMobile: "assets/images/quattro-pizza.png",
		imageDesktop: "assets/images/quattro-pizza-desktop.png",
		category: "pizza",
	},
	{
		name: "Warm beef arugula salad",
		description:
			"Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried Tomatoes, Balsamic-vinegar dressing",
		price: 16.9,
		imageMobile: "assets/images/beef-arugula-salad.png",
		imageDesktop: "assets/images/beef-arugula-salad-desktop.png",
		category: "salad",
	},
	{
		name: "Mini green Salad",
		description: "Green salad, Cucumber, Carrots, Parsley, Radishes",
		price: 7.9,
		imageMobile: "assets/images/mini-green-salad.png",
		imageDesktop: "assets/images/mini-green-salad-desktop.png",
		category: "salad",
	},
	{
		name: "Green Salad with sea food",
		description:
			"Mixed greens, Cherry tomatoes, Red onion, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing with dill",
		price: 16.9,
		imageMobile: "assets/images/green-sea-food-salad.png",
		imageDesktop: "assets/images/green-sea-food-salad-desktop.png",
		category: "salad",
	},
	{
		name: "Vegan green salad with tofu",
		description:
			"Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",
		price: 14.9,
		imageMobile: "assets/images/vegan-green-salad.png",
		imageDesktop: "assets/images/vegan-green-salad-desktop.png",
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
	const invoiceRef = document.getElementById("basket-invoice");
	basketRef.innerHTML = "";

	if (basket.length === 0) {
		basketRef.innerHTML = getEmptyBasketTemplate();
		invoiceRef.classList.add("hidden");
	} else {
		renderBasketItems(basketRef);
		invoiceRef.classList.remove("hidden");
	}
	renderInvoice();
	renderBadge();
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

function renderBasketItems(basketRef) {
	for (let i = 0; i < basket.length; i++) {
		const item = basket[i];
		const product = products[item.index];
		basketRef.innerHTML += getBasketItemTemplate(product, item);
	}
}

function openBasket() {
	closeConfirmation();
	document.getElementById("basket").classList.add("show");
	document.body.classList.add("no-scroll");
}

function closeBasket() {
	document.getElementById("basket").classList.remove("show");
	document.body.classList.remove("no-scroll");
}

function checkout() {
	basket = [];
	renderBasket();
	closeBasket();
	document.getElementById("confirmation").classList.add("show");
}

// ------ TEMPLATES ------

function getProductTemplate(i) {
	return /*html*/ `
        <div class="product-card">
            <img class="card-img-mobile" src="${products[i].imageMobile}" alt="" />
			<img class="card-img-desktop" src="${products[i].imageDesktop}" alt="" />
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
				<button class="remove-btn" onclick="removeFromBasket(${item.index})">
					<img src="assets/icons/ic-trash.svg" alt="Entfernen" />
				</button>
			</div>
			<div class="basket-item-bottom">
				<div class="number">
					<button class="stepper-btn" onclick="counterDownAmount(${item.index})">-</button>
					<span>${item.amount}</span>
					<button class="stepper-btn" onclick="counterUpAmount(${item.index})">+</button>
				</div>
				<data class="basket-item-price">${getBasketItemPrice(product, item)}</data>
			</div>
		</div>
	`;
}

function getEmptyBasketTemplate() {
	return /*html*/ `
		<div class="basket-empty">
			<p>Nothing here yet.<br>Go ahead and choose something delicious!</p>
			<img src="assets/icons/ic-basket-empty.svg" alt="" />
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

function renderBadge() {
	let count = 0;

	for (let i = 0; i < basket.length; i++) {
		count = count + basket[i].amount;
	}
	document.getElementById("basket-badge").textContent = count;
}

function closeConfirmation() {
	document.getElementById("confirmation").classList.remove("show");
}

function openMenu() {
	document.getElementById("header-menu").classList.add("show");
	document.getElementById("menu-backdrop").classList.add("show");
}

function closeMenu() {
	document.getElementById("header-menu").classList.remove("show");
	document.getElementById("menu-backdrop").classList.remove("show");
}
