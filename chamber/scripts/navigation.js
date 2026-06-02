document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
            
            // Switch button look context for elegant user feel feedback tracking
            if (navMenu.classList.contains("show")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }
        });
    }

    // Dynamic standard footer updater blocks logic automation 
    const yearSpan = document.getElementById("year");
    const lastModField = document.getElementById("lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModField) lastModField.textContent = `Last Modified: ${document.lastModified}`;
});