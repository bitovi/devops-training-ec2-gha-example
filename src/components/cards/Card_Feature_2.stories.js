import CardFeature2 from './Card_Feature_2.vue';

export default {
  title: 'Cards/Feature 2',
  component: CardFeature2,
};

const Template = (args) => ({
  components: { CardFeature2 },
  setup: () => ({ args }),
  template: `<CardFeature2 v-bind="args" />`,
});

export const Example = Template.bind({});
Example.args = {
  title: 'Product & Project Management',
  imgSrc: '/imgs/team-illustration-1.png',
  imgAlt: '',
  linkText: 'Explore',
  linkUrl: '/',
  items: ['Analytics', 'Survey feedback', 'User Interview Results', 'Competitive Analysis'],
};

// export const InAList = Template.bind({});
// InAList.args = {
//   title: 'Product & Project Management',
//   imgSrc: '/imgs/team-illustration-1.png',
//   imgAlt: '',
//   linkText: 'Explore',
//   linkUrl: '/',
//   items: ['Analytics', 'Survey feedback', 'User Interview Results', 'Competitive Analysis'],
// };
