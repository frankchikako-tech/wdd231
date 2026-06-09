document.addEventListener("DOMContentLoaded", () => {
    // Parse the current browser window query parameters
    const urlParameters = new URLSearchParams(window.location.search);
    const targetDisplayBox = document.getElementById("dynamic-form-data");

    const clientName = urlParameters.get("fullName");
    const chosenType = urlParameters.get("propertyType");
    const clientEmail = urlParameters.get("emailAddress");

    if (clientName && chosenType) {
        targetDisplayBox.innerHTML = `
            <p>Thank you, <strong>${escapeInput(clientName)}</strong>!</p>
            <p>Our leasing desk has successfully registered your interest in a <strong>${escapeInput(chosenType)}</strong>.</p>
            <p>A confirmation scheduling matrix has been dispatched to <em>${escapeInput(clientEmail)}</em>.</p>
        `;
    } else {
        targetDisplayBox.innerHTML = `<p>Error parsing transaction routing headers.</p>`;
    }
});

function escapeInput(payload) {
    return payload.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}