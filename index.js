
const cardContainer = document.getElementById("cardContainer");
const cartModal = document.getElementById("cartModal")
const electronics = document.getElementById("electronics");
const jewelery = document.getElementById("jewelery");
const mensClothing = document.getElementById("mensClothing");
const womensClothing = document.getElementById("womensClothing");
const displayCartButton = document.getElementById("displayCartButton")
const cartTotalsTable = document.getElementById('cartTotals');

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
        addToCartBtn.href = '#';
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

        addToCartBtn.addEventListener('click', () => {
            const product = {
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: 1
            }

            // console.log(item);
            submitToCart(product);
        })


    });
}
function submitToCart(item) {


    cart.push(item);
    console.log('cart', cart);
    updateCartTable();
}

function updateCartTable() {
    const cartTableBody = document.getElementById('cartTableBody');
    cartTableBody.innerHTML = '';      // Clear the existing content

    cart.forEach(item => {
        const row = cartTableBody.insertRow();

        // Create cells for each item's information
        const productCell = row.insertCell(0);
        productCell.textContent = item.title;

        const priceCell = row.insertCell(1);
        priceCell.textContent = `$${item.price.toFixed(2)}`;

        const quantityCell = row.insertCell(2);
        quantityCell.textContent = item.quantity;

        const subtotalCell = row.insertCell(3);
        subtotalCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    });
}
// The User can clear the cart by clicking the "Clear Cart" button and still add items later
function clearCart() {
    cart = [];

    const cartTableBody = document.getElementById("cartTableBody")
    if (cartTableBody) {
        cartTableBody.innerHTML = '';
    }
    updateCartTotals();


}

function displayCart() {
    // Clear the existing cart modal
    cartModal.innerHTML = '';

    // Create a table to display the cart items
    const table = document.createElement('table');
    table.classList.add('table');

    // Create the table header
    const theader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headerTitle = document.createElement('th');
    headerTitle.textContent = 'Product';
    const headerPrice = document.createElement('th');
    headerPrice.textContent = 'Price';
    const headerQuantity = document.createElement('th');
    headerQuantity.textContent = 'Quantity';
    headerRow.appendChild(headerTitle);
    headerRow.appendChild(headerPrice);
    headerRow.appendChild(headerQuantity);
    theader.appendChild(headerRow);

    // Create the table body
    const tbody = document.createElement('tbody');

    // Iterate through the cart and create rows for each item
    cart.forEach((item) => {
        const tr = document.createElement('tr');
        const productName = document.createElement('td');
        productName.textContent = item.title;
        const productPrice = document.createElement('td');
        productPrice.textContent = `$${item.price}`;
        const productQuantity = document.createElement('td');
        productQuantity.textContent = item.quantity;

        // Append the cells to the row
        tr.appendChild(productName);
        tr.appendChild(productPrice);
        tr.appendChild(productQuantity);

        // Append the row to the table body
        tbody.appendChild(tr);
    });

    // Append the header and body to the table
    table.appendChild(theader);
    table.appendChild(tbody);

    // Append the table to the cart modal
    cartModal.appendChild(table);

}
updateCartTotals();

// Function to update cart totals
function updateCartTotals() {
    // Initialize variables for totals
    let subtotal = 0;
    let tax = 0;
    let shipping = 5; // Example: Fixed shipping cost
    let total = 0;

    // Loop through the items in the cart
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    // Calculate tax (10% of subtotal)
    tax = 0.1 * subtotal;

    // Calculate total
    total = subtotal + tax + shipping;

    // Update the HTML elements
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}
function purchase() {

    alert("Thank you for your Purchase!");

    cart = [];

    displayCart();
    updateCartTotals()

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
document.getElementById('displayCartButton').addEventListener('click', () => {
    // displayCart();
    updateCartTotals();
    // console.log('displayCart',displayCart);
})

window.onload = () => {
    fakeStore("electronics");
}
