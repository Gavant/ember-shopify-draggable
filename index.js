'use strict';

module.exports = {
    name: '@gavant/ember-shopify-draggable',
    options: {
        babel: {
            plugins: [
                // Ensure that `ember-auto-import` can handle the dynamic imports
                require('ember-auto-import/babel-plugin')
            ]
        }
    },

    included() {
        this._super.included.apply(this, arguments);
    }
};
