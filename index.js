'use strict';
var path = require('path');
var map = require('broccoli-stew').map;
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-shopify-draggable',

  treeForVendor(defaultTree) {
    var draggablePath = path.dirname(require.resolve('@shopify/draggable/lib/draggable.bundle.js'));
    var browserVendorLib = new Funnel(draggablePath, {
      files: ['draggable.bundle.js'],
      destDir: 'draggable'
    });

    browserVendorLib = map(browserVendorLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    return defaultTree ? new mergeTrees([defaultTree, browserVendorLib]) : browserVendorLib;
  },

  included() {
    this._super.included.apply(this, arguments);
    // app.import('vendor/draggable/draggable.bundle.js', {
    //   using: [
    //     { transformation: 'es6', as: 'draggable' }
    //   ]
    // });
  }
};
