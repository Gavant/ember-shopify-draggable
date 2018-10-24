import Component from '@ember/component';
import layout from '../templates/components/swappable-container';
import { get } from '@ember/object';

export default Component.extend({
    layout,
    classNames: ['swappable-container'],
    didInsertElement() {
        this._super(...arguments);
        get(this, 'group.swappable').addContainer(this.element);
    },
    willDestroyElement() {
        this._super(...arguments);
        get(this, 'group.swappable').removeContainer(this.element);
    },
});
