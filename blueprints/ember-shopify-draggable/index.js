/* eslint-env node */
module.exports = {
   normalizeEntityName() {},
   afterInstall() {
     return this.addPackagesToProject([{ name: 'ember-cli-es6-transform', target: '0.0.5'},{ name: '@shopify/draggable'}]);
   },
};
