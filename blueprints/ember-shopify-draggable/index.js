/* eslint-env node */
module.exports = {
   normalizeEntityName() {},
   afterInstall() {
     return this.addPackageToProject('@shopify/draggable');
   },
};
