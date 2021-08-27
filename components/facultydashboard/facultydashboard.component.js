import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';

FacultyDashboard.prototype = new ViewComponent('facultydashboard')
function FacultyDashboard() {

    let viewCourseButtonElement;
    let addCourseButtonElement;
    let editCourseButtonElement;
    let removeCourseButtonElement;

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


            viewCourseButtonElement.addEventListener('click', showInfo);

        });
        FacultyDashboard.prototype.injectStylesheet();
    }
}

export default new FacultyDashboard();