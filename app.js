// SPA page logic

// Function that hides any views that are currently displayed
const hideViews = () => {
    const views = document.querySelectorAll('div.view');
    views.forEach(view => view.classList.remove('active'));
}


// Function that handles site navigation
const routeTo = route => {
    hideViews();
    document.querySelector('div.view#' + route).classList.add('active');
    console.log('going to: ' + route);
}


// Instantiate app drawer and add hamburger event listener
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const hamburger = document.querySelector('.mdc-top-app-bar__navigation-icon--unbounded');
hamburger.addEventListener('click', () => drawer.open = true);


// Show search view on entry
routeTo('search');


// Add navigation between pages using drawer buttons
document.querySelectorAll('nav.mdc-list>a.mdc-list-item').forEach(button => {
    button.addEventListener('click', () => {
        routeTo(button.children[1].textContent.toLowerCase())
        drawer.open = false;
    });
});


// Instantiate search button and search bar and add navigation to result view
const searchBtn = document.querySelector('#search-button');
const searchBar = document.querySelector('.mdc-text-field')
new mdc.textField.MDCTextField(searchBar);

searchBtn.addEventListener('click', () => {
    const searchValue = document.querySelector('#search-input').value;

    if (searchValue !== '') {
        routeTo('result');
    }
});

// If user presses enter on search bar, click the search button
searchBar.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        searchBtn.click();
    }
});


// Have all back buttons on the site redirect to the search page
document.querySelectorAll('#back-button').forEach(button => {
    button.addEventListener('click', () => {
        routeTo('search');
        document.querySelector('#search-input').value = '';
    });
});


// Instantiate camera button and add navigation to camera view
const cameraBtn = document.querySelector('#camera-button');
cameraBtn.addEventListener('click', () => {
    routeTo('camera');
});
