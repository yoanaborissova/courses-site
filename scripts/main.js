document.querySelectorAll('nav ul li a').forEach(a => {
    a.onclick = e => {
        fetch(e.target.getAttribute('data-content'))
            .then(x => x.text())
            .then(x => loadHTML("main", x));
    }
});

document.querySelectorAll(".expand").forEach(e => {
    e.onclick = () => {
        console.log("expand clicked");
    }
});

const courseSections = document.querySelectorAll(".trendy-courses section");
let courseSectionStart = 3;
let toPass = -1;
showAvailableCourses();
document.querySelector("#slider-next").onclick = () => {
    courseSectionStart++;
    toPass++;
    showAvailableCourses();
};

function loadHTML(selector, html) {
    document.querySelector(selector).innerHTML = html;
    loadScripts();
}

function showAvailableCourses() {
    for (let i = 0; i < courseSections.length; i++) {
        if (i < courseSectionStart && i > toPass) {
            courseSections[i].setAttribute("style", 'display: block');
        } else {
            if (i === toPass) {
                console.log(courseSections[i]);
                courseSections[i].setAttribute('class', 'slided');
            }
            setTimeout(() =>
                courseSections[i].setAttribute("style", 'display: none'), 2000);
        }
    }
}

function loadScripts() {
    const script = document.createElement("script");
    script.src = 'scripts/main.js';

    document.querySelector("#scripts").innerHTML = '';
    document.querySelector("#scripts").appendChild(script);
}
