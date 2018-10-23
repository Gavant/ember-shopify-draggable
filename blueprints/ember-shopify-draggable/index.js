/* eslint-env node */
module.exports = {
   normalizeEntityName() {},
   afterInstall() {
     return this.addPackageToProject('ember-cli-es6-transform');
   },
};
