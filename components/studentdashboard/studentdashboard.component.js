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
    let infoContainerElement;

    function updateInfo(info) {
        if (info) {
            infoContainerElement.removeAttribute('hidden');
            infoContainerElement.innerHtml = info;
        } else {
            infoContainerElement.setAttribute('hidden', 'true');
            infoContainerElement.innerHtml = '';
        }
    }

    async function showInfo() {
        console.log('this should work...');
        try {
            let resp = await fetch(`${env.apiUrl}/student`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${state.authUser.token}`
                }
            });

            let queryResult = await resp.json();

            let newHtml = `
            <h3>User Info</h3>
            <p>name: ${queryResult[0].firstName} ${queryResult[0].lastName}</p>
            <p>email: ${queryResult[0].email}</p>
            <h3>Registered Courses</h3>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Professor</th>
                    </tr>
                </thead>
                <tbody>`

                for (let i = 0; i < queryResult.length; i++) {
                    if (i != 0) {
                        newHtml += `
                            <tr>
                                <td>${queryResult[i].number}</td>
                                <td>${queryResult[i].name}</td>
                                <td>${queryResult[i].description}</td>
                                <td>${queryResult[i].professor}</td>
                            </tr>`
                    }
                }

                newHtml += `
                </tbody>
                </table>`
                console.log(newHtml);
            
            updateInfo(newHtml);
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
            infoContainerElement = document.getElementById('show-info-container');

            infoButtonElement.addEventListener('click', showInfo);
            //courseButtonElement.addEventListener('click', showCourses);
            //registerButtonElement.addEventListener('click', showRegisterForm);
            //unregisterButtonElement.addEventListener('click', showUnregisterForm);
        });
        StudentDashboard.prototype.injectStylesheet();
    }
}

export default new StudentDashboard();