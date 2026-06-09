// Global Entry Controller
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links").parentElement;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        menuToggle.textContent = navLinks.classList.contains("show") ? "✕" : "☰";
    });
});