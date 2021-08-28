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
    let addCourseNumberFieldElement;
    let addCourseTitleFieldElement;
    let addCourseDescriptionFieldElement;
    let addCourseCapacityFieldElement;
    let addSubmitCourseButtonElement;
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

    // edit course
    let editCourseFormElement;
    let editCourseNumberElement;
    let editCourseFieldElement;
    let editCourseValueElement;
    let editCourseFormButtonElement;
    let editCourseErrorMessageElement;
    let editCourseNumber = '';
    let editCourseField = '';
    let editCourseValue = '';


    
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

    function updateEditCourseNumber(e){
        editCourseNumber = e.target.value;
    }

    function updateEditCourseField(e){
        editCourseField = e.target.value;
    }

    function updateEditCourseValue(e){
        editCourseValue = e.target.value;
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

    function updateEditCourseErrorMessage(errorMessage){
        if(errorMessage){
            editCourseErrorMessageElement.removeAttribute('hidden');
            editCourseErrorMessageElement.innerText = errorMessage;
        } else {
            editCourseErrorMessageElement.setAttribute('hidden', 'true');
            editCourseErrorMessageElement.innerText = '';
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

        coursesContainerElement.removeAttribute('hidden');
        addCourseFormElement.setAttribute('hidden', 'true');
        editCourseFormElement.setAttribute('hidden', 'true');
        removeCourseFormElement.setAttribute('hidden', 'true');
        addCourseErrorMessageElement.setAttribute('hidden', 'true');
        editCourseErrorMessageElement.setAttribute('hidden', 'true');
        removeCourseErrorMessageElement.setAttribute('hidden', 'true');

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
                                <th scope="col">#</th>
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
                                    <th>${i+1}</th>
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
        editCourseFormElement.setAttribute('hidden', 'true');
        removeCourseFormElement.setAttribute('hidden', 'true');
        coursesContainerElement.setAttribute('hidden', 'true');

        
        addCourseErrorMessageElement.setAttribute('hidden', 'true');
        editCourseErrorMessageElement.setAttribute('hidden', 'true');
        removeCourseErrorMessageElement.setAttribute('hidden', 'true');

    }

    function showEditForm(){
        editCourseFormElement.removeAttribute('hidden');
        addCourseFormElement.setAttribute('hidden', 'true');
        removeCourseFormElement.setAttribute('hidden', 'true');
        coursesContainerElement.setAttribute('hidden', 'true');

        
        addCourseErrorMessageElement.setAttribute('hidden', 'true');
        editCourseErrorMessageElement.setAttribute('hidden', 'true');
        removeCourseErrorMessageElement.setAttribute('hidden', 'true');

    }

    function showRemoveCourseForm() {
        removeCourseFormElement.removeAttribute('hidden');
        addCourseFormElement.setAttribute('hidden', 'true');
        editCourseFormElement.setAttribute('hidden', 'true');
        coursesContainerElement.setAttribute('hidden', 'true');


        
        addCourseErrorMessageElement.setAttribute('hidden', 'true');
        editCourseErrorMessageElement.setAttribute('hidden', 'true');
        removeCourseErrorMessageElement.setAttribute('hidden', 'true');
        
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

    function editCourse() {
        if(!editCourseNumber || !editCourseValue || !editCourseField){
            updateEditCourseErrorMessage('You must complete the form');
            return;
        }

        let info = {
            currentNumber: editCourseNumber,
            field: editCourseField,
            newValue : editCourseValue
        }

        let status = 0;

        fetch(`${env.apiUrl}/course`, {
            method: 'PUT',
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
                updateEditCourseErrorMessage(payload.message);
            } else {
                showTaughtCourses();
            }
        }).catch(err => console.error(err));

    }

    function removeCourse() {
        if(!removeCourseNumber){
            updateRemoveCourseErrorMessage('You must complete the form');
            return;
        }

        let status = 0;

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
            
            coursesContainerElement = document.getElementById('courses-container');
            
            viewCoursesButtonElement = document.getElementById('faculty-view-courses-button');
            viewCoursesButtonElement.addEventListener('click', showTaughtCourses);
                
            editCourseButtonElement = document.getElementById('faculty-edit-course-button');
            editCourseButtonElement.addEventListener('click', showEditForm);

            addCourseButtonElement = document.getElementById('faculty-add-course-button');
            addCourseButtonElement.addEventListener('click', showAddCourseForm);

            removeCourseButtonElement = document.getElementById('faculty-remove-course-button');
            removeCourseButtonElement.addEventListener('click', showRemoveCourseForm);



            //add course
            addCourseFormElement = document.getElementById('add-course-form');
            addCourseNumberFieldElement = document.getElementById('add-course-number');
            addCourseTitleFieldElement = document.getElementById('add-course-title');
            addCourseDescriptionFieldElement = document.getElementById('add-course-description');
            addCourseCapacityFieldElement = document.getElementById('add-course-capacity');
            addSubmitCourseButtonElement = document.getElementById('add-course-form-button');
            addCourseErrorMessageElement = document.getElementById('add-course-error-msg');

            addCourseNumberFieldElement.addEventListener('keyup', updateAddCourseNumber);
            addCourseTitleFieldElement.addEventListener('keyup', updateAddCourseTitle);
            addCourseDescriptionFieldElement.addEventListener('keyup', updateAddCourseDescription);
            addCourseCapacityFieldElement.addEventListener('keyup', updateAddCourseCapacity);
            addSubmitCourseButtonElement.addEventListener('click', addCourse);

            //remove course
            removeCourseFormElement = document.getElementById('remove-course-form');
            removeCourseNumberFieldElement = document.getElementById('remove-course-number');
            removeCourseFormButtonElement = document.getElementById('remove-course-form-button');
            removeCourseErrorMessageElement = document.getElementById('remove-course-error-msg');
            removeCourseFormButtonElement.addEventListener('click', removeCourse);
            removeCourseNumberFieldElement.addEventListener('keyup', updateRemoveCourseNumber);

            //edit courses
            editCourseFormElement = document.getElementById('edit-course-form');
            editCourseNumberElement = document.getElementById('edit-course-number');
            editCourseFieldElement = document.getElementById('edit-course-field');
            editCourseValueElement = document.getElementById('edit-course-value');
            editCourseFormButtonElement = document.getElementById('edit-course-form-button');
            editCourseErrorMessageElement = document.getElementById('edit-course-error-msg');
            editCourseNumberElement.addEventListener('keyup', updateEditCourseNumber);
            editCourseFieldElement.addEventListener('blur', updateEditCourseField);
            editCourseValueElement.addEventListener('keyup', updateEditCourseValue);
            editCourseFormButtonElement.addEventListener('click', editCourse);


        });

        FacultyDashboard.prototype.injectStylesheet();
    }
}

export default new FacultyDashboard();