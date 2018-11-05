import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
    list: A([
        { name: "Item 1" },
        { name: "Item 2" },
        { name: "Item 3" }
    ]),
    listTwo: A([
        { name: "Item 4" },
        { name: "Item 5" },
        { name: "Item 6" }
    ]),
    listThree: A([
        { name: "Item 7" },
        { name: "Item 8" },
        { name: "Item 9" }
    ]),
});
