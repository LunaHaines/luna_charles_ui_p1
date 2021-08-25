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
    }
];

const router = new Router(routes);

window.onload = () => {
    navbarComponent.render();
    //router.navigate('/signup');
}

export default router;