/* eslint-env node */
module.exports = {
   normalizeEntityName() {},
   afterInstall() {
     return this.addPackagesToProject([{ name: 'ember-cli-es6-transform'},{ name: '@shopify/draggable'}]);
   },
};
