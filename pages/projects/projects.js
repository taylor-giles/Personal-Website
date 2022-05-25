/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate the projerience page
 */
import { PROJECTS_FILE, loadJSONFromFile, refreshHash } from "/src/constants.js";

window.onload = function () {
    loadProjects();
    refreshHash();
}

var loadProjects = function () {
    let projContainer = document.getElementById("projects-container");
    loadJSONFromFile(PROJECTS_FILE, (projects) => {
        let index = 0;
        for (let proj of projects) {
            //Set up card
            let projCard = document.createElement("div");
            projCard.setAttribute("class", "project-item");
            projCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed fade animation

            //Anchor
            let projAnchor = document.createElement("a");
            projAnchor.setAttribute("name", proj.id);
            projAnchor.setAttribute("class", "banner-offset-anchor");
            projContainer.appendChild(projAnchor);

            //Container for image, course, and time
            let metadataPanel = document.createElement("div");
            metadataPanel.setAttribute("class", "proj-metadata");

            //Image
            if (proj.image) {
                let projImage = document.createElement("img");
                projImage.setAttribute("src", proj.image);
                projImage.setAttribute("class", "proj-image");
                metadataPanel.appendChild(projImage);
            }

            //Time
            if (proj.time) {

            }

            //Container for title, link, course, time, and description
            let projContent = document.createElement("div");
            projContent.setAttribute("class", "proj-content");

            //Title
            let projTitle = document.createElement("div");
            projTitle.setAttribute("class", "proj-attribute proj-title");
            projTitle.innerHTML = proj.title;

            //GitHub (attached to title)
            if (proj.github) {
                let githubAnchor = document.createElement("a");
                let githubIcon = document.createElement("img");
                githubIcon.setAttribute("src", "/images/icons/github.svg")
                githubIcon.setAttribute("class", "github-icon");
                githubAnchor.appendChild(githubIcon)
                githubAnchor.setAttribute("href", proj.github);
                githubAnchor.setAttribute("rel", "noopener noreferrer");
                githubAnchor.setAttribute("target", "_blank");
                projTitle.appendChild(githubAnchor)
            }

            projContent.appendChild(projTitle);

            //Links
            if (proj.links) {
                //Links container
                let linksContainer = document.createElement("div");
                linksContainer.setAttribute("class", "proj-links-container");
                for (let link of proj.links) {
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

            //Course
            if (proj.course) {
                let projCourse = document.createElement("div");
                projCourse.setAttribute("class", "proj-attribute proj-course");
                projCourse.innerHTML = proj.course;
                projContent.appendChild(projCourse);
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
            for (let skill of proj.skills) {
                let projSkill = document.createElement("button");
                projSkill.setAttribute("class", "button pill");
                projSkill.innerHTML = skill;
                projSkill.onclick = () => {
                    //Redirect on click
                    location.href = "/pages/skills/#" + skill.replace(/\s+/g, '-').toLowerCase();
                }
                projSkills.appendChild(projSkill);
            }
            projContent.appendChild(projSkills);

            projCard.appendChild(metadataPanel);
            projCard.appendChild(projContent);
            projContainer.appendChild(projCard);
            index++;
        }
    });
}