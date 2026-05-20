const url = 'data/members.json';
const cards = document.querySelector('#members');

async function getMembers() {

    const response = await fetch(url);
    const data = await response.json();

    displayMembers(data);
}

const displayMembers = (members) => {

    members.forEach((member) => {

        const card = document.createElement('section');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">

            <h3>${member.name}</h3>

            <p><strong>Address:</strong> ${member.address}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            </p>

            <p><strong>Membership Level:</strong> ${member.membership}</p>

            <p>${member.description}</p>
        `;

        cards.appendChild(card);
    });
};

getMembers();

// Footer Year
const year = document.querySelector('#year');
year.textContent = new Date().getFullYear();

// Last Modified
const lastModified = document.querySelector('#lastModified');
lastModified.textContent = `Last Modified: ${document.lastModified}`;

// Grid and List Buttons
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

gridButton.addEventListener('click', () => {
    cards.classList.add('grid');
    cards.classList.remove('list');
});

listButton.addEventListener('click', () => {
    cards.classList.add('list');
    cards.classList.remove('grid');
});
