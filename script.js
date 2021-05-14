let container = document.querySelector(".cards");
let basket = document.querySelector(".cart-content_list");
let basketContainer = document.querySelector(".cart");
let countElement = document.querySelector(".cart_quantity");
let count = 0;
let fullprice = 0;
let fullpriceElement = document.querySelector(".fullprice-number");

function removeCard(id, sum) {
	let cards = basket.querySelectorAll('.cart-content_items');

	cards.forEach(function(item) {
		if(item.getAttribute("id") == id) {
			item.remove();
			count--;
			countElement.innerText = count;
		}
	})

	let sumNumber = sum.replace(" p.", "");

	fullprice -= Number(sumNumber);
	fullpriceElement.innerText = fullprice.toFixed(3);

	if(basketContainer.classList.contains("active") && count === 0) {
		basketContainer.classList.remove("active");
	}
}

function createCard(id, image, name, sum) {
	let card = `<li class="cart-content_items" id=${id}>
					<article class="cart-content_product cart_product">
						<img src=${image} alt=${name} class="cart-product_img"/>
						<div class="cart-product_text">
							<h3 class="cart-product_title">${name}</h3>
							<div class="cart-product_delete-price">
								<button class="cart-product_delete" aria-label="Удалить товар"></button>
								<span class="cart-product_price">${sum}</span>
							</div>
						</div>
					</article>
				</li>`;
	let sumNumber = sum.replace(" p.", "");

	fullprice += Number(sumNumber);
	fullpriceElement.innerText = fullprice.toFixed(3);

	basket.insertAdjacentHTML('beforeend', card);
	count++;
	countElement.innerText = count;

	if(!basketContainer.classList.contains("active") && count > 0) {
		basketContainer.classList.add("active");
	}
}

container.addEventListener("click", function(e) {
	if(e.target.classList.contains("button-add-card") && !e.target.classList.contains("remove")) {
		let idCard = e.target.parentElement.getAttribute("id");
		let nameCard = e.target.parentElement.querySelector(".img_4").getAttribute("alt");
		let imageCard = e.target.parentElement.querySelector(".img_4").getAttribute("src");
		let sumCard = e.target.parentElement.querySelector(".title").innerText;
		e.target.classList.add("remove");
		e.target.innerText = "УДАЛИТЬ ИЗ КОРЗИНЫ";
		createCard(idCard,imageCard,nameCard,sumCard);
		return;
	}

	if(e.target.classList.contains("button-add-card") && e.target.classList.contains("remove")) {
		let idCard = e.target.parentElement.getAttribute("id");
		let sumCard = e.target.parentElement.querySelector(".title").innerText;
		e.target.classList.remove("remove");
		e.target.innerText = "ДОБАВИТЬ В КОРЗИНУ";
		removeCard(idCard, sumCard);
		return;
	}
});

basket.addEventListener("click", function(e) {
	if(e.target.classList.contains("cart-product_delete")) {
		let parent = e.target.parentElement.parentElement.parentElement.parentElement;
		let idCard = parent.getAttribute("id");
		let sum = parent.querySelector(".cart-product_price").innerText;
		parent.remove();
		let sumNumber = sum.replace(" p.", "");

		fullprice -= Number(sumNumber);
		fullpriceElement.innerText = fullprice.toFixed(3);

		count--;
		countElement.innerText = count;

		if(basketContainer.classList.contains("active") && count === 0) {
			basketContainer.classList.remove("active");
		}

		let cards = container.querySelectorAll('.catalog');

		cards.forEach(function(item) {
			if(item.getAttribute("id") == idCard) {
				item.querySelector(".button-add-card").classList.remove("remove");
				item.querySelector(".button-add-card").innerText = "ДОБАВИТЬ В КОРЗИНУ";
			}
		})
	}
})