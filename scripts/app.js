window.onload = () => {
    const router = new Router('main', '#scripts');
    router.addRoute('/', new MainComponent());
    router.addRoute('/trainers', new TrainersComponent());
    router.addRoute('/educations', new EducationsComponent());
    router.addRoute('/partners', new PartnersComponent());
    router.addRoute('/contacts', new ContactsComponent());
    router.addRoute('/about', new AboutComponent());

    router.listen();
};
