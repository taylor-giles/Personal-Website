/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate the coursework page
 */
import { COURSEWORK_FILE, loadJSONFromFile, refreshHash } from "/src/constants.js";

window.onload = function () {
    loadAssignments();
    refreshHash();
}

var loadAssignments = function () {
    let assignmentContainer = document.getElementById("coursework-container");
    loadJSONFromFile(COURSEWORK_FILE, (assignments) => {
        let index = 0;
        for (let assignment of assignments) {
            //Set up card
            let assignmentCard = document.createElement("div");
            assignmentCard.setAttribute("class", "coursework-item");
            assignmentCard.style["animation-delay"] = (0.15 * index) + "s"; //Delayed fade animation

            //Anchor
            let assignmentAnchor = document.createElement("a");
            assignmentAnchor.setAttribute("name", assignment.id);
            assignmentAnchor.setAttribute("class", "banner-offset-anchor");
            assignmentContainer.appendChild(assignmentAnchor);

            //Container for image, course, and time
            let metadataPanel = document.createElement("div");
            metadataPanel.setAttribute("class", "assignment-metadata");

            //Image
            if (assignment.image) {
                let assignmentImage = document.createElement("img");
                assignmentImage.setAttribute("src", assignment.image);
                assignmentImage.setAttribute("class", "assignment-image");
                metadataPanel.appendChild(assignmentImage);
            }

            //Container for title, link, course, time, and description
            let assignmentContent = document.createElement("div");
            assignmentContent.setAttribute("class", "assignment-content");

            //Title
            let assignmentTitle = document.createElement("div");
            assignmentTitle.setAttribute("class", "assignment-attribute assignment-title");
            assignmentTitle.innerHTML = assignment.title;

            //GitHub (attached to title)
            if (assignment.github) {
                let githubAnchor = document.createElement("a");
                let githubIcon = document.createElement("img");
                githubIcon.setAttribute("src", "/images/icons/github.svg")
                githubIcon.setAttribute("class", "github-icon");
                githubAnchor.appendChild(githubIcon)
                githubAnchor.setAttribute("href", assignment.github);
                githubAnchor.setAttribute("rel", "noopener noreferrer");
                githubAnchor.setAttribute("target", "_blank");
                assignmentTitle.appendChild(githubAnchor)
            }

            assignmentContent.appendChild(assignmentTitle);

            //Links
            if (assignment.links) {
                //Links container
                let linksContainer = document.createElement("div");
                linksContainer.setAttribute("class", "assignment-links-container");
                for (let link of assignment.links) {
                    let assignmentLink = document.createElement("a");
                    assignmentLink.setAttribute("class", "assignment-link");
                    assignmentLink.setAttribute("href", link.url);
                    assignmentLink.setAttribute("rel", "noopener noreferrer");
                    assignmentLink.setAttribute("target", "_blank");
                    assignmentLink.innerHTML = link.display;
                    linksContainer.appendChild(assignmentLink);
                }
                assignmentContent.appendChild(linksContainer);
            }

            //Course
            if (assignment.course) {
                let assignmentCourse = document.createElement("div");
                assignmentCourse.setAttribute("class", "assignment-attribute assignment-course");
                assignmentCourse.innerHTML = assignment.course;
                assignmentContent.appendChild(assignmentCourse);
            }

            //Description
            let assignmentDesc = document.createElement("div");
            assignmentDesc.setAttribute("class", "assignment-description");
            assignmentDesc.innerHTML = assignment.description;
            assignmentContent.appendChild(assignmentDesc);

            //Container for skills pills
            let assignmentSkills = document.createElement("div");
            assignmentSkills.setAttribute("class", "assignment-skills-container");

            //Skills pills
            for (let skill of assignment.skills) {
                let assignmentSkill = document.createElement("button");
                assignmentSkill.setAttribute("class", "button pill");
                assignmentSkill.innerHTML = skill;
                assignmentSkill.onclick = () => {
                    //Redirect on click
                    location.href = "/pages/skills/#" + skill.replace(/\s+/g, '-').toLowerCase();
                }
                assignmentSkills.appendChild(assignmentSkill);
            }
            assignmentContent.appendChild(assignmentSkills);

            assignmentCard.appendChild(metadataPanel);
            assignmentCard.appendChild(assignmentContent);
            assignmentContainer.appendChild(assignmentCard);
            index++;
        }
    });
}