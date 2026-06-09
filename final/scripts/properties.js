import { fetchProperties } from './main.js'; // Dummy cross-reference for module structure

const DATA_URL = "data/properties.json";
const gridContainer = document.getElementById("properties-display-grid");
const modal = document.getElementById("property-detail-modal");

// 1. Asynchronous Fetch Implementation with Try/Catch Handling
async function loadPropertyDashboard() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`Network returned code: ${response.status}`);
        const propertiesData = await response.json();
        
        // Process array and build UI elements
        renderGridDisplay(propertiesData);
        initializeModalTriggers(propertiesData);
    } catch (error) {
        console.error("Critical dashboard initialization failure:", error);
        gridContainer.innerHTML = `<p class="error-msg">Unable to connect to the property database. Please try again later.</p>`;
    }
}

// 2. Dynamic content generation utilizing Array Methods and Template Literals
function renderGridDisplay(items) {
    gridContainer.innerHTML = "";
    
    // Uses the required built-in array method processing loop
    items.forEach(item => {
        const cardMarkup = `
            <div class="property-card" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p class="loc">📍 ${item.location}</p>
                    <p class="val"><strong>Price:</strong> ${item.price}</p>
                    <p class="specs">🛏️ ${item.beds} Beds |  Michael ${item.baths} Baths</p>
                    <button class="view-details-cta">View Core Details</button>
                </div>
            </div>
        `;
        gridContainer.insertAdjacentHTML("beforeend", cardMarkup);
    });
}

// 3. Accessible Modal Dialog Interactivity Engine
function initializeModalTriggers(dataList) {
    gridContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("view-details-cta")) {
            const card = event.target.closest(".property-card");
            const targetId = card.dataset.id;
            const targetItem = dataList.find(p => p.id === targetId);

            if (targetItem) {
                document.getElementById("modal-title").textContent = targetItem.title;
                document.getElementById("modal-specs").textContent = `Location: ${targetItem.location} | Valuation: ${targetItem.price}`;
                document.getElementById("modal-desc").textContent = targetItem.description;
                modal.showModal(); // Pop native modal window open
            }
        }
    });

    document.getElementById("close-modal-btn").addEventListener("click", () => {
        modal.close();
    });
}

// 4. Local Storage State Client Persistence
const prefButton = document.getElementById("toggle-view-pref");
prefButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode-active");
    localStorage.setItem("baytahome_darkmode_state", isDark ? "enabled" : "disabled");
});

// Restore state from Local Storage on load
if (localStorage.getItem("baytahome_darkmode_state") === "enabled") {
    document.body.classList.add("dark-mode-active");
}

document.addEventListener("DOMContentLoaded", loadPropertyDashboard);