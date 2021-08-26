import navbarComponent from './components/navbar/navbar.component.js';
import signupComponent from './components/signup/signup.component.js';
import studentLoginComponent from './components/studentlogin/studentlogin.component.js';
import facultyLoginComponent from './components/facultylogin/facultylogin.component.js';

import { Router } from './util/router.js';

let routes = [
    {
        path: '/signup',
        component: signupComponent
    },
    {
        path: '/studentlogin',
        component: studentLoginComponent
    },
    {
        path: '/facultylogin',
        component: facultyLoginComponent
    }
];

const router = new Router(routes);

window.onload = () => {
    navbarComponent.render();
    //router.navigate('/signup');
}

export default router;