// The full, official list of 6 web certificate courses
const courses = [
    { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
    { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
    { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: true },
    { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
    { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { subject: "WDD", number: 231, title: "Web Frontend Development", credits: 2, completed: false }
];

const container = document.querySelector("#courses");
const filterButtons = document.querySelectorAll(".filters button");

// Function to calculate credits dynamically and render cards
function displayCourses(courseList) {
    container.innerHTML = "";

    // Dynamically calculate total credits using reduce based on current filter selection
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector("#credits").textContent = totalCredits;

    // Generate and inject the course markup blocks
    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        // Apply completion color styles conditionally
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });
}

// Manages the visual background color highlighting of the filter buttons
function updateActiveFilterButton(selectedId) {
    filterButtons.forEach(button => {
        if (button.id === selectedId) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

// Wire up the button interaction click listeners
document.querySelector("#all").addEventListener("click", () => {
    updateActiveFilterButton("all");
    displayCourses(courses);
});

document.querySelector("#cse").addEventListener("click", () => {
    updateActiveFilterButton("cse");
    displayCourses(courses.filter(course => course.subject === "CSE"));
});

document.querySelector("#wdd").addEventListener("click", () => {
    updateActiveFilterButton("wdd");
    displayCourses(courses.filter(course => course.subject === "WDD"));
});

// Run initial configurations on page load
updateActiveFilterButton("all");
displayCourses(courses);