import Component from '@ember/component';
import layout from '../templates/components/sortable-group';
import { get, setProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';

import BaseGroupMixin from '../mixins/base-group';

export default Component.extend(BaseGroupMixin, {
    layout,
    classNames: ['sortable-group'],
    sortable: null,
    shopifyInstance: alias('sortable'),
    sortableEvents: A([
        'sort',
        'sorted',
        'start',
        'stop'
    ]),
    _events: A([
        'drag:start',
        'drag:stop',
        'sortable:stop'
    ]),
    initializePublicEventListeners() {
        this._super(...arguments);
        this.bindEventListenersType('sortable');
    },
    async didInsertElement() {
        this._super(...arguments);
        // See https://github.com/ef4/ember-auto-import/issues/98
        const { Sortable, Plugins } = await import('@shopify/draggable');
        const plugins = A();
        if (get(this, 'resizeMirror')) {
            plugins.pushObject(Plugins.ResizeMirror);
        }
        if (get(this, 'snappable')) {
            plugins.pushObject(Plugins.Snappable);
        }
        if (get(this, 'swapAnimation')) {
            plugins.pushObject(Plugins.SwapAnimation);
        }
        if (get(this, 'collidable')) {
            plugins.pushObject(Plugins.Collidable);
        }
        const sortable = new Sortable([], {
            draggable: '.sortable-item',
            delay: get(this, 'delay'),
            handle: get(this, 'handle'),
            mirror: get(this, 'mirrorOptions'),
            swapAnimation: get(this, 'swapAnimationOptions'),
            collidables: get(this, 'collidables'),
            plugins
        });
        setProperties(this, {
            sortable,
            plugins: Plugins
        });
        //Public Events
        this.initializePublicEventListeners();
        //Private Events
        this.initializePrivateEventListeners();
        this.trigger('setupContainers');
    },
    willDestroyElement() {
        if (get(this, 'sortable')) {
            get(this, 'sortable').destroy();
        }
        this._super(...arguments);
    }
});
