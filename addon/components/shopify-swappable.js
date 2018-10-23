import Component from '@ember/component';
import { Swappable, Plugins } from 'draggable';
import layout from '../templates/components/shopify-swappable';
import { get, set } from '@ember/object';
import { A } from '@ember/array';
import { tryInvoke } from '@ember/utils';

export default Component.extend({
  layout,
  classNames: ['shopify-swappable'],
  events: A([
    'swap',
    'swapped',
    'start',
    'stop'
  ]),
  initializeEventListeners() {
    const swappable = get(this, 'swappable');
    get(this, 'events').forEach(eventName => {
      swappable.on(`swappable:${eventName}`, (event) => {
        tryInvoke(this, eventName, [event]);
      });
    })
  },
  didInsertElement() {
    this._super(...arguments);
    const node = this.$('.swappable-container').toArray();
    const swappable = new Swappable(node, {
      draggable: '.swappable-item',
      mirror: {
        appendTo: node,
        constrainDimensions: true
      },
      plugins: [Plugins.ResizeMirror]
    });
    set(this, 'swappable', swappable);
    this.initializeEventListeners();
  },
  willDestroyElement() {
    this._super(...arguments);
    get(this, 'swappable').destroy();
  },
});
