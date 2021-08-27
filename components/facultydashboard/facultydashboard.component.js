import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from "../../app.js";

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
    let addCourseFormElement;
    let courseNumberFieldElement;
    let courseTitleFieldElement;
    let courseDescriptionFieldElement;
    let courseCapacityFieldElement;
    let submitCourseButtonElement;
    let addCourseErrorMessageElement;
    let addCourseNumber = '';
    let addCourseTitle = '';
    let addCourseDescription = '';
    let addCourseCapacity = '';

    // remove course
    let removeCourseFormElement;
    let removeCourseNumberFieldElement;
    let removeCourseFormButtonElement;
    let removeCourseErrorMessageElement;
    let removeCourseNumber = '';


    function updateAddCourseNumber(e){
        addCourseNumber = e.target.value;
    }

    function updateAddCourseTitle(e){
        addCourseTitle = e.target.value;
    }

    function updateAddCourseDescription(e){
        addCourseDescription = e.target.value;
    }

    function updateAddCourseCapacity(e){
        addCourseCapacity = e.target.value;
    }

    function updateRemoveCourseNumber(e){
        removeCourseNumber = e.target.value;
    }

    function updateAddCourseErrorMessage(errorMessage){
        if(errorMessage){
            addCourseErrorMessageElement.removeAttribute('hidden');
            addCourseErrorMessageElement.innerText = errorMessage;
        } else {
            addCourseErrorMessageElement.setAttribute('hidden', 'true');
            addCourseErrorMessageElement.innerText = '';
        }
    }

    function updateRemoveCourseErrorMessage(errorMessage){
        if(errorMessage){
            removeCourseErrorMessageElement.removeAttribute('hidden');
            removeCourseErrorMessageElement.innerText = errorMessage;
        } else {
            removeCourseErrorMessageElement.setAttribute('hidden', 'true');
            removeCourseErrorMessageElement.innerText = '';
        }
    }

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
        addCourseFormElement.removeAttribute('hidden');
    }
    
    function addCourse(){
        if(!addCourseNumber || !addCourseTitle || !addCourseDescription || !addCourseCapacity){
            updateAddCourseErrorMessage('You must complete the form');
            return;
        }
        
        let info = {
            number: addCourseNumber,
            name: addCourseTitle,
            description: addCourseDescription,
            professor: `${state.authUser.email}`,
            capacity: addCourseCapacity,
            students: []
        }

        let status = 0;

        fetch(`${env.apiUrl}/course`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${state.authUser.token}`
            },
            body: JSON.stringify(info)
        }).then(resp => {
            status = resp.status;
            return resp.json();
        }).then(payload => {
            if(status >= 400){
                updateAddCourseErrorMessage(payload.message);
            } else {
                showTaughtCourses();
            }
        }).catch(err => console.error(err));
        
    }

    function showRemoveCourseForm() {
        addCourseFormElement.removeAttribute('hidden');
    }

    function removeCourse() {
        if(!removeCourseNumber){
            updateRemoveCourseErrorMessage('You must complete the form');
            return;
        }

        let status = 0;

        let info = {
            String: removeCourseNumber
        }

        fetch(`${env.apiUrl}/course`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${state.authUser.token}`
            },
            body: `"${removeCourseNumber}"`
        }).then(resp => {
            status = resp.status;
            return resp.json();
        }).then(payload => {
            if(status >= 400){
                updateAddCourseErrorMessage(payload.message);
            } else {
                showTaughtCourses();
            }
        }).catch(err => console.error(err));
        
    }



    this.render = function() {
        FacultyDashboard.prototype.injectTemplate(() => {
            viewCourseButtonElement = document.getElementById('faculty-view-courses-button');
            addCourseButtonElement = document.getElementById('faculty-add-course-button');
            editCourseButtonElement = document.getElementById('faculty-edit-course-button');
            removeCourseButtonElement = document.getElementById('faculty-remove-course-button');
            
            coursesContainerElement = document.getElementById('courses-container');
            viewCoursesButtonElement = document.getElementById('faculty-view-courses-button');

            //add course
            addCourseFormElement = document.getElementById('add-course-form')
            courseNumberFieldElement = document.getElementById('add-course-number');
            courseTitleFieldElement = document.getElementById('add-course-title');
            courseDescriptionFieldElement = document.getElementById('add-course-description');
            courseCapacityFieldElement = document.getElementById('add-course-capacity');
            submitCourseButtonElement = document.getElementById('add-course-form-button');
            addCourseErrorMessageElement = document.getElementById('add-course-error-msg');
                courseNumberFieldElement.addEventListener('keyup', updateAddCourseNumber);
                courseTitleFieldElement.addEventListener('keyup', updateAddCourseTitle);
                courseDescriptionFieldElement.addEventListener('keyup', updateAddCourseDescription);
                courseCapacityFieldElement.addEventListener('keyup', updateAddCourseCapacity);

            //remove course
            removeCourseFormElement = document.getElementById('remove-course-form')
            removeCourseNumberFieldElement = document.getElementById('remove-course-number')
            removeCourseFormButtonElement = document.getElementById('remove-course-form-button')
            removeCourseErrorMessageElement = document.getElementById('remove-course-error-msg')
        
            viewCoursesButtonElement.addEventListener('click', showTaughtCourses);
            addCourseButtonElement.addEventListener('click', showAddCourseForm);
            submitCourseButtonElement.addEventListener('click', addCourse);
            removeCourseButtonElement.addEventListener('click', showRemoveCourseForm);
            removeCourseFormButtonElement.addEventListener('click', removeCourse);
                removeCourseNumberFieldElement.addEventListener('keyup', updateRemoveCourseNumber)
        });

        FacultyDashboard.prototype.injectStylesheet();
    }
}

export default new FacultyDashboard();