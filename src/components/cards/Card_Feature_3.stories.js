import CardFeature3 from './Card_Feature_3.vue';

export default {
  title: 'Cards/Feature 3',
  component: CardFeature3,
};

const Template = (args) => ({
  components: { CardFeature3 },
  setup: () => ({ args }),
  template: `<CardFeature3 v-bind="args" />`,
});

export const Example = Template.bind({});
Example.args = {
  classes: 'max-w-140',
  title: 'Product & Project Management',
  text: 'Want to ask a quick coding question? During work hours, our devs are happy to chat in the Bitovi Community Slack, open to everyone who wants to talk shop.',
  imgSrc: '/icons/user-circle-add-red.svg',
  imgAlt: 'User-Circle icon',
  imgClasses: 'h-12 w-12',
  linkText: 'Explore',
  linkUrl: '/',
};

export const MissingImgAlt = Template.bind({});
MissingImgAlt.args = {
  classes: 'max-w-140',
  title: 'Product & Project Management',
  text: 'Want to ask a quick coding question? During work hours, our devs are happy to chat in the Bitovi Community Slack, open to everyone who wants to talk shop.',
  imgSrc: '/icons/user-circle-add-red.svg',
  imgAlt: '',
  imgClasses: 'h-12 w-12',
  linkText: 'Explore',
  linkUrl: '/',
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
