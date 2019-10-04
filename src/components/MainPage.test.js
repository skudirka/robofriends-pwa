import {shallow, mount, render} from 'enzyme';
import React from 'react';
import MainPage from './MainPage';

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false
    };
    wrapper = shallow(<MainPage {...mockProps} />);
});

it('renders MainPage without crashing and filter no robots', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().filterRobots()).toEqual([]);
});

it('filters robots correctly with one match', () => {
    const mockProps2 = {
        onRequestRobots: jest.fn(),
        robots: [
            {
                id: 3,
                name: 'John',
                email: 'john@gmail.com'
            }
        ],
        searchField: 'john',
        isPending: true
    };
    const wrapper2 = shallow(<MainPage {...mockProps2} />);
    
    expect(wrapper2.instance().filterRobots()).toEqual([
        {
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }
    ]);
});


it('filters robots correctly with no match found', () => {
    const mockProps3 = {
        onRequestRobots: jest.fn(),
        robots: [
            {
                id: 3,
                name: 'John',
                email: 'john@gmail.com'
            }
        ],
        searchField: 'a',
        isPending: false
    };
    const wrapper3 = shallow(<MainPage {...mockProps3} />);
    
    expect(wrapper3.instance().filterRobots()).toEqual([]);
})