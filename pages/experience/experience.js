/**
 * Taylor Giles Personal Website
 * 
 * The scripts in this file are used to dynamically populate the experience page
 */
 import { EXP_FILE, loadJSONFromFile } from "/src/constants.js";

 window.onload = function() {
    loadExperience();

    //Refresh the hash (wait for everything to load before scrolling)
    let givenHash = location.hash;
    if(givenHash){
        location.replace("#"); //Remove hash without adding to history
        setTimeout(function() { location.replace(givenHash) }, 100); //Add hash back in to cause autoscroll
    }
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
            expAnchor.setAttribute("class", "exp-anchor");
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
            let expLocation = document.createElement("div");
            expLocation.setAttribute("class", "exp-attribute exp-location");
            expLocation.innerHTML = exp.location;
            expContent.appendChild(expLocation);

            //Description
            let expDescription = document.createElement("div");
            expDescription.setAttribute("class", "exp-attribute exp-description");
            expDescription.innerHTML = exp.description;
            expContent.appendChild(expDescription);

            expCard.appendChild(expContent);
            expContainer.appendChild(expCard);
            index++;
        }
    });
}