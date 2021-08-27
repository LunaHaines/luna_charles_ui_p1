import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';

FacultyDashboard.prototype = new ViewComponent('facultydashboard')
function FacultyDashboard() {

    let viewCourseButtonElement;
    let addCourseButtonElement;
    let editCourseButtonElement;
    let removeCourseButtonElement;

    // add course
    let courseNumberFieldElement;
    let courseTitleFieldElement;
    let courseDescriptionFieldElement;
    let courseCapacityFieldElement;
    let submitCourseButtonElement;
    let addCourseErrorMessageElement;


    async function showInfo(){
        try{
            let resp = await fetch(`${env.apiUrl}/course`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${state.authUser.token}`
                }
            });

        } catch (error) {
            console.error(error);
        }

    }

    this.render = function() {
        FacultyDashboard.prototype.injectTemplate(() => {
            viewCourseButtonElement = document.getElementById('faculty-view-courses-button');
            addCourseButtonElement = document.getElementById('faculty-add-course-button');
            editCourseButtonElement = document.getElementById('faculty-edit-course-button');
            removeCourseButtonElement = document.getElementById('faculty-remove-course-button');
            
            courseNumberFieldElement = document.getElementById('add-course-number');
            courseTitleFieldElement = document.getElementById('add-course-title');
            courseDescriptionFieldElement = document.getElementById('add-course-description');
            courseCapacityFieldElement = document.getElementById('add-course-capacity');
            submitCourseButtonElement = document.getElementById('add-course-form-button');
            addCourseErrorMessageElement = document.getElementById('add-course-error-msg');

            addCourseButtonElement.addEventListener('click', showInfo);

        });
        FacultyDashboard.prototype.injectStylesheet();
    }
}

export default new FacultyDashboard();