/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate the experience page
 */
 import { EXP_FILE, loadJSONFromFile, refreshHash } from "/src/constants.js";

 window.onload = function() {
    loadExperience();
    refreshHash();
}


var loadExperience = function() {
    let expContainer = document.getElementById("experience-container");
    loadJSONFromFile(EXP_FILE, (exps) => {
        let index = 0;
        for(let exp of exps){
            //Set up card
            let expCard = document.createElement("div");
            expCard.setAttribute("class", "experience-item light");
            
            expCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed fade animation

            //Anchor
            let expAnchor = document.createElement("a");
            expAnchor.setAttribute("name", exp.id);
            expAnchor.setAttribute("class", "banner-offset-anchor");
            expCard.appendChild(expAnchor);

            //Container for time and img
            let expSidebar = document.createElement("div");
            expSidebar.setAttribute("class", "exp-sidebar");

            //Time
            let expTime = document.createElement("div");
            expTime.setAttribute("class", "exp-attribute exp-time");
            expTime.innerHTML = exp.time;
            expSidebar.appendChild(expTime);

            //Image
            if(exp.image){
                let expImg = document.createElement("img");
                expImg.setAttribute("class", "exp-image");
                expImg.setAttribute("src", exp.image);
                expSidebar.appendChild(expImg);
            }


            //Container for other elements
            let expContent = document.createElement("div");
            expContent.setAttribute("class", "exp-content");

            expCard.appendChild(expSidebar);

            //Vertical divider
            let vDivider = document.createElement("div");
            vDivider.setAttribute("class", "vertical-divider exp-content-divider");
            expCard.appendChild(vDivider);

            //Title
            let expTitle = document.createElement("div");
            expTitle.setAttribute("class", "exp-attribute exp-title");
            expTitle.innerHTML = exp.title;
            expContent.appendChild(expTitle);

            //Employer
            let expEmployer = document.createElement("div");
            expEmployer.setAttribute("class", "exp-attribute exp-employer");
            expEmployer.innerHTML = exp.employer;
            expContent.appendChild(expEmployer);

            //Location
            if(exp.location){
                let expLocation = document.createElement("div");
                expLocation.setAttribute("class", "exp-attribute exp-location");
                expLocation.innerHTML = exp.location;
                expContent.appendChild(expLocation);
            }

            //Links
            if(exp.links){
                //Links container
                let linksContainer = document.createElement("div");
                linksContainer.setAttribute("class", "exp-links-container");
                for(let link of exp.links){
                    let expLink = document.createElement("a");
                    expLink.setAttribute("class", "exp-link exp-attribute");
                    expLink.setAttribute("href", link.url);
                    expLink.setAttribute("rel", "noopener noreferrer");
                    expLink.setAttribute("target", "_blank");
                    expLink.innerHTML = link.display;
                    linksContainer.appendChild(expLink);
                }
                expContent.appendChild(linksContainer);
            }

            //Description
            let expDescription = document.createElement("div");
            expDescription.setAttribute("class", "exp-attribute exp-description");
            expDescription.innerHTML = exp.description;
            expContent.appendChild(expDescription);

            //Container for skills pills
            let expSkills = document.createElement("div");
            expSkills.setAttribute("class", "exp-skills-container");

            //Skills pills
            for(let skill of exp.skills){
                let expSkill = document.createElement("button");
                expSkill.setAttribute("class", "button pill");
                expSkill.innerHTML = skill;
                expSkills.appendChild(expSkill);
                expSkill.onclick = () => {
                    //Redirect on click
                    location.href = "/pages/skills/#" + skill.replace(/\s+/g, '-').toLowerCase();
                }
            }
            expContent.appendChild(expSkills);

            expCard.appendChild(expContent);
            expContainer.appendChild(expCard);
            index++;
        }
    });
}