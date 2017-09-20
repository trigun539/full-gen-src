import React         from 'react';
import faker         from 'faker';
import { storiesOf } from '@storybook/react';
import { action }    from '@storybook/addon-actions';
import Overview      from 'components/overview/overview';

const props = {
  items: [
    { label: 'Name', value: 'Some name here', order: 1 },
    { label: 'Business Name', value: 'Some business name here', order: 2 },
    { label: 'Description', value: faker.lorem.sentence(), order: 3 },
    { label: 'Server', value: 'PPF.GAP1', link: 'http://www.google.com', order: 3 }
  ]
};

storiesOf('Overview', module)
  .add('Default', () => (
    <Overview { ...props } />
  ));
