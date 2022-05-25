/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate the home page
 */
import { SKILLS_FILE, EXP_FILE, PROJECTS_FILE, loadJSONFromFile, refreshHash } from "/src/constants.js";
const NUM_SKILLS_TO_SHOW = 9;
const NUM_EXP_TO_SHOW = 4;
const NUM_PROJECTS_TO_SHOW = 4;

window.onload = function () {
    loadSkills();
    loadExperience();
    loadProjects();
    refreshHash();
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