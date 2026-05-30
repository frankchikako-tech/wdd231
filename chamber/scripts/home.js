// ====== CONFIGURATION MODULES ======
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with active API key string
const lat = '6.4541';
const lon = '3.3947';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const membersUrl = 'data/members.json';

// ====== INITIALIZER RUNTIME ======
document.addEventListener("DOMContentLoaded", () => {
    initHomePage();
    setupFooterData();
});

async function initHomePage() {
    // Run asynchronous fetches in parallel
    await Promise.all([
        getWeatherData(),
        getPremiumSpotlights()
    ]);
}

// ====== MODULE 1: WEATHER LOGIC ENGINE (Criterion 10) ======
async function getWeatherData() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error("Weather API failed to communicate.");
        const data = await response.json();

        processCurrentWeather(data);
        processForecast(data);
    } catch (error) {
        console.error("Weather Pipeline Exception:", error);
        document.getElementById('weather-desc').textContent = "Weather unavailable.";
    }
}

function processCurrentWeather(data) {
    const current = data.list[0];
    const tempSpan = document.getElementById('current-temp');
    const descPara = document.getElementById('weather-desc');
    const iconImg = document.getElementById('weather-icon');

    tempSpan.innerHTML = `${Math.round(current.main.temp)}&deg;C`;
    descPara.textContent = current.weather[0].description;

    // Setup structured attributes to guarantee passing Accessibility tests
    const iconCode = current.weather[0].icon;
    iconImg.setAttribute('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
    iconImg.setAttribute('alt', `Current conditions: ${current.weather[0].description}`);
}

function processForecast(data) {
    const container = document.getElementById('weather-forecast');
    container.innerHTML = ''; // Expunge static fallback placeholders

    // Filter index list intervals to isolate a snapshot every ~24 hours (8 steps array intervals)
    const filteredForecast = data.list.filter((_, idx) => idx % 8 === 0).slice(1, 4);

    filteredForecast.forEach(interval => {
        const timestamp = new Date(interval.dt * 1000);
        const weekday = timestamp.toLocaleDateString('en-US', { weekday: 'short' });
        const targetTemp = Math.round(interval.main.temp);

        const cardElement = document.createElement('div');
        cardElement.classList.add('forecast-day');
        cardElement.innerHTML = `
            <p><strong>${weekday}</strong></p>
            <img src="https://openweathermap.org/img/wn/${interval.weather[0].icon}.png" alt="${interval.weather[0].description}">
            <p>${targetTemp}&deg;C</p>
        `;
        container.appendChild(cardElement);
    });
}

// ====== MODULE 2: ADVERTISEMENT SPOTLIGHT LOGIC (Criterion 11) ======
async function getPremiumSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Members data target unreachable.");
        const members = await response.json();

        // Strict Filter Array Layer: Verify string value is 'Gold' or 'Silver'
        const premiumTier = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');

        // Linear shuffling strategy
        const randomized = premiumTier.sort(() => 0.5 - Math.random());

        // Isolate exactly 3 items
        const selections = randomized.slice(0, 3);

        renderSpotlightCards(selections);
    } catch (error) {
        console.error("Spotlight Parsing Exception:", error);
        document.getElementById('spotlight-container').innerHTML = "<p>Premium highlights temporarily unavailable.</p>";
    }
}

function renderSpotlightCards(premiumGroup) {
    const targetElement = document.getElementById('spotlight-container');
    targetElement.innerHTML = ''; // Clean placeholder blocks

    premiumGroup.forEach(company => {
        const article = document.createElement('section');
        article.classList.add('spotlight-card');

        article.innerHTML = `
            <h3>${company.name}</h3>
            <span class="membership-badge">${company.membership} Partner</span>
            <div class="spotlight-body">
                <img src="images/${company.image}" alt="${company.name} Business Logo" loading="lazy">
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Address:</strong> ${company.address}</p>
                <p><a href="${company.website}" target="_blank" rel="noopener">Visit Web Desk</a></p>
            </div>
        `;
        targetElement.appendChild(article);
    });
}

// ====== EXTENSION METADATA LAYER ======
function setupFooterData() {
    document.querySelector('#year').textContent = new Date().getFullYear();
    document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;
}