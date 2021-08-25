import { ViewComponent } from "../view.component.js";
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

LoginComponent.prototype = new ViewComponent('login');

function LoginComponent() {

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

    function updateErrorMessage(errorMessage){
        if(errorMessage){
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        } else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    }

    async function login() {
        if(!email || !password){
            updateErrorMessage('You need to provide an email and a password');
            return;
        } else {
            updateErrorMessage('');
        }
    
        let credentials = {
            email: email,
            password: password
        };

        let status = 0;

        // fetch(`${env.apiUrl}/authstudent`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(credentials)
        // })
        //     .then(resp => {
        //         status = resp.status;
        //         state.authUser.token = resp.headers.get('Authorization');
        //         return resp.json();
        //     })
        //     .then(payload => {
        //         if(status === 401){
        //             updateErrorMessage(payload.message);
        //         } else {
        //             state.authUser = payload;
        //         }
        //     })

        try{
            let resp = await fetch(`${env.apiUrl}/authstudent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
                });

            if(resp.status === 401) {
                updateErrorMessage(payload.message);
                return;
            }

            let token = resp.headers.get('Authorization');

            let user = await resp.json();

            if(user && token){
                user.token = token;
            }

            state.authUser = user;

            router.navigate('/studentdashboard');

        } catch (error) {
            console.error(error);
        }
    }

    this.render = function() {
        LoginComponent.prototype.injectTemplate(() => {
            
            emailFieldElement = document.getElementById('login-form-email');
            passwordFieldElement = document.getElementById('login-form-password');
            loginButtonElement = document.getElementById('login-form-button');
            errorMessageElement = document.getElementById('error-msg');

            emailFieldElement.addEventListener('keyup', updateEmail);
            passwordFieldElement.addEventListener('keyup', updatePassword);
            loginButtonElement.addEventListener('click', login);
        });
        LoginComponent.prototype.injectStylesheet();
    }

}


export default new LoginComponent();