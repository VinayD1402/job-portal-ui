"use strict";

const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar a");

const loginButton = document.getElementById("loginButton");
const getStartedButton = document.getElementById("getStartedButton");
const browseJobsButton = document.getElementById("browseJobsButton");

const searchForm = document.getElementById("searchForm");
const jobTitleInput = document.getElementById("jobTitle");
const jobLocationInput = document.getElementById("jobLocation");
const jobCategorySelect = document.getElementById("jobCategory");
const searchMessage = document.getElementById("searchMessage");
const jobCards = document.querySelectorAll(".job-card");

const detailsButtons = document.querySelectorAll(".details-button");
const applyButtons = document.querySelectorAll(".apply-button");

const detailsModal = document.getElementById("detailsModal");
const closeDetailsModalButton = document.getElementById("closeDetailsModal");
const modalJobTitle = document.getElementById("modalJobTitle");
const modalCompany = document.getElementById("modalCompany");
const modalLocation = document.getElementById("modalLocation");
const modalSalary = document.getElementById("modalSalary");
const modalExperience = document.getElementById("modalExperience");
const modalApplyButton = document.getElementById("modalApplyButton");

const applicationModal = document.getElementById("applicationModal");
const closeApplicationModalButton = document.getElementById("closeApplicationModal");
const applicationForm = document.getElementById("applicationForm");
const applicationJobTitle = document.getElementById("applicationJobTitle");

const subscribeForm = document.getElementById("subscribeForm");
const subscribeEmail = document.getElementById("subscribeEmail");
const subscribeMessage = document.getElementById("subscribeMessage");

const currentYear = document.getElementById("currentYear");

let selectedJobTitle = "";

menuButton.addEventListener("click", () => {
    navbar.classList.toggle("show");

    const isOpen = navbar.classList.contains("show");
    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");
        menuButton.textContent = "☰";
    });
});

loginButton.addEventListener("click", () => {
    alert("Login will be available when the backend is added.");
});

getStartedButton.addEventListener("click", () => {
    document.getElementById("search").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        jobTitleInput.focus();
    }, 500);
});

browseJobsButton.addEventListener("click", () => {
    document.getElementById("jobs").scrollIntoView({
        behavior: "smooth"
    });
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchedTitle = jobTitleInput.value.trim().toLowerCase();
    const searchedLocation = jobLocationInput.value.trim().toLowerCase();
    const selectedCategory = jobCategorySelect.value.toLowerCase();

    let matchingJobs = 0;

    jobCards.forEach((jobCard) => {
        const cardTitle = jobCard.dataset.title.toLowerCase();
        const cardLocation = jobCard.dataset.location.toLowerCase();
        const cardCategory = jobCard.dataset.category.toLowerCase();

        const titleMatches =
            searchedTitle === "" || cardTitle.includes(searchedTitle);

        const locationMatches =
            searchedLocation === "" || cardLocation.includes(searchedLocation);

        const categoryMatches =
            selectedCategory === "all" || cardCategory === selectedCategory;

        if (titleMatches && locationMatches && categoryMatches) {
            jobCard.style.display = "flex";
            matchingJobs++;
        } else {
            jobCard.style.display = "none";
        }
    });

    if (matchingJobs === 0) {
        searchMessage.textContent =
            "No matching jobs found. Try another title or location.";
        searchMessage.style.color = "#dc2626";
    } else {
        searchMessage.textContent = `${matchingJobs} matching job(s) found.`;
        searchMessage.style.color = "#15803d";

        document.getElementById("jobs").scrollIntoView({
            behavior: "smooth"
        });
    }
});

function showAllJobsWhenSearchIsEmpty() {
    const titleIsEmpty = jobTitleInput.value.trim() === "";
    const locationIsEmpty = jobLocationInput.value.trim() === "";
    const categoryIsAll = jobCategorySelect.value === "all";

    if (titleIsEmpty && locationIsEmpty && categoryIsAll) {
        jobCards.forEach((jobCard) => {
            jobCard.style.display = "flex";
        });

        searchMessage.textContent = "";
    }
}

jobTitleInput.addEventListener("input", showAllJobsWhenSearchIsEmpty);
jobLocationInput.addEventListener("input", showAllJobsWhenSearchIsEmpty);
jobCategorySelect.addEventListener("change", showAllJobsWhenSearchIsEmpty);

detailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const jobCard = button.closest(".job-card");
        const details = jobCard.querySelectorAll(".job-details p");

        selectedJobTitle = jobCard.querySelector("h3").textContent;

        modalJobTitle.textContent = selectedJobTitle;
        modalCompany.textContent =
            `Company: ${jobCard.querySelector(".company-name").textContent}`;
        modalLocation.textContent = details[0].textContent;
        modalSalary.textContent = details[1].textContent;
        modalExperience.textContent = details[2].textContent;

        openModal(detailsModal);
    });
});

applyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const jobCard = button.closest(".job-card");
        const jobTitle = jobCard.querySelector("h3").textContent;

        openApplicationForm(jobTitle);
    });
});

closeDetailsModalButton.addEventListener("click", () => {
    closeModal(detailsModal);
});

modalApplyButton.addEventListener("click", () => {
    closeModal(detailsModal);
    openApplicationForm(selectedJobTitle);
});

closeApplicationModalButton.addEventListener("click", () => {
    closeModal(applicationModal);
});

function openApplicationForm(jobTitle) {
    selectedJobTitle = jobTitle;
    applicationJobTitle.textContent = jobTitle;
    openModal(applicationModal);
}

applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const applicantName =
        document.getElementById("applicantName").value.trim();

    const applicantEmail =
        document.getElementById("applicantEmail").value.trim();

    const applicantPhone =
        document.getElementById("applicantPhone").value.trim();

    if (
        applicantName === "" ||
        applicantEmail === "" ||
        applicantPhone === ""
    ) {
        alert("Please complete all required fields.");
        return;
    }

    alert(
        `Application submitted successfully for ${selectedJobTitle}!`
    );

    applicationForm.reset();
    closeModal(applicationModal);
});

subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = subscribeEmail.value.trim();

    if (email === "") {
        subscribeMessage.textContent =
            "Please enter your email address.";
        return;
    }

    subscribeMessage.textContent =
        `Job alerts will be sent to ${email}.`;

    subscribeForm.reset();

    setTimeout(() => {
        subscribeMessage.textContent = "";
    }, 5000);
});

function openModal(modal) {
    modal.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeModal(modal) {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
}

window.addEventListener("click", (event) => {
    if (event.target === detailsModal) {
        closeModal(detailsModal);
    }

    if (event.target === applicationModal) {
        closeModal(applicationModal);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal(detailsModal);
        closeModal(applicationModal);
    }
});

currentYear.textContent = new Date().getFullYear();

console.log(`Total jobs available: ${jobCards.length}`);
