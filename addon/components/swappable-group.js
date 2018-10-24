import Component from '@ember/component';
import { Swappable, Plugins } from 'draggable';
import layout from '../templates/components/swappable-group';
import { get, set, computed } from '@ember/object';
import { A } from '@ember/array';
import { tryInvoke } from '@ember/utils';
import { getOwner } from '@ember/application';

export default Component.extend({
    layout,
    classNames: ['swappable-group'],
    swappable: null,
    events: A([
        'swap',
        'swapped',
        'start',
        'stop'
    ]),
    fastboot: computed(function() {
        let owner = getOwner(this);
        return owner.lookup('service:fastboot');
    }),
    initializeEventListeners() {
        const swappable = get(this, 'swappable');
        get(this, 'events').forEach(eventName => {
            swappable.on(`swappable:${eventName}`, (event) => {
                tryInvoke(this, eventName, [event]);
            });
        });
    },
    init() {
        const fastboot = get(this, 'fastboot');
        //Default swappable group array to be null, these will be added when the sortable groups insert into the DOM
        if (!fastboot || get(fastboot, 'isFastBoot') === false) {
            const swappable = new Swappable([], {
                draggable: '.swappable-item',
                mirror: {
                    constrainDimensions: true
                },
                plugins: [Plugins.ResizeMirror]
            });
            set(this, 'swappable', swappable);
            this.initializeEventListeners();
        }

        this._super(...arguments);
    },
    willDestroyElement() {
        get(this, 'swappable').destroy();
        this._super(...arguments);
    }
});
