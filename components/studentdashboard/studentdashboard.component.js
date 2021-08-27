import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';

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
            infoContainerElement.innerHTML = '';
            infoContainerElement.innerHTML = info;
        } else {
            infoContainerElement.setAttribute('hidden', 'true');
            infoContainerElement.innerHTML = '';
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

            let newHtml = `
            <br>
            <h3>User Info</h3>
            <p>name: ${queryResult[0].firstName} ${queryResult[0].lastName}</p>
            <p>email: ${queryResult[0].email}</p>
            <h3>Registered Courses</h3>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Professor</th>
                    </tr>
                </thead>
                <tbody>`

                for (let i = 1; i < queryResult.length; i++) {
                    newHtml += `
                        <tr>
                            <th>${i}</h>
                            <td>${queryResult[i].number}</td>
                            <td>${queryResult[i].name}</td>
                            <td>${queryResult[i].description}</td>
                            <td>${queryResult[i].professor}</td>
                        </tr>`
                }

                newHtml += `
                </tbody>
                </table>`
            
            updateInfo(newHtml);
        } catch (error) {
            console.error(error);
        }
    }

    async function showCourses() {
        try {
            let resp = await fetch(`${env.apiUrl}/registration`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${state.authUser.token}`
                }
            });

            let courses = await resp.json();

            let newHtml = `
            <br>
            <h3>Course List</h3>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Professor</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Registered</th>
                    </tr>
                </thead>
                <tbody>`;
            console.log(courses.length);
            for (let i = 0; i < courses.length; i++) {
                if (courses[i].students) {
                    newHtml += `
                        <tr>
                            <th>${i+1}</th>
                            <td>${courses[i].number}</td>
                            <td>${courses[i].name}</td>
                            <td>${courses[i].description}</td>
                            <td>${courses[i].professor}</td>
                            <td>${courses[i].capacity}</td>
                            <td>${courses[i].students.length}</td>
                        </tr>`
                } else {
                    newHtml += `
                        <tr>
                            <th>${i+1}</th>
                            <td>${courses[i].number}</td>
                            <td>${courses[i].name}</td>
                            <td>${courses[i].description}</td>
                            <td>${courses[i].professor}</td>
                            <td>${courses[i].capacity}</td>
                            <td>0</td>
                        </tr>`
                }
            }

            newHtml += `
            </tbody>
            </table>`

            updateInfo(newHtml);
        } catch(e) {
            console.error(e);
        }
    }



    this.render = function() {
        StudentDashboard.prototype.injectTemplate(() => {
            infoButtonElement = document.getElementById('student-info-button');
            courseButtonElement = document.getElementById('student-course-button');
            registerButtonElement = document.getElementById('student-register-button');
            unregisterButtonElement = document.getElementById('student-unregister-button');
            infoContainerElement = document.getElementById('show-info-container');

            showInfo();

            infoButtonElement.addEventListener('click', showInfo);
            courseButtonElement.addEventListener('click', showCourses);
            //registerButtonElement.addEventListener('click', showRegisterForm);
            //unregisterButtonElement.addEventListener('click', showUnregisterForm);
        });
        StudentDashboard.prototype.injectStylesheet();
    }
}

export default new StudentDashboard();