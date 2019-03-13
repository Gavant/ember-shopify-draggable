import Component from '@ember/component';
import layout from '../templates/components/draggable-container';
import BaseContainerMixin from '../mixins/base-container';

export default Component.extend(BaseContainerMixin, {
  layout,
  classNames: ['draggable-container']
});
