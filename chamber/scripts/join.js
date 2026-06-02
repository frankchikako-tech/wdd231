document.addEventListener("DOMContentLoaded", () => {
    // Inject precision ISO String into hidden parameter value upon page processing load
    const timestampField = document.getElementById("form-timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal Control Pipeline Interface Selector logic Mapping
    const openButtons = document.querySelectorAll(".modal-trigger-btn");
    const closeButtons = document.querySelectorAll(".modal-close-btn");

    openButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalTargetId = btn.getAttribute("data-target");
            const targetModal = document.getElementById(modalTargetId);
            if (targetModal) {
                targetModal.showModal(); // Using native API: Automates keyboard focus trapping bounds (Accessibility compliant)
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const activeModal = e.target.closest("dialog");
            if (activeModal) {
                activeModal.close();
            }
        });
    });
});