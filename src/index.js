/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate aspects of the website
 */
const SKILLS_FILE = "../data/skills.json";

window.onload = function() {
    loadSkills();
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
        console.log(skills)
        for(let skill of skills){
            let skillCard = document.createElement("div");
            skillCard.innerHTML = skill.name;
            skillCard.setAttribute("class", "skill");
            skillsContainer.appendChild(skillCard);
        }
    });
}