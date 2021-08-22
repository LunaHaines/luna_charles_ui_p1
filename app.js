import navbarComponent from './components/navbar/navbar.component.js';

import { Router } from './util/router.js';

let routes = [

];

const router = new Router(routes);

window.onload = () => {
    navbarComponent.render();
    router.navigate('/register');
}

export default router;