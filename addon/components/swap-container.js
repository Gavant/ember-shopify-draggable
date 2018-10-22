import Component from '@ember/component';
import { Swappable, Plugins } from 'draggable';

import layout from '../templates/components/swap-container';

export default Component.extend({
  layout,
  didInsertElement() {
    this._super(...arguments);
    const node = this.$()[0];
    new Swappable(node, {
      draggable: '.swap-item',
      mirror: {
        appendTo: node,
        constrainDimensions: true
      },
      plugins: [Plugins.ResizeMirror]
    })
  },
});
