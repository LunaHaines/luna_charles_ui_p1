import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

FacultyLoginComponent.prototype = new ViewComponent('facultylogin');
function FacultyLoginComponent() {

    let emailFieldElement;
    let passwordFieldElement;
    let loginButtonElement;
    let errorMessageElement;

    let email = '';
    let password = '';

    function updateEmail(e) {
        email = e.target.value;
    }

    function updatePassword(e) {
        password = e.target.value;
    }

    function updateErrorMessage(errorMessage) {
        if (errorMessage) {
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        } else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    }

    async function login() {
        if(!email || !password) {
            updateErrorMessage('You need to provide an email and a password');
            return;
        } else{
            updateErrorMessage('');
        }

        let credentials = {
            email: email,
            password: password
        };

        try {
            let resp = await fetch(`${env.apiUrl}/authfaculty}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
          });

          let token = resp.headers.get('Authorization');

          let user = await resp.json();

          if (resp.status === 401) {
              updateErrorMessage(user.message);
              return;
          }

          if (user&&token) {
              user.token = token
          }

          state.authUser = user;

          router.navigate('/facultydashboard')
        } catch (error) {
            console.error(error);
        }

        this.render = function() {
            FacultyLoginComponent.prototype.injectTemplate(() => {
                emailFieldElement = document.getElementById('login-form-email');
                passwordFieldElement = document.getElementById('login-form-passworn');
                loginButtonElement = document.getElementById('login-form-button');
                errorMessageElement = document.getElementById('error-msg');

                emailFieldElement.addEventListener('keyup', updateEmail);
                passwordFieldElement.addEventListener('keyup', updatePassword);
                loginButtonElement.addEventListener('click', login);
            });
            FacultyLoginComponent.prototype.injectStylesheet();
        }
    }
}
