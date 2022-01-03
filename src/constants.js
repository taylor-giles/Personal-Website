export const SKILLS_FILE = "/data/skills.json";
export const EXP_FILE = "/data/experiences.json";
export const PROJECTS_FILE = "/data/projects.json";

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