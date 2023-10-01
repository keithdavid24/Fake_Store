// JavaScript
// document.addEventListener("DOMContentLoaded", () => {
const electronics = document.getElementById("electronics");
const jewelery = document.getElementById("jewelery");
const mensClothing = document.getElementById("mensClothing");
const womensClothing = document.getElementById("womensClothing");
const display = document.getElementById("display");

let data = [];


const apiUrl = "https://fakestoreapi.com/products/category";
console.log(apiUrl);


// fakeStore("electronics");

async function fakeStore(endpoint) {

    const fullUrl = `${apiUrl}/${endpoint}`;
    // console.log(fullUrl);
    const response = await fetch(fullUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch data from API: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    displayCards(data);
}
// fakeStore("electronics");
// })

// }

// fakeStore("electronics");

// function displayData(data) {

//     display.innerHTML = "";

//     data.forEach((item) => {
//         const card = document.createElement("div");
//         card.classList.add("card");

//         display.appendChild(card);
//     })
// }
// window.onload = () => {

//     fakeStore("products?sortBy=asc");
// }

electronics.addEventListener("click", () => {
    fakeStore("electronics");
});
jewelery.addEventListener("click", () => {
    fakeStore("jewelery");
});
mensClothing.addEventListener("click", () => {
    fakeStore("mensClothing");
});
womensClothing.addEventListener("click", () => {
    fakeStore("womensClothing");
});

function displayCards(data) {
    const display = document.getElementById("display");
    display.innerHTML = ""; // Clear previous content


    data.forEach((item) => {
        // Step 1: Create a card container
        const card = document.createElement("div");
        card.classList.add("card");


        // Step 2: Create card content (title, description, image)
        const title = document.createElement("h2");
        title.textContent = item.title;


        const description = document.createElement("p");
        description.textContent = item.description;


        //         const image = document.createElement("img");
        //         image.src = item.imageUrl;


        //         // Step 3: Create accordion container
        //         const accordion = document.createElement("div");
        //         accordion.classList.add("accordion");


        //         // Step 4: Create accordion button
        //         const accordionButton = document.createElement("button");
        //         accordionButton.textContent = "Toggle Accordion";
        //         accordionButton.classList.add("accordion-button");


        //         // Step 5: Create accordion content
        //         const accordionContent = document.createElement("div");
        //         accordionContent.classList.add("accordion-content");
        //         accordionContent.textContent = "Accordion content goes here.";


        //         // Step 6: Append elements to their respective parents
        //         accordion.appendChild(accordionButton);
        //         accordion.appendChild(accordionContent);


        card.appendChild(title);
        card.appendChild(description);
        // card.appendChild(image);
        // card.appendChild(accordion);


        //         // Step 7: Append the card to the display div
        display.appendChild(card);
    });
}

