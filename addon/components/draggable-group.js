import Component from '@ember/component';
import layout from '../templates/components/draggable-group';
import { get, setProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';
import BaseGroupMixin from '../mixins/base-group';

export default Component.extend(BaseGroupMixin, {
    layout,
    classNames: ['draggable-group'],
    draggable: alias('shopifyInstance'),
    _events: A([
        'drag:start',
        'drag:stop'
    ]),
    async didInsertElement() {
        this._super(...arguments);
        const { Draggable, Plugins } = await import('@shopify/draggable');
        const plugins = A();
        if (get(this, 'resizeMirror')) {
            plugins.pushObject(Plugins.ResizeMirror);
        }
        if (get(this, 'snappable')) {
            plugins.pushObject(Plugins.Snappable);
        }
        const shopifyInstance = new Draggable([], {
            draggable: '.draggable-item',
            delay: get(this, 'delay'),
            handle: get(this, 'handle'),
            mirror: get(this, 'mirrorOptions'),
            plugins
        });
        setProperties(this, {
            shopifyInstance,
            plugins: Plugins
        });
        //Public Events
        this.initializePublicEventListeners();
        //Private Events
        this.initializePrivateEventListeners();
        this.trigger('setupContainers');
    }
});
