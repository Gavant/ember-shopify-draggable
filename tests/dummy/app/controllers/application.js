import Controller from '@ember/controller';

export default Controller.extend({
  list: [
    { name: "Item 1" },
    { name: "Item 2" },
    { name: "Item 3" },
  ],
  listTwo: [
    { name: "Item 4" },
    { name: "Item 5" },
    { name: "Item 6" },
  ],
  actions: {
    swapped(event) {
      console.log('swapped');
    },
    sorted(event) {
      console.log('sorted');
    }

  }
});
