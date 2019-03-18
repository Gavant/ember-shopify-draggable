import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';

export default Mixin.create({
    setupContainer() {
        if(get(this, 'group.shopifyInstance')) {
            get(this, 'group.shopifyInstance').addContainer(this.element);
        }
    },

    destroyContainer() {
        if(get(this, 'group.shopifyInstance')) {
            get(this, 'group.shopifyInstance').removeContainer(this.element);
        }
    },

    init() {
        this._super(...arguments);
        if(get(this, 'group')) {
            get(this, 'group').on('setupContainers', this, 'setupContainer');
        }
    },

    willDestroyElement() {
        if(get(this, 'group')) {
            get(this, 'group').off('setupContainers', this, 'setupContainer');
        }

        this.destroyContainer();
        this._super(...arguments);
    }
});
