// Smooth Scrolling Effect for Navbar Links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

// Form Validation for Contact Form
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.querySelector("input[type='text']").value.trim();
    let email = document.querySelector("input[type='email']").value.trim();
    let message = document.querySelector("textarea").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    alert("Message sent successfully!");
    this.reset();
});

// Dynamic Pet Listings (Add New Pets)
const pets = [
    { name: "Max", breed: "Golden Retriever", price: "$500", img: "dog.jpg" },
    { name: "Whiskers", breed: "Persian Cat", price: "$300", img: "cat.jpg" },
    { name: "Fluffy", breed: "White Rabbit", price: "$100", img: "rabbit.jpg" },
    { name: "Charlie", breed: "Beagle", price: "$450", img: "beagle.jpg" }
];

const petContainer = document.querySelector(".pet-container");

// Dynamically add pets to the listings
pets.forEach(pet => {
    let petCard = document.createElement("div");
    petCard.classList.add("pet-card");

    petCard.innerHTML = `
        <img src="${pet.img}" alt="${pet.name}">
        <h3>${pet.name}</h3>
        <p>${pet.breed} - ${pet.price}</p>
    `;

    petContainer.appendChild(petCard);
});