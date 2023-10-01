// // Create a button for the added item


// addToCartButton.classList.add('btn', 'btn-primary');
// addToCartButton.textContent = 'Add to Cart';
// console.log(addToCartButton);


const cardContainer = document.getElementById("cardContainer");
// const cartModal = document.getElementById("cartModal");
const electronics = document.getElementById("electronics");
const jewelery = document.getElementById("jewelery");
const mensClothing = document.getElementById("mensClothing");
const womensClothing = document.getElementById("womensClothing");
const display = document.getElementById("display");
// const cartModalBody = document.getElementById("cartModalBody");
const addToCartButton = document.createElement('button');
let data = [];
let cart = [];


const apiUrl = "https://fakestoreapi.com/products/category";


async function fakeStore(endpoint) {
    const fullUrl = `${apiUrl}/${endpoint}`;


    try {
        const response = await fetch(fullUrl);


        if (!response.ok) {
            throw new Error(`Failed to fetch data from API: ${response.status}`);
        }


        const data = await response.json();
        console.log(data);


        displayCards(data);
    } catch (error) {
        console.error(error);
    }


}


function displayCards(data) {
    // Clear the existing card container
    cardContainer.innerHTML = '';


    data.forEach((item) => {
        // Create a new card for each item
        const cardTemplate = document.createElement('div');
        cardTemplate.classList.add('col', 'mb-4');


        const card = document.createElement('div');
        card.classList.add('card', 'h-100');


        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = item.image;
        img.alt = item.title;
        img.width = 200;
        img.height = 350;


        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');


        const title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = item.title;
        title.height = 50;


        const accordionButton = document.createElement('button');
        accordionButton.classList.add('accordion-button');
        accordionButton.setAttribute('type', 'button');
        accordionButton.setAttribute('data-bs-toggle', 'collapse');
        accordionButton.setAttribute('data-bs-target', `#cardCollapse${item.id}`);
        accordionButton.innerHTML = 'Description <i class="bi bi-chevron-down"></i>';


        const cardCollapse = document.createElement('div');
        cardCollapse.classList.add('collapse');
        cardCollapse.id = `cardCollapse${item.id}`;


        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = item.description;


        const price = document.createElement('p');
        price.classList.add('card-text', 'card-price');
        price.textContent = `$${item.price}`;


        const addToCartBtn = document.createElement('a');
        addToCartBtn.href = '#'; // Set the actual link here if needed
        addToCartBtn.classList.add('btn', 'btn-primary');
        addToCartBtn.textContent = 'Add to Cart';


        // Append elements to the card
        cardBody.appendChild(title);
        cardBody.appendChild(accordionButton);
        cardCollapse.appendChild(description);
        cardBody.appendChild(cardCollapse);
        cardBody.appendChild(price);
        cardBody.appendChild(addToCartBtn);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardTemplate.appendChild(card);


        // Append the card to the card container
        cardContainer.appendChild(cardTemplate);




    });
}
function submitToCart(item) {
    // Use the parameter to add to the cart array
    const existingItem = cart.find(function (element) {
        return element.id === item.id;
    });
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
        updateCartModal();
    }


    // Create a button for the added item


    addToCartButton.classList.add('btn', 'btn-primary');
    addToCartButton.textContent = 'Add to Cart';
    console.log(addToCartButton);


    // Append the button to the cart modal body
    // const cartModalBody = document.getElementById('modal-body');
    // cartModalBody.appendChild(addToCartButton);
}




function updateCartModal() {
    // cartModalBody.innerHTML = '';


    cart.forEach((item) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("mb-2");


        const cartItemTitle = document.createElement("h6");
        cartItemTitle.textContent = item.title;


        const cartItemQuantity = document.createElement("span");
        cartItemQuantity.textContent = `Quantity: ${item.quantity}`;


        const cartItemCost = document.createElement("span");
        cartItemCost.textContent = `Price: $${(item.cost * item.quantity).toFixed(2)}`;


        cartItemDiv.appendChild(cartItemTitle);
        cartItemDiv.appendChild(cartItemQuantity);
        cartItemDiv.appendChild(cartItemCost);


        // cartModalBody.appendChild(cartItemDiv);
    });
}












// Event listeners for category buttons (electronics, jewelery, etc.)
document.getElementById("electronics").addEventListener("click", () => {
    fakeStore("electronics");
});


document.getElementById("jewelery").addEventListener("click", () => {
    fakeStore("jewelery");
});


document.getElementById("mensClothing").addEventListener("click", () => {
    fakeStore("men's clothing");
});


document.getElementById("womensClothing").addEventListener("click", () => {
    fakeStore("women's clothing");
});
// Add a click event listener to the button
addToCartButton.addEventListener('click', () => {
    submitToCart(item); // Pass the 'item' parameter
});



