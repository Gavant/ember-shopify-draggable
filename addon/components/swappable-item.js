import Component from '@ember/component';
import layout from '../templates/components/swappable-item';
import { tryInvoke } from '@ember/utils';
import { get } from '@ember/object';

export default Component.extend({
    layout,
    classNames: ['swappable-item'],
    _dragStart(event) {
        const source = get(event, 'data.originalSource');
        if (this.element && this.element.isSameNode(source)) {
            tryInvoke(this, 'dragStart', [get(this, 'item'), get(this, 'index')]);
        }
    },
    _swap(event) {
        const source = get(event, 'data.over');
        if (this.element && this.element.isSameNode(source)) {
            tryInvoke(this, 'swapped', [get(this, 'item'), get(this, 'index'), get(event, 'overContainer')]);
        }
    },
    init(){
        this._super(...arguments);
        get(this, 'container.group').on('drag:start', this, '_dragStart');
        get(this, 'container.group').on('swappable:swap', this, '_swap');
    },
    willDestroyElement(){
        this._super(...arguments);
        get(this, 'container.group').off('drag:start', this, '_dragStart');
        get(this, 'container.group').off('swappable:swap', this, '_swap');
    }
}).reopenClass({
    positionalParams: ['item']
});
