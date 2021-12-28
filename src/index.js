/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate aspects of the website
 */
const SKILLS_FILE = "../data/skills.json";
const EXP_FILE = "../data/experiences.json";

window.onload = function() {
    loadSkills();
    loadExperience();
}

var loadJSONFromFile = function(jsonFilePath, callback){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    xmlhttp.open("GET", jsonFilePath, true);
    xmlhttp.send();
}

var loadSkills = function() {
    let skillsContainer = document.getElementById("skills-container");
    loadJSONFromFile(SKILLS_FILE, (skills) => {
        let index = 0;
        for(let skill of skills){
            let skillCard = document.createElement("div");
            skillCard.innerHTML = skill.name;
            skillCard.setAttribute("class", "skill");
            skillCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed grid animation
            skillsContainer.appendChild(skillCard);
            console.log(skillCard);
            index++;
        }
    });
}

var loadExperience = function() {
    let expContainer = document.getElementById("experience-container");
    loadJSONFromFile(EXP_FILE, (exps) => {
        let index = 0;
        for(let exp of exps){
            //Set up card
            let expCard = document.createElement("div");
            expCard.setAttribute("class", "experience-item card");
            expCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed grid animation

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

            expContainer.appendChild(expCard);
            console.log(expCard);
            index++;
        }
    });
}