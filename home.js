/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate the home page
 */
import { SKILLS_FILE, EXP_FILE, PROJECTS_FILE, COURSEWORK_FILE, EMAIL_URL, loadJSONFromFile, refreshHash } from "/src/constants.js";
const NUM_SKILLS_TO_SHOW = 9;
const NUM_EXP_TO_SHOW = 4;
const NUM_PROJECTS_TO_SHOW = 4;
const NUM_COURSEWORK_TO_SHOW = 3;

window.onload = function () {
    loadSkills();
    loadExperience();
    loadProjects();
    loadCoursework();
    refreshHash();

    //Attach form submission action to button
    document.getElementById("contact-submit-button").onclick = submitContactForm;
}

var loadSkills = function () {
    let skillsContainer = document.getElementById("skills-container");
    loadJSONFromFile(SKILLS_FILE, (skills) => {
        let index = 0;
        for (let skill of skills) {
            let skillCard = document.createElement("div");
            skillCard.innerHTML = skill.name;
            skillCard.setAttribute("class", "skill");
            skillCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed fade animation
            skillsContainer.appendChild(skillCard);
            index++;

            if (index >= NUM_SKILLS_TO_SHOW) { break; }
        }
    });
}

var loadExperience = function () {
    let expContainer = document.getElementById("experience-container");
    loadJSONFromFile(EXP_FILE, (exps) => {
        let index = 0;
        for (let exp of exps) {
            //Set up card
            let expCard = document.createElement("div");
            expCard.setAttribute("class", "experience-item card");
            expCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed fade animation

            //Title
            let expTitle = document.createElement("div");
            expTitle.setAttribute("class", "exp-attribute exp-title");
            expTitle.innerHTML = exp.title;
            expCard.appendChild(expTitle);

            //Employer
            let expEmployer = document.createElement("div");
            expEmployer.setAttribute("class", "exp-attribute exp-employer");
            expEmployer.innerHTML = exp.employer;
            expCard.appendChild(expEmployer);

            //Time
            let expTime = document.createElement("div");
            expTime.setAttribute("class", "exp-attribute exp-time");
            expTime.innerHTML = exp.time;
            expCard.appendChild(expTime);

            //Redirect on click
            expCard.onclick = () => {
                location.href = "/pages/experience/#" + exp.id;
            };

            expContainer.appendChild(expCard);
            index++;

            if (index >= NUM_EXP_TO_SHOW) { break; }
        }
    });
}

var loadProjects = function () {
    let projContainer = document.getElementById("projects-container");
    loadJSONFromFile(PROJECTS_FILE, (projects) => {
        let index = 0;
        for (let proj of projects) {
            //Set up card
            let projCard = document.createElement("div");
            projCard.setAttribute("class", "project-item card");
            projCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed fade animation

            //Set up content container
            let projContent = document.createElement("div");
            projContent.setAttribute("class", "project-content");

            //Title
            let projTitle = document.createElement("div");
            projTitle.setAttribute("class", "project-title");
            projTitle.innerHTML = proj.title;
            projContent.appendChild(projTitle);

            //Description
            let projDesc = document.createElement("div");
            projDesc.setAttribute("class", "project-description");
            projDesc.innerHTML = proj.description;
            projContent.appendChild(projDesc);

            //Image
            let projImg = document.createElement("img");
            projImg.setAttribute("class", "project-image");
            projImg.setAttribute("src", proj.image);

            projCard.appendChild(projImg);
            projCard.appendChild(projContent);

            //Redirect on click
            projCard.onclick = () => {
                location.href = "/pages/projects/#" + proj.id;
            };

            projContainer.appendChild(projCard);
            index++;

            if (index >= NUM_PROJECTS_TO_SHOW) { break; }
        }
    });
}

var loadCoursework = function () {
    let assignmentContainer = document.getElementById("coursework-container");
    loadJSONFromFile(COURSEWORK_FILE, (coursework) => {
        let index = 0;
        for (let assignment of coursework) {
            //Set up card
            let assignmentCard = document.createElement("div");
            assignmentCard.setAttribute("class", "coursework-item card");
            assignmentCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed fade animation

            //Set up content container
            let assignmentContent = document.createElement("div");
            assignmentContent.setAttribute("class", "coursework-content");

            //Title
            let assignmentTitle = document.createElement("div");
            assignmentTitle.setAttribute("class", "coursework-title");
            assignmentTitle.innerHTML = assignment.title;
            assignmentContent.appendChild(assignmentTitle);

            //Description
            let assignmentDesc = document.createElement("div");
            assignmentDesc.setAttribute("class", "coursework-description");
            assignmentDesc.innerHTML = assignment.description;
            assignmentContent.appendChild(assignmentDesc);

            //Image
            let assignmentImg = document.createElement("img");
            assignmentImg.setAttribute("class", "coursework-image");
            assignmentImg.setAttribute("src", assignment.image);

            assignmentCard.appendChild(assignmentImg);
            assignmentCard.appendChild(assignmentContent);

            //Redirect on click
            assignmentCard.onclick = () => {
                location.href = "/pages/coursework/#" + assignment.id;
            };

            assignmentContainer.appendChild(assignmentCard);
            index++;

            if (index >= NUM_COURSEWORK_TO_SHOW) { break; }
        }
    });
}

async function submitContactForm() {
    let form = document.getElementById("contact-form");
    let name = document.getElementById("contact-name").value;
    let email = document.getElementById("contact-email").value;
    let message = document.getElementById("contact-msg").value;

    let feedbackDisplay = document.getElementById("contact-feedback");

    //Check email validity
    const emailRegexp = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i);
    if (email && !emailRegexp.test(email)) {
        feedbackDisplay.style.color = "#FF3333";
        feedbackDisplay.innerHTML = "Email is not valid.";
        return;
    }

    //Feedback for sending message
    feedbackDisplay.style.color = "#FFFFFF";
    feedbackDisplay.innerHTML = "Sending message...";

    //Build request body
    const body = {
        senderName: name,
        senderEmail: email,
        message: message
    }

    //Send request and get response status & feedback message
    const res = await fetch(
        new Request(EMAIL_URL, {
            method: "POST",
            body: JSON.stringify(body)
        })
    );
    const status = res.status;
    const feedback = await res.blob().then((blob) => blob.text());

    //Show updated feedback
    if (status === 200) {
        feedbackDisplay.style.color = "#00FF70";
        form.reset();
    } else {
        feedbackDisplay.style.color = "#FF3333";
    }
    feedbackDisplay.innerHTML = feedback;
}