import Component from '@ember/component';
import layout from '../templates/components/droppable-container';
import BaseContainerMixin from '../mixins/base-container';

export default Component.extend(BaseContainerMixin, {
  layout,
  classNames: ['droppable-container']
});
