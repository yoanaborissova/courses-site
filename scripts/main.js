document.querySelectorAll('nav ul li a').forEach(a => {
    a.onclick = e => {
        fetch(e.target.getAttribute('data-content'))
            .then(x => x.text())
            .then(x => document.querySelector('main').innerHTML = x);
    }
})
