const courses = [
    { subject: "WDD", number: 130, credits: 2, completed: true },
    { subject: "WDD", number: 131, credits: 2, completed: true },
    { subject: "CSE", number: 110, credits: 2, completed: false },
    { subject: "CSE", number: 111, credits: 2, completed: false },
    { subject: "CSE", number: 230, credits: 2, completed: false }
];

const container = document.querySelector("#courses");
const filterButtons = document.querySelectorAll(".filters button");

function displayCourses(courseList) {
    container.innerHTML = "";

    // Accumulate displayed credit hours dynamically using reduce
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector("#credits").textContent = totalCredits;

    // Generate elements onto the document interface screen
    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });
}

// Manage visual active state styling for filter buttons
function setActiveButton(activeId) {
    filterButtons.forEach(button => {
        if (button.id === activeId) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

// Add filter event click listeners
document.querySelector("#all").addEventListener("click", () => {
    setActiveButton("all");
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {
    setActiveButton("wdd");
    displayCourses(courses.filter(course => course.subject === "WDD"));
});

document.querySelector("#cse").addEventListener("click", () => {
    setActiveButton("cse");
    displayCourses(courses.filter(course => course.subject === "CSE"));
});

// Run initial rendering loop execution
setActiveButton("all");
displayCourses(courses);