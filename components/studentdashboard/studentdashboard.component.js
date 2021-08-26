import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

StudentDashboard.prototype = new ViewComponent('studentdashboard')
function StudentDashboard() {

    let infoButtonElement;
    let courseButtonElement;
    let registerButtonElement;
    let unregisterButtonElement;
    let infoParagraph;

    function updateInfo(info) {
        if (info) {
            infoParagraph.removeAttribute('hidden');
            infoParagraph.innerText = info;
        } else {
            infoParagraph.setAttribute('hidden', 'true');
            infoParagraph.innerText = '';
        }
    }

    async function showInfo() {
        try {
            let resp = await fetch(`${env.apiUrl}/student`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${state.authUser.token}`
                }
            });

            let queryResult = await resp.json();
            console.log('isArray: ' + Array.isArray(queryResult));
            
            updateInfo(queryResult);
        } catch (error) {
            console.error(error);
        }
    }

    this.render = function() {
        StudentDashboard.prototype.injectTemplate(() => {
            infoButtonElement = document.getElementById('student-info-button');
            courseButtonElement = document.getElementById('student-course-button');
            registerButtonElement = document.getElementById('student-register-button');
            unregisterButtonElement = document.getElementById('student-unregister-button');
            infoParagraph = document.getElementById('student-query-result');

            infoButtonElement.addEventListener('click', showInfo);
            courseButtonElement.addEventListener('click', showCourses);
            registerButtonElement.addEventListener('click', showRegisterForm);
            unregisterButtonElement.addEventListener('click', showUnregisterForm);
        });
        StudentDashboard.prototype.injectStylesheet();
    }
}

export default new StudentDashboard();