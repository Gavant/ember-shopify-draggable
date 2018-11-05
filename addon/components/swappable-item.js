import Component from '@ember/component';
import layout from '../templates/components/swappable-item';
import { tryInvoke } from '@ember/utils';
import { get } from '@ember/object';

export default Component.extend({
    layout,
    classNames: ['swappable-item'],
    didInsertElement() {
        get(this, 'container.group.swappable').on('drag:start', (event) => {
            const source = get(event, 'data.originalSource');
            if (this.element && this.element.isSameNode(source)) {
                tryInvoke(this, 'dragStart', [get(this, 'item'), get(this, 'index')]);
            }
        });

        get(this, 'container.group.swappable').on('swappable:swap', (event) => {
            const source = get(event, 'data.over');
            if (this.element && this.element.isSameNode(source)) {
                tryInvoke(this, 'swapped', [get(this, 'item'), get(this, 'index'), get(event, 'overContainer')]);
            }
        });
        this._super(...arguments);
    }
}).reopenClass({
    positionalParams: ['item']
});
