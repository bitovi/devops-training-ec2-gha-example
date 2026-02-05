import CarouselControls from './Carousel_Controls.vue';

export default {
  title: 'Carousel / Controls',
  component: CarouselControls,
};

const Template = (args) => ({
  components: { CarouselControls },
  setup: () => ({ args }),
  template: `<CarouselControls v-bind="args" />`,
});

export const Example = Template.bind({});
Example.args = {
  index: 0,
  count: 3,
};
