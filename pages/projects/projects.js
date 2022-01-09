/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate the projerience page
 */
 import { PROJECTS_FILE, loadJSONFromFile } from "/src/constants.js";

 window.onload = function() {
    loadProjects();

    //Refresh the hash (wait for everything to load before scrolling)
    let givenHash = location.hash;
    if(givenHash){
        location.replace("#"); //Remove hash without adding to history
        setTimeout(function() { location.replace(givenHash) }, 100); //Add hash back in to cause autoscroll
    }
}

var loadProjects = function() {
    let projContainer = document.getElementById("projects-container");
    loadJSONFromFile(PROJECTS_FILE, (projects) => {
        let index = 0;
        for(let proj of projects){
            //Set up card
            let projCard = document.createElement("div");
            projCard.setAttribute("class", "project-item");
            projCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed fade animation

            //Anchor
            let projAnchor = document.createElement("a");
            projAnchor.setAttribute("name", proj.id);
            projAnchor.setAttribute("class", "banner-offset-anchor");
            projContainer.appendChild(projAnchor);

            //Image
            let projImage = document.createElement("img");
            projImage.setAttribute("src", proj.image);
            projImage.setAttribute("class", "proj-image");
            projCard.appendChild(projImage);

            //Container for title, link, and description
            let projContent = document.createElement("div");
            projContent.setAttribute("class", "proj-content");

            //Title
            let projTitle = document.createElement("div");
            projTitle.setAttribute("class", "proj-attribute proj-title");
            projTitle.innerHTML = proj.title;
            projContent.appendChild(projTitle);

            //Link
            if(proj.links){
                //Links container
                let linksContainer = document.createElement("div");
                linksContainer.setAttribute("class", "proj-links-container");
                for(let link of proj.links){
                    let projLink = document.createElement("a");
                    projLink.setAttribute("class", "proj-link");
                    projLink.setAttribute("href", link.url);
                    projLink.setAttribute("rel", "noopener noreferrer");
                    projLink.setAttribute("target", "_blank");
                    projLink.innerHTML = link.display;
                    linksContainer.appendChild(projLink);
                }
                projContent.appendChild(linksContainer);
            }

            //Description
            let projDesc = document.createElement("div");
            projDesc.setAttribute("class", "proj-description");
            projDesc.innerHTML = proj.description;
            projContent.appendChild(projDesc);

            //Container for skills pills
            let projSkills = document.createElement("div");
            projSkills.setAttribute("class", "proj-skills-container");

            //Skills pills
            for(let skill of proj.skills){
                let projSkill = document.createElement("button");
                projSkill.setAttribute("class", "button pill");
                projSkill.innerHTML = skill;
                projSkills.appendChild(projSkill);
            }
            projContent.appendChild(projSkills);

            projCard.appendChild(projContent);
            projContainer.appendChild(projCard);
            index++;
        }
    });
}