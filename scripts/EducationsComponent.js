class EducationsComponent extends Component {

    getTemplate() {
        return 'educations.html';
    }

    attachEvents() {
        document.querySelectorAll('.expand').forEach(a => {
            a.onclick = () => console.log('clicked expand!');
        })
    }
}