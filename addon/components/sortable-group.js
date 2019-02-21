import Component from '@ember/component';
import { Sortable, Plugins } from '@shopify/draggable';
import layout from '../templates/components/sortable-group';
import { get, set, computed } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import { getOwner } from '@ember/application';

export default Component.extend({
    layout,
    classNames: ['sortable-group'],
    sortable: null,
    constrainDimensions: true,
    events: A([
        'sort',
        'sorted',
        'start',
        'stop'
    ]),
    fastboot: computed(function() {
        let owner = getOwner(this);
        return owner.lookup('service:fastboot');
    }),
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
            const mirror = {
                constrainDimensions: get(this, 'constrainDimensions')
            }
            const sortable = new Sortable([], {
                draggable: '.sortable-item',
                mirror,
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
