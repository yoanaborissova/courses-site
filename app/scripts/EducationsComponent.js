class EducationsComponent extends Component {

    getTemplate() {
        return 'educations.html';
    }

    attachEvents() {
        document.querySelectorAll('.expand').forEach(a => {
            a.onclick = e => {
                let id = e.target.dataset.id;

                let startDelay = 0;

                for (let li of document.getElementById(id).children) {
                    startDelay += 0.2;

                    li.setAttribute('style', 'animation-delay: ' + startDelay + 's');
                }

                if (document.getElementById(id).getAttribute('style') !== 'display: block') {
                    document.getElementById(id).setAttribute('style', 'display: block');
                    e.target.setAttribute('style', 'transform: rotate(180deg)');
                } else {
                    document.getElementById(id).setAttribute('style', 'display: none');
                    e.target.setAttribute('style', 'transform: rotate(0deg)');
                }

            };
        })
    }
}
