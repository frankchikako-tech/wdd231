const courses = [
    {
        subject: "WDD",
        number: 130,
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 110,
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 111,
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 230,
        credits: 2,
        completed: false
    }
];

const container = document.querySelector("#courses");

function displayCourses(courseList) {

    container.innerHTML = "";

    const totalCredits = courseList.reduce(
        (sum, course) => sum + course.credits,
        0
    );

    document.querySelector("#credits").textContent =
        totalCredits;

    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML =
            `${course.subject} ${course.number}`;

        container.appendChild(card);
    });
}

displayCourses(courses);

document.querySelector("#all")
    .addEventListener("click", () => {
        displayCourses(courses);
    });

document.querySelector("#wdd")
    .addEventListener("click", () => {

        const filtered =
            courses.filter(course =>
                course.subject === "WDD"
            );

        displayCourses(filtered);
    });

document.querySelector("#cse")
    .addEventListener("click", () => {

        const filtered =
            courses.filter(course =>
                course.subject === "CSE"
            );

        displayCourses(filtered);
    });