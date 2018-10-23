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
    actions: {
        swapped(event) {
            console.log('swapped');
        },
        sorted(event) {
            console.log('sorted');
        }
    }
});
