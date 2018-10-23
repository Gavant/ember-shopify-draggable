/* eslint-env node */
module.exports = {
   normalizeEntityName() {},
   afterInstall() {
     return this.addPackagesToProject(['ember-cli-es6-transform', '@shopify/draggable']);
   },
};
