// SPA page logic

// Function that hides any views that are currently displayed
const hideViews = () => {
    const views = document.querySelectorAll('div.view');
    views.forEach(view => view.classList.remove('active'));
}


// Instantiate app drawer and add hamburger event listener
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const hamburger = document.querySelector('.mdc-top-app-bar__navigation-icon--unbounded');
hamburger.addEventListener('click', () => drawer.open = true);


// Show search view on entry
document.querySelector('div.view#search').classList.add('active');


// Add navigation between pages using drawer buttons
document.querySelectorAll('nav.mdc-list>a.mdc-list-item').forEach(button => {
    button.addEventListener('click', () => {
        hideViews();
        const destination = button.getAttribute('href');
        document.querySelector(destination).classList.add('active');
        drawer.open = false;
        console.log('going to: ' + destination);
    });
});
