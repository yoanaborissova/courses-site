window.onload = () => {
    let hash = window.location.hash.substring(1);

    fetch(hash)
        .then(x => x.text())
        .then(x => {
                if (hash.length > 0) {
                    loadHTML("main", x);
                }

                document.querySelectorAll('.nav-bar-link').forEach(a => {
                    a.onclick = e => {
                        fetch(e.target.getAttribute('data-content'))
                            .then(x => x.text())
                            .then(x => loadHTML("main", x));
                    }
                });

                document.querySelectorAll('.expand').forEach(a => {
                    a.onclick = e => {
                        // fetch(e.target.getAttribute('data-content'))
                        //     .then(x => x.text())
                        //     .then(x => loadHTML("main", x));
                        console.log('here');
                    }
                });

                const trendyCourses = [
                    {
                        img: 'img/peppers.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/tomatoes.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/peppers.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/eggplant.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/peppers.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/tomatoes.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/eggplant.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/tomatoes.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/peppers.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/eggplant.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                    {
                        img: 'img/peppers.png',
                        title: 'Course chushki ',
                        description: 'GO GO GO COURSE'
                    },
                ];

                // window.onresize = () => {
                //     renderMain();
                // };

                document.querySelector("#home-page").onclick = renderMain;

                if (hash.length <= 0) {
                    renderMain();
                }

                function renderMain(perClick) {
                    perClick = 3;
                    if (window.innerWidth < 600) {
                        perClick = 1;
                    } else if (window.innerWidth < 800) {
                        perClick = 2;
                    }
                    document.querySelector("main").innerHTML = `<div class="trendy-courses"></div>`;
                    addPreviousButton();
                    for (let courseId = 0; courseId < Math.min(perClick, trendyCourses.length); courseId++)
                        addCourse(courseId + 1, trendyCourses[courseId]);
                    addNextButton();

                    document.querySelector("#slider-next").onclick = () => changeContent(1);
                    document.querySelector("#slider-previous").onclick = () => changeContent(-1);
                    changeCursors(-1);
                }


                function addPreviousButton() {
                    document.querySelector(".trendy-courses").innerHTML += `<div id="slider-previous" class="slider"></div>`;
                }

                function addNextButton() {
                    document.querySelector(".trendy-courses").innerHTML += `<div id="slider-next" class="slider"></div>`;
                }

                function addCourse(courseId, course) {
                    document.querySelector(".trendy-courses").innerHTML +=
                        `<section class="flip-box course-section" data-id="course-${courseId}"> 
        ${getCourseContent(courseId, course)}
    </section>`;
                }

                function getCursor(index, predicate, direction) {
                    const sections = [...document.querySelectorAll('.course-section')];
                    const last = sections[index];
                    const id = +last.getAttribute('data-id').split('-')[1] + direction;
                    if (predicate(id)) {
                        return 'not-allowed';
                    }

                    return 'pointer';
                }

                function changeContent(direction = 1) {
                    [nextButtonCursor, previousButtonCursor] = changeCursors(direction);

                    if ((direction === 1 && nextButtonCursor === 'not-allowed') || (direction === -1 && previousButtonCursor === 'not-allowed')) {
                        return;
                    }

                    let timeOut = 100;
                    document.querySelectorAll('.course-section').forEach(current => {
                            setTimeout(() => {
                                    const oldCourseId = +current.getAttribute('data-id').split('-')[1];
                                    const newCourseId = oldCourseId + direction;
                                    const course = trendyCourses[newCourseId];

                                    if (!current) {
                                        return;
                                    }

                                    if (newCourseId >= trendyCourses.length) {
                                        return;
                                    }

                                    current.querySelector('.flip-box-inner').setAttribute('style',
                                        'transform: rotateY(360deg);'
                                    );
                                    setTimeout(() => {
                                            current.innerHTML = getCourseContent(newCourseId, course);
                                            current.setAttribute('data-id', 'course-' + newCourseId);
                                            changeCursors(direction);
                                        },
                                        750
                                    );
                                },
                                timeOut
                            );
                            timeOut *= 2;
                        }
                    );
                }

                function changeCursors(direction) {
                    const nextButtonCursor = getCursor([...document.querySelectorAll('.course-section')].length - 1, index => index >= trendyCourses.length, direction);
                    const previousButtonCursor = getCursor(0, index => index <= 0, direction);

                    document.querySelector("#slider-next").setAttribute('style', 'cursor: ' + nextButtonCursor);
                    document.querySelector("#slider-previous")
                        .setAttribute('style', 'cursor:' + previousButtonCursor);

                    return [nextButtonCursor, previousButtonCursor];
                }

                function getCourseContent(courseId, course) {
                    return `<div class="flip-box-inner">
            <div class="course-logo">
                <img src="${course.img}" alt="pepper"/>
            </div>
            <div class="course-info">
                <h1>${course.title} ${courseId}</h1>
                <p>${course.description}</p>
            </div>
        </div>`;
                }

                function loadHTML(selector, html) {
                    document.querySelector(selector).innerHTML = html;
                    loadScripts();
                }

                function loadScripts() {
                    const script = document.createElement("script");
                    script.src = 'scripts/main.js';

                    document.querySelector("#scripts").innerHTML = '';
                    document.querySelector("#scripts").appendChild(script);
                }

            }
        );
};
