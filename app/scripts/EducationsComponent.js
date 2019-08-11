class EducationsComponent extends Component {

    getTemplate() {
        return 'educations.html';
    }

    attachEvents() {
        document.querySelectorAll('.expand').forEach(a => {
            a.onclick = (e) => {
                let id;

                if (e.path){
                    id = e.path[2].id;
                } else if (e.originalTarget) {
                    id = e.originalTarget.parentElement.parentElement.attributes['id'].value;
                } else {
                    id = e.target.parentElement.attributes[0].ownerElement.parentElement.id;
                }

                let startDelay = 0;

                for (let li of document.getElementById(id + '-list').children) {
                    startDelay += 0.2;

                    li.setAttribute('style', 'animation-delay: ' + startDelay + 's');
                }

                if (document.getElementById(id + '-list')
                    .getAttribute('style') !== 'display: block')
                {
                    document.getElementById(id + '-list')
                        .setAttribute('style', 'display: block');
                    document.getElementById(id)
                        .getElementsByTagName('img')[0]
                        .setAttribute('style', 'transform: rotate(180deg)');
                } else {
                    document.getElementById(id + '-list')
                        .setAttribute('style', 'display: none');
                    document.getElementById(id)
                        .getElementsByTagName('img')[0]
                        .setAttribute('style', 'transform: rotate(0deg)');
                }

            };
        })
    }
}
