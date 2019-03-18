import DraggableItem from './draggable-item';
import layout from '../templates/components/droppable-item';
import { get } from '@ember/object';
import { schedule } from '@ember/runloop';

export default DraggableItem.extend({
    layout,

    didInsertElement() {
        this._super(...arguments);
        if(get(this, 'dropzone')) {
            schedule('afterRender', get(this, 'dropzone'), 'registerItem', this);
        }
    },

    willDestroyElement() {
        if(get(this, 'dropzone')) {
            schedule('afterRender', get(this, 'dropzone'), 'deregisterItem', this);
        }
        this._super(...arguments);
    }
});
