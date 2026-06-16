// ─── ES Module Imports ────────────────────────────────────────────────────────
import { formatPrice, escapeInput } from './main.js';

const DATA_URL = "./data/properties.json";

// ─── 1. Async Fetch with Try/Catch ────────────────────────────────────────────
async function loadPropertyDashboard() {
    const gridContainer = document.getElementById("properties-display-grid");
    const modal = document.getElementById("property-detail-modal");

    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`Network error: ${response.status}`);
        const propertiesData = await response.json();

        renderGridDisplay(propertiesData, gridContainer);
        initializeModalTriggers(propertiesData, gridContainer, modal);
    } catch (error) {
        console.error("Dashboard load failed:", error);
        gridContainer.innerHTML = `<p class="error-msg">Unable to load listings. Please try again later.</p>`;
    }
}

// ─── 2. Dynamic Rendering — Array Method + Template Literals ─────────────────
function renderGridDisplay(items, gridContainer) {
    gridContainer.innerHTML = "";

    items.forEach(item => {
        const displayPrice = formatPrice(item.price);

        const cardMarkup = `
            <div class="property-card" data-id="${escapeInput(item.id)}">
                <img src="${item.image}" alt="${escapeInput(item.title)}" loading="lazy">
                <div class="card-content">
                    <h3>${escapeInput(item.title)}</h3>
                    <p class="loc">📍 ${escapeInput(item.location)}</p>
                    <p class="val"><strong>Price:</strong> ${displayPrice}</p>
                    <p class="specs">🛏️ ${item.beds} Beds | 🚿 ${item.baths} Baths</p>
                    <button class="view-details-cta">View Details</button>
                </div>
            </div>
        `;
        gridContainer.insertAdjacentHTML("beforeend", cardMarkup);
    });
}

// ─── 3. Modal Dialog ──────────────────────────────────────────────────────────
function initializeModalTriggers(dataList, gridContainer, modal) {
    gridContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("view-details-cta")) {
            const card = event.target.closest(".property-card");
            const targetId = card.dataset.id;
            const targetItem = dataList.find(p => p.id === targetId);

            if (targetItem) {
                document.getElementById("modal-title").textContent = targetItem.title;
                document.getElementById("modal-specs").textContent =
                    `📍 ${targetItem.location}  |  ${formatPrice(targetItem.price)}`;
                document.getElementById("modal-desc").textContent = targetItem.description;
                modal.showModal();
            }
        }
    });

    document.getElementById("close-modal-btn").addEventListener("click", () => {
        modal.close();
    });
}

// ─── 4. Local Storage — Dark Mode Persistence ─────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    loadPropertyDashboard();

    const prefButton = document.getElementById("toggle-view-pref");
    if (prefButton) {
        prefButton.addEventListener("click", () => {
            const isDark = document.body.classList.toggle("dark-mode-active");
            localStorage.setItem("baytahome_darkmode_state", isDark ? "enabled" : "disabled");
        });
    }

    if (localStorage.getItem("baytahome_darkmode_state") === "enabled") {
        document.body.classList.add("dark-mode-active");
    }
});