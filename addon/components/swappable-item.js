import Component from '@ember/component';
import layout from '../templates/components/swappable-item';
import { tryInvoke } from '@ember/utils';
import { get } from '@ember/object';

export default Component.extend({
    layout,
    classNames: ['swappable-item'],
    didInsertElement() {
        this._super(...arguments);

        get(this, 'container.group.swappable').on('drag:start', (event) => {
            const source = get(event, 'data.originalSource');
            if (this.element && this.element.isSameNode(source)) {
                tryInvoke(this, 'dragStart', [get(this, 'item'), get(this, 'index')]);
            }
        });

        get(this, 'container.group.swappable').on('swappable:swapped', (event) => {
            const source = get(event, 'data.swappedElement');
            if (this.element && this.element.isSameNode(source)) {
                tryInvoke(this, 'swapped', [get(this, 'item'), get(this, 'index')]);
            }
        });
    }
}).reopenClass({
    positionalParams: ['item']
});
