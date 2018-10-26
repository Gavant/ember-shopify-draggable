import Component from '@ember/component';
import layout from '../templates/components/sortable-item';
import { tryInvoke } from '@ember/utils';
import { get } from '@ember/object';

export default Component.extend({
    layout,
    classNames: ['sortable-item'],
    visible: false,
    didInsertElement() {
        this._super(...arguments);

        get(this, 'container.group.sortable').on('drag:start', (event) => {
            const source = get(event, 'data.originalSource');
            if (this.element && this.element.isSameNode(source)) {
                tryInvoke(this, 'dragStart', [get(this, 'item')]);
            }
        });
    }
}).reopenClass({
    positionalParams: ['item']
});
