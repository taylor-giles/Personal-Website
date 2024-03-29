export const SKILLS_FILE = "/data/skills.json";
export const EXP_FILE = "/data/experiences.json";
export const PROJECTS_FILE = "/data/projects.json";

//Endpoint for the AWS API for email lambda function
export const EMAIL_URL = "https://8dqpo6qwv1.execute-api.us-east-1.amazonaws.com";

export const loadJSONFromFile = function(jsonFilePath, callback){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    xmlhttp.open("GET", jsonFilePath, true);
    xmlhttp.send();
}

export const refreshHash = function(){
    //Refresh the hash (wait for everything to load before scrolling)
    let givenHash = location.hash;
    if(givenHash){
        location.replace("#"); //Remove hash without adding to history
        setTimeout(function() { location.replace(givenHash) }, 100); //Add hash back in to cause autoscroll
    }
}