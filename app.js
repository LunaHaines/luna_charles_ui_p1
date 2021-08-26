import homeComponent from './components/home/home.component.js';
import navbarComponent from './components/navbar/navbar.component.js';
import signupComponent from './components/signup/signup.component.js';
import studentloginComponent from './components/studentlogin/studentlogin.component.js';

import { Router } from './util/router.js';

let routes = [
    {
        path: '/signup',
        component: signupComponent
    },
    {
        path: '/studentlogin',
        component: studentloginComponent
    },
    {
        path: '/home',
        component: homeComponent
    }
];

const router = new Router(routes);

window.onload = () => {
    navbarComponent.render();
    //router.navigate('/signup');
}

export default router;