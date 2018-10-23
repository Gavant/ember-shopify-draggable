import Component from '@ember/component';
import { Sortable, Plugins } from 'draggable';
import layout from '../templates/components/shopify-swappable';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';

export default Component.extend({
  layout,
  classNames: ['shopify-sortable'],
  events: A([
    'sort',
    'sorted',
    'start',
    'stop'
  ]),
  initializeEventListeners() {
    const sortable = get(this, 'sortable');
    get(this, 'events').forEach(eventName => {
      sortable.on(`sortable:${eventName}`, (event) => {
        tryInvoke(this, eventName, [event]);
      });
    })
  },
  didInsertElement() {
    this._super(...arguments);
    const node = this.$('.sortable-container').toArray();
    const sortable = new Sortable(node, {
      draggable: '.sortable-item',
      mirror: {
        constrainDimensions: true
      },
      plugins: [Plugins.ResizeMirror]
    });
    set(this, 'sortable', sortable);
    this.initializeEventListeners();
  },
  willDestroyElement() {
    this._super(...arguments);
    get(this, 'sortable').destroy();
  },
});
