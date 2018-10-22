import Component from '@ember/component';
import { Swappable, Plugins } from '@shopify/draggable';

import layout from '../templates/components/swap-container';

export default Component.extend({
  layout,
  didInsertElement() {
    this._super(...arguments);
    new Swappable(this.$(), {
      draggable: '.swap-item',
      mirror: {
        appendTo: this.$(),
        constrainDimensions: true
      },
      plugins: [Plugins.ResizeMirror]
    })
  },
});
