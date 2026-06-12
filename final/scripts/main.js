// ─── ES Module Exports ────────────────────────────────────────────────────────


/**

 * @param {string} price - e.g. "₦120,000,000"
 * @returns {string} - e.g. "₦120,000,000"
 */
export function formatPrice(price) {
    return price; 
}

/**
 
 * @param {string} str
 * @returns {string}
 */
export function escapeInput(str) {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── Global Nav Controller ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("show");
            menuToggle.textContent = nav.classList.contains("show") ? "✕" : "☰";
        });
    }
});