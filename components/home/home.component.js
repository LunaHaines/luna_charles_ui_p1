import { ViewComponent } from "../view.component.js";



homeComponent.prototype = new ViewComponent('home')
function homeComponent() {


    this.render = function() {

        homeComponent.prototype.injectTemplate(() => {

        });

        homeComponent.prototype.injectStylesheet();
    }


}

export default new homeComponent();