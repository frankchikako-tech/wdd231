// ─── ES Module Exports ────────────────────────────────────────────────────────

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} str
 * @returns {string}
 */
export function escapeInput(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Formats a price string into Nigerian Naira display format
 * @param {string|number} price - e.g. "₦120,000,000" or 120000000
 * @returns {string} - e.g. "₦120,000,000"
 */
export function formatPrice(price) {
    if (!price) return "₦0";
    if (typeof price === "string" && price.includes("₦")) return price;

    const num = typeof price === "string"
        ? parseFloat(price.replace(/[^0-9.-]+/g, ""))
        : price;
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
    }).format(num);
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