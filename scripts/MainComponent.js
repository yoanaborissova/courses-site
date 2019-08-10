class MainComponent extends Component {

    constructor() {
        super();

        this.resolutions = {
            tablet: {
                width: 1000,
                count: 2,
            },
            phone: {
                width: 750,
                count: 1
            }
        };


        this.trendyCourses = [
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
    }

    getTemplate() {
        return 'main.html';
    }

    attachEvents() {
        window.onresize = () => this.renderMain();
        this.renderMain();
    }

    detachEvents() {
        window.onresize = () => null;
    }

    renderMain() {
        let perClick = 3;
        if (window.innerWidth < this.resolutions.phone.width) {
            perClick = this.resolutions.phone.count;
        } else if (window.innerWidth < this.resolutions.tablet.width) {
            perClick = this.resolutions.tablet.count;
        }

        document.querySelector("main").innerHTML = `<div class="trendy-courses"></div>`;
        this.addPreviousButton();
        for (let courseId = 0; courseId < Math.min(perClick, this.trendyCourses.length); courseId++)
            this.addCourse(courseId + 1, this.trendyCourses[courseId]);
        this.addNextButton();

        document.querySelector("#slider-next").onclick = () => this.changeContent(1);
        document.querySelector("#slider-previous").onclick = () => this.changeContent(-1);
        this.changeCursors(-1);
    }

    addPreviousButton() {
        document.querySelector(".trendy-courses").innerHTML += `<div id="slider-previous" class="slider"></div>`;
    }

    addNextButton() {
        document.querySelector(".trendy-courses").innerHTML += `<div id="slider-next" class="slider"></div>`;
    }

    addCourse(courseId, course) {
        document.querySelector(".trendy-courses").innerHTML +=
            `
            <section class="flip-box course-section" data-id="course-${courseId}">
                ${this.getCourseContent(courseId, course)}
            </section>
            `;
    }

    getCursor(index, predicate, direction) {
        const sections = [...document.querySelectorAll('.course-section')];
        const last = sections[index];
        const id = +last.getAttribute('data-id').split('-')[1] + direction;
        if (predicate(id)) {
            return 'not-allowed';
        }

        return 'pointer';
    }

    changeContent(direction = 1) {
        let [nextButtonCursor, previousButtonCursor] = this.changeCursors(direction);

        if ((direction === 1 && nextButtonCursor === 'not-allowed') || (direction === -1 && previousButtonCursor === 'not-allowed')) {
            return;
        }

        let timeOut = 100;
        document.querySelectorAll('.course-section').forEach(current => {
                setTimeout(() => {
                        const oldCourseId = +current.getAttribute('data-id').split('-')[1];
                        const newCourseId = oldCourseId + direction;
                        const course = this.trendyCourses[newCourseId];

                        if (!current) {
                            return;
                        }

                        if (newCourseId >= this.trendyCourses.length) {
                            return;
                        }

                        current.querySelector('.flip-box-inner').setAttribute('style',
                            'transform: rotateY(360deg);'
                        );
                        setTimeout(() => {
                                current.innerHTML = this.getCourseContent(newCourseId, course);
                                current.setAttribute('data-id', 'course-' + newCourseId);
                                this.changeCursors(direction);
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

    changeCursors(direction) {
        const nextButtonCursor = this.getCursor([...document.querySelectorAll('.course-section')].length - 1, index => index >= this.trendyCourses.length, direction);
        const previousButtonCursor = this.getCursor(0, index => index <= 0, direction);

        document.querySelector("#slider-next").setAttribute('style', 'cursor: ' + nextButtonCursor);
        document.querySelector("#slider-previous").setAttribute('style', 'cursor:' + previousButtonCursor);

        return [nextButtonCursor, previousButtonCursor];
    }

    getCourseContent(courseId, course) {
        return `
        <div class="flip-box-inner">
            <div class="course-logo">
                <img src="${course.img}" alt="pepper"/>
            </div>
            <div class="course-info">
                <h1>${course.title} ${courseId}</h1>
                <p>${course.description}</p>
            </div>
        </div>
        `;
    }
}
