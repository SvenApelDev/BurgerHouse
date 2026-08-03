
let basket = [];

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
					<span id="amount-${item.index}">${item.amount}</span>
					<button class="stepper-btn" onclick="counterUpAmount(${item.index})">+</button>
				</div>
				<data class="basket-item-price" id="price-${item.index}">${getBasketItemPrice(product, item)}</data>
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

function updateBasketItem(index) {
	const item = basket.find(function (i) {
		return i.index === index;
	});
	const product = products[item.index];

	document.getElementById("amount-" + index).textContent = item.amount;
	document.getElementById("price-" + index).textContent = getBasketItemPrice(product, item);

	renderInvoice();
	renderBadge();
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
	updateBasketItem(index);
}

function counterDownAmount(index) {
	const bookedItem = basket.find(function (item) {
		return item.index === index;
	});

	if (bookedItem.amount >= 2) {
		bookedItem.amount = bookedItem.amount - 1;
		updateBasketItem(index);
	}
}

function renderBadge() {
	let count = 0;

	for (let i = 0; i < basket.length; i++) {
		count = count + basket[i].amount;
	}
	document.getElementById("basket-badge").textContent = count;

	const basketIcon = document.getElementById("basket-icon");
	if (basket.length > 0) {
		basketIcon.src = "assets/icons/ic-basket-active.svg";
	} else {
		basketIcon.src = "assets/icons/ic-basket.svg";
	}
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
