import discoverItems from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    handleVisitorAnalytics();
    renderDiscoverCards(discoverItems);
    handleFooterMetrics();
});


function handleVisitorAnalytics() {
    const messageBanner = document.getElementById("visitor-message-banner");
    if (!messageBanner) return;

    const currentTimestamp = Date.now();
    const lastVisitValue = localStorage.getItem("chamber-last-visit");

    if (!lastVisitValue) {
        messageBanner.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTimestamp = parseInt(lastVisitValue, 10);
        const timeDifferenceMs = currentTimestamp - lastVisitTimestamp;
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (timeDifferenceMs < oneDayMs) {
            messageBanner.textContent = "Back so soon! Awesome!";
        } else {
            const totalWholeDays = Math.floor(timeDifferenceMs / oneDayMs);
            if (totalWholeDays === 1) {
                messageBanner.textContent = "You last visited 1 day ago.";
            } else {
                messageBanner.textContent = `You last visited ${totalWholeDays} days ago.`;
            }
        }
    }
    
    localStorage.setItem("chamber-last-visit", currentTimestamp.toString());
}


function renderDiscoverCards(items) {
    const gridContainer = document.getElementById("discover-grid-container");
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    items.forEach(item => {
        const cardElement = document.createElement("article");
        cardElement.className = "discover-card";
        // Assigning style properties to enable named grid area targeting configurations
        cardElement.style.gridArea = item.id;

        cardElement.innerHTML = `
            <h2>${item.name}</h2>
            <figure class="discover-figure">
                <img src="${item.image}" alt="Scenic view profiling ${item.name}" loading="lazy" width="300" height="200" class="discover-img">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn">Learn More</button>
        `;
        gridContainer.appendChild(cardElement);
    });
}


function handleFooterMetrics() {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();

    const lastModPar = document.getElementById("lastModified");
    if (lastModPar) lastModPar.textContent = `Last Modified: ${document.lastModified}`;
}