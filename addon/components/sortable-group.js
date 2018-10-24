import Component from '@ember/component';
import { Sortable, Plugins } from 'draggable';
import layout from '../templates/components/sortable-group';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';

export default Component.extend({
    layout,
    classNames: ['sortable-group'],
    sortable: null,
    events: A([
        'sort',
        'sorted',
        'start',
        'stop'
    ]),
    initializeEventListeners() {
        const sortable = get(this, 'sortable');
        get(this, 'events').forEach(eventName => {
            sortable.on(`sortable:${eventName}`, (event) => {
                tryInvoke(this, eventName, [event]);
            });
        });
    },
    init() {
        //Default sortable group array to be null, these will be added when the sortable groups insert into the DOM
        if (!get(this, 'fastboot.isFastBoot')) {
            const sortable = new Sortable([], {
                draggable: '.sortable-item',
                mirror: {
                    constrainDimensions: true
                },
                plugins: [Plugins.ResizeMirror]
            });
            set(this, 'sortable', sortable);
            this.initializeEventListeners();
        }

        this._super(...arguments);
    },
    willDestroyElement() {
        get(this, 'sortable').destroy();
        this._super(...arguments);
    }
});
