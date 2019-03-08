import Component from '@ember/component';
import layout from '../templates/components/sortable-item';
import { tryInvoke } from '@ember/utils';
import { get } from '@ember/object';

export default Component.extend({
    layout,
    classNames: ['sortable-item'],
    visible: false,
    _dragStart(event) {
        const source = get(event, 'data.originalSource');
        if (this.element && this.element.isSameNode(source)) {
            tryInvoke(this, 'dragStart', [get(this, 'item')]);
        }
    },
    init() {
        this._super(...arguments);
        get(this, 'container.group').on('drag:start', this, '_dragStart');
    },
    willDestroyElement() {
        get(this, 'container.group').off('drag:start', this, '_dragStart');
    }
}).reopenClass({
    positionalParams: ['item']
});
