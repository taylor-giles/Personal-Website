/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate the skills page
 */
 import { PROJECTS_FILE, EXP_FILE, COURSEWORK_FILE, loadJSONFromFile, refreshHash } from "/src/constants.js";

 window.onload = function() {
    loadSkills();
    refreshHash();
}

var loadSkills = function() {
    let projects = [];
    let experiences = [];
    let coursework = [];
    let skills = new Set();

    let buildContent = () => {
        //Build HTML content
        let pillsContainer = document.getElementById("skills-pills-container");
        let skillsContainer = document.getElementById("skills-container");
        for(let skill of skills){
            //Pill
            let pill = document.createElement("button");
            pill.setAttribute("class", "button pill light");
            pill.innerHTML = skill;
            pill.onclick = () => {
                //Redirect on click
                location.href = "/pages/skills/#" + skill.replace(/\s+/g, '-').toLowerCase();
            }
            pillsContainer.appendChild(pill);

            //Skill item
            let skillSection = document.createElement("div");
            skillSection.setAttribute("class", "skill-section");

            //Anchor
            let skillAnchor = document.createElement("a");
            skillAnchor.setAttribute("name", skill.replace(/\s+/g, '-').toLowerCase());
            skillAnchor.setAttribute("class", "banner-offset-anchor");
            skillSection.appendChild(skillAnchor);

            //Header
            let skillHeader = document.createElement("div");
            skillHeader.setAttribute("class", "skill-header");
            skillHeader.innerHTML = skill;
            skillSection.appendChild(skillHeader);

            //Content
            let skillContent = document.createElement("div");
            skillContent.setAttribute("class", "skill-content");

            //Experiences
            for(let exp of experiences){
                if(exp.skills.includes(skill)){
                    //Experience item
                    let expItem = document.createElement("div");
                    expItem.setAttribute("class", "card skill-list-item skill-exp-item");

                    //Experience content
                    let expContent = document.createElement("div");

                    //Title
                    let expTitle = document.createElement("div");
                    expTitle.setAttribute("class", "skill-content-title");
                    expTitle.innerHTML = exp.title;
                    expContent.appendChild(expTitle);

                    //Employer
                    let expEmployer = document.createElement("div");
                    expEmployer.setAttribute("class", "skill-exp-employer");
                    expEmployer.innerHTML = exp.employer;
                    expContent.appendChild(expEmployer);

                    expItem.appendChild(expContent);

                    //Redirect on click
                    expItem.onclick = () => {
                        location.href = "/pages/experience/#" + exp.id;
                    };
                    skillContent.appendChild(expItem);
                }
            }

            //Projects
            for(let proj of projects){
                if(proj.skills.includes(skill)){
                    //Project item
                    let projItem = document.createElement("div");
                    projItem.setAttribute("class", `card skill-list-item skill-${proj.course ? "coursework" : "proj"}-item`);

                    //Project content
                    let projContent = document.createElement("div");

                    //Title
                    let projTitle = document.createElement("div");
                    projTitle.setAttribute("class", "skill-content-title");
                    projTitle.innerHTML = proj.title;
                    projContent.appendChild(projTitle);

                    //Description
                    let projDescription = document.createElement("div");
                    projDescription.innerHTML = proj.description;
                    projContent.appendChild(projDescription);

                    projItem.appendChild(projContent);

                    //Redirect on click
                    projItem.onclick = () => {
                        location.href = "/pages/projects/#" + proj.id;
                    };
                    skillContent.appendChild(projItem);
                }
            }

            //Coursework
            for(let assignment of coursework){
                if(assignment.skills.includes(skill)){
                    //Coursework item
                    let assignmentItem = document.createElement("div");
                    assignmentItem.setAttribute("class", "card skill-list-item skill-coursework-item");

                    //Coursework content
                    let assignmentContent = document.createElement("div");

                    //Title
                    let assignmentTitle = document.createElement("div");
                    assignmentTitle.setAttribute("class", "skill-content-title");
                    assignmentTitle.innerHTML = assignment.title;
                    assignmentContent.appendChild(assignmentTitle);

                    //Description
                    let assignmentDescription = document.createElement("div");
                    assignmentDescription.innerHTML = assignment.description;
                    assignmentContent.appendChild(assignmentDescription);

                    assignmentItem.appendChild(assignmentContent);

                    //Redirect on click
                    assignmentItem.onclick = () => {
                        location.href = "/pages/coursework/#" + assignment.id;
                    };
                    skillContent.appendChild(assignmentItem);
                }
            }

            skillSection.appendChild(skillContent);
            skillsContainer.appendChild(skillSection);
        }
    };

    let extractSkills = () => {
        //Extract skills from projects and experiences
        for(let proj of projects){
            for(let skill of proj.skills){
                skills.add(skill);
            }
        }
        for(let exp of experiences){
            for(let skill of exp.skills){
                skills.add(skill);
            }
        }
        for(let assignment of coursework){

            for(let skill of assignment.skills){
                skills.add(skill);
            }
        }

        //Alphabetical sorting
        skills = Array.from(skills).sort();
        
        buildContent();
    };

    let getExperiences = () => {
        //Get experiences
        loadJSONFromFile(EXP_FILE, (exps) => {
            for(let exp of exps){
                experiences.push(exp);
            }
            extractSkills();
        });
    };

    let getProjects = () => {
        //Get projects
        loadJSONFromFile(PROJECTS_FILE, (projs) => {
            for(let proj of projs){
                projects.push(proj);
            }
            getExperiences();
        });
    };

    let getCoursework = () => {
        //Get coursework
        loadJSONFromFile(COURSEWORK_FILE, (assignments) => {
            for(let assignment of assignments){
                coursework.push(assignment);
            }
            getProjects();
        });
    }

    getCoursework();
}