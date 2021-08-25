import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

SignupComponent.prototype = new ViewComponent('signup');
function SignupComponent() {
    let firstnameFieldElement;
    let lastnameFieldElement;
    let emailFieldElement;
    let passwordFieldElement;
    let passwordConfirmFieldElement;
    let signupButtonElement;
    let errorMessageElement;

    let firstname = '';
    let lastname = '';
    let email = '';
    let password = '';
    let passwordConfirm = '';

    function updateFirstname(e) {
        firstname = e.target.value;
    }

    function updateLastname(e) {
        lastname = e.target.value;
    }

    function updateEmail(e) {
        email = e.target.value;
    }

    function updatePassword(e) {
        password = e.target.value;
    }

    function updatePasswordConfirm(e) {
        passwordConfirm = e.target.value;
    }

    function updateErrorMessage(errorMessage) {
        if (errorMessage) {
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        } else {
            errorMessageElement.setAttribute('hidden','true');
            errorMessageElement.innerText = '';
        }
    }

    function signup(e) {
        e.preventDefault();
        if (!firstname || !lastname || !email || !password || !passwordConfirm) {
            //updateErrorMessage('You need to provide information in all fields');
            updateErrorMessage('');
        } else if (!(password === passwordConfirm)) {
            updateErrorMessage('Password and Confirm password must be the same');
            return;
        }

        let info = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password
        };

        let status = 0;

        fetch(`${env.apiUrl}/student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then(resp => {
                status = resp.status;
                return resp.json();
            }).then(payload => {
                if (status === 400) {
                    updateErrorMessage(payload.message);
                } else if (status === 409) {
                    updateErrorMessage(payload.message);
                } else if (status === 500) {
                    updateErrorMessage('Server error occured, could not register new user');
                } else {
                    router.navigate('/studentlogin');
                }
            }).catch(err => console.error(err));
    }

    this.render = function() {
        SignupComponent.prototype.injectTemplate(() => {
            firstnameFieldElement = document.getElementById('signup-form-firstname');
            lastnameFieldElement = document.getElementById('signup-form-lastname');
            emailFieldElement = document.getElementById('signup-form-email');
            passwordFieldElement = document.getElementById('signup-form-password');
            passwordConfirmFieldElement = document.getElementById('signup-form-password-confirm');
            signupButtonElement = document.getElementById('signup-form-button');
            errorMessageElement = document.getElementById('error-msg');

            firstnameFieldElement.addEventListener('keyup', updateFirstname);
            lastnameFieldElement.addEventListener('keyup', updateLastname);
            emailFieldElement.addEventListener('keyup', updateEmail);
            passwordFieldElement.addEventListener('keyup', updatePassword);
            passwordConfirmFieldElement.addEventListener('keyup', updatePasswordConfirm);
            signupButtonElement.addEventListener('click', signup);
        });

        SignupComponent.prototype.injectStylesheet();
    }
}

export default new SignupComponent();