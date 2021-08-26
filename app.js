import homeComponent from './components/home/home.component.js';
import navbarComponent from './components/navbar/navbar.component.js';
import signupComponent from './components/signup/signup.component.js';
import studentLoginComponent from './components/studentlogin/studentlogin.component.js';
import facultyLoginComponent from './components/facultylogin/facultylogin.component.js';
import studentdashboardComponent from './components/studentdashboard/studentdashboard.component.js';

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
    },
    {
        path: '/home',
        component: homeComponent
    },
    {
        path: '/studentdashboard',
        component: studentdashboardComponent
    }
];

const router = new Router(routes);

window.onload = () => {
    navbarComponent.render();
    //router.navigate('/signup');
}

export default router;