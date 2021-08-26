import router from '../../app.js';
import state from '../../util/state.js';

const NAVBAR_ELEMENT = document.getElementById('navbar');

function navbarComponent() {

    let templateHolder = '';
    let frag = 'components/navbar/navbar.component';

    function injectTemplate(callback) {
        if (templateHolder) {
            NAVBAR_ELEMENT.innerHTML = templateHolder;
        } else {
            fetch(`${frag}.html`)
                .then(resp => resp.text())
                .then(html => {
                    templateHolder = html;
                    NAVBAR_ELEMENT.innerHTML = templateHolder;
                    callback();
                })
                .catch(err => console.error(err));
        }
    }

    function injectStyleSheet() {
        let dynamicStyle = document.getElementById('nav-css')
        if (dynamicStyle) dynamicStyle.remove();
        dynamicStyle = document.createElement('link');
        dynamicStyle.id = 'nav-css';
        dynamicStyle.rel = 'stylesheet';
        dynamicStyle.href = `${frag}.css`;
        document.head.appendChild(dynamicStyle);
    }
    
    function navigateToView(e) {
        router.navigate(e.target.dataset.route);
    }

    function navigateToStudentView(e) {
        if (state.authUser.role === 'student') {
            router.navigate(e.target.dataset.route);
        }
    }

    function navigateToFacultyView(e) {
        if (state.authUser.role === 'faculty') {
            router.navigate(e.target.dataset.route);
        }
    }

    // TODO implement logout
    function logout() {
        state.authUser = {};
        router.navigate('/home');
    }

    this.render = function() {
        injectStyleSheet();
        injectTemplate(() => {
            // TODO add or remove components as needed
            document.getElementById('home').addEventListener('click', navigateToView)
            document.getElementById('signup').addEventListener('click', navigateToView)
            document.getElementById('logout').addEventListener('click', logout);
            document.getElementById('nav-to-student-login').addEventListener('click', navigateToView);
            document.getElementById('nav-to-student-dashboard').addEventListener('click', navigateToStudentView);
            document.getElementById('nav-to-faculty-login').addEventListener('click', navigateToView);
            document.getElementById('nav-to-faculty-dashboard').addEventListener('click', navigateToFacultyView);
        })
    }
}

export default new navbarComponent;