import {shallow, mount, render} from 'enzyme';
import React from 'react';
import Card from './Card';

it('expect to render Card component', () => {
    expect(render(<Card />)).toMatchSnapshot();
});
