import ListItem from './List_Item.vue';

export default {
  title: 'Lists / ListItem',
  component: ListItem,
};

const Template = (args) => ({
  components: { ListItem },
  setup: () => ({ args }),
  template: `
  <ListItem v-bind="args">
    <template #icon>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-2">
        <path d="m13.01 2.92 5.9 2.62c1.7.75 1.7 1.99 0 2.74l-5.9 2.62c-.67.3-1.77.3-2.44 0l-5.9-2.62c-1.7-.75-1.7-1.99 0-2.74l5.9-2.62c.67-.3 1.77-.3 2.44 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 11c0 .84.63 1.81 1.4 2.15l6.79 3.02c.52.23 1.11.23 1.62 0l6.79-3.02c.77-.34 1.4-1.31 1.4-2.15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 16c0 .93.55 1.77 1.4 2.15l6.79 3.02c.52.23 1.11.23 1.62 0l6.79-3.02c.85-.38 1.4-1.22 1.4-2.15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </template>
  </ListItem>
  
  `,
});

export const Small = Template.bind({});
Small.args = {
  title: 'Open Source Work',
  description: 'One-line Description',
  size: 'sm'
};

export const SmallInline = Template.bind({});
SmallInline.args = {
  title: 'Open Source Work',
  description: 'One-line Description',
  size: 'sm',
  inline: true
};

export const Large = Template.bind({});
Large.args = {
  title: 'Open Source Work',
  description: 'Know about issues and resolve them before customers notice',
  size: 'lg'
};
