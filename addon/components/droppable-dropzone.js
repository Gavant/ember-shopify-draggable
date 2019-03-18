import Component from '@ember/component';
import layout from '../templates/components/droppable-dropzone';
import { get, set } from '@ember/object';
import { gt } from '@ember/object/computed';
import { A } from '@ember/array';
import { assert } from '@ember/debug';

export default Component.extend({
    layout,
    classNames: ['droppable-dropzone'],
    classNameBindings: ['isOccupied:draggable-dropzone--occupied'],
    isOccupied: gt('items.length', 0),

    init() {
        this._super(...arguments);
        set(this, 'items', A());
    },

    registerItem(item) {
        assert('dropzones can only be occupied by a single item', get(this, 'items.length') === 0);
        get(this, 'items').pushObject(item);
    },

    deregisterItem(item) {
        get(this, 'items').removeObject(item);
    }
});
