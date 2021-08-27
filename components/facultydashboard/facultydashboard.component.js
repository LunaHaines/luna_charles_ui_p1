import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';

FacultyDashboard.prototype = new ViewComponent('facultydashboard')
function FacultyDashboard() {

    let viewCourseButtonElement;
    let addCourseButtonElement;
    let editCourseButtonElement;
    let removeCourseButtonElement;

    //view courses
    let coursesContainerElement;
    let viewCoursesButtonElement;

    // add course
    let addCourseFormElement
    let courseNumberFieldElement;
    let courseTitleFieldElement;
    let courseDescriptionFieldElement;
    let courseCapacityFieldElement;
    let submitCourseButtonElement;
    let addCourseErrorMessageElement;

    function updateTaughtCoursesInfo(info) {
        if (info) {
            coursesContainerElement.removeAttribute('hidden');
            coursesContainerElement.innerHTML = info;
        } else {
            coursesContainerElement.setAttribute('hidden', 'true');
            coursesContainerElement.innerHTML = '';
        }
    }


    async function showTaughtCourses(){
        try{
            let resp = await fetch(`${env.apiUrl}/course`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${state.authUser.token}`
                }
            });

            let queryResult = await resp.json();

            let newHTML = `
           
                <h3>Your Courses</h3>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Number</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Capacity</th>
                            </tr>
                        </thead>
                        </tbody>`

                        for(let i = 0; i < queryResult.length; i++){
                            newHTML += `
                                <tr>
                                    <td>${queryResult[i].number}</td>
                                    <td>${queryResult[i].name}</td>
                                    <td>${queryResult[i].description}</td>
                                    <td>${queryResult[i].capacity}</td>
                                </tr>
                                `
                        }

            newHTML += `
                        </tbody>
                    </table>
                    `

            updateTaughtCoursesInfo(newHTML);

        } catch (error) {
            console.error(error);
        }
    }

    function showAddCourseForm(){
        
    }

    this.render = function() {
        FacultyDashboard.prototype.injectTemplate(() => {
            viewCourseButtonElement = document.getElementById('faculty-view-courses-button');
            addCourseButtonElement = document.getElementById('faculty-add-course-button');
            editCourseButtonElement = document.getElementById('faculty-edit-course-button');
            removeCourseButtonElement = document.getElementById('faculty-remove-course-button');
            
            coursesContainerElement = document.getElementById('courses-container');
            viewCoursesButtonElement = document.getElementById('faculty-view-courses-button');

            addCourseFormElement = document.getElementById('add-course-form')
            courseNumberFieldElement = document.getElementById('add-course-number');
            courseTitleFieldElement = document.getElementById('add-course-title');
            courseDescriptionFieldElement = document.getElementById('add-course-description');
            courseCapacityFieldElement = document.getElementById('add-course-capacity');
            submitCourseButtonElement = document.getElementById('add-course-form-button');
            addCourseErrorMessageElement = document.getElementById('add-course-error-msg');



            viewCoursesButtonElement.addEventListener('click', showTaughtCourses);
            addCourseButtonElement.addEventListener('click', showAddCourseForm);

        });
        FacultyDashboard.prototype.injectStylesheet();
    }
}

export default new FacultyDashboard();