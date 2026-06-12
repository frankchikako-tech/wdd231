// ─── ES Module Import ─────────────────────────────────────────────────────────
import { escapeInput } from './main.js';

document.addEventListener("DOMContentLoaded", () => {
    const urlParameters = new URLSearchParams(window.location.search);
    const targetDisplayBox = document.getElementById("dynamic-form-data");

    const clientName = urlParameters.get("fullName");
    const chosenType = urlParameters.get("propertyType");
    const clientEmail = urlParameters.get("emailAddress");

    if (clientName && chosenType) {
        targetDisplayBox.innerHTML = `
            <p>Thank you, <strong>${escapeInput(clientName)}</strong>!</p>
            <p>Our leasing desk has registered your interest in a <strong>${escapeInput(chosenType)}</strong>.</p>
            <p>A confirmation has been dispatched to <em>${escapeInput(clientEmail)}</em>.</p>
        `;
    } else {
        targetDisplayBox.innerHTML = `<p>No submission data found. Please <a href="contact.html">fill out the form</a>.</p>`;
    }
});