import {shallow, mount, render} from 'enzyme';
import React from 'react';
import CardList from './CardList';

it('expect to render CardList component', () => {
    const mockRobots = [
        {
            id: 1,
            name: "john Snow",
            username: 'JohnJohn',
            email: 'john@gmail.com'
        }
    ];
    expect(render(<CardList robots={mockRobots} />)).toMatchSnapshot();
});
