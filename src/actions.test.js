import * as actions from './actions';

import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
 } from './constants';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import moxios from 'moxios';

const mockData = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
        }
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
        }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
        }
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
            "lat": "-68.6102",
            "lng": "-47.0653"
        }
        },
        "phone": "1-463-123-4447",
        "website": "ramiro.info",
        "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
        }
    }
];

describe('actions', () => {

    const mockStore = configureMockStore([thunkMiddleware]);

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });
    
    it('should create an action to search robots', () => {
        const text = 'wooo';
        const expectedAction = {
            type: CHANGE_SEARCHFIELD,
            payload: text
        };

        expect(actions.setSearchField(text)).toEqual(expectedAction);
    });

    it('handles requesting robots API', () => {
        let actionState;

        expect.assertions(2);
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: mockData
            });
        });
        
        const store = mockStore();
        const promise = store.dispatch( actions.requestRobots() )
            .then((response) => {
                // return of async actions
                const expectedSuccessAction = {
                    type: REQUEST_ROBOTS_SUCCESS,
                    payload: response.data
                };
                actionState = store.getActions();
                expect(actionState[1]).toEqual(expectedSuccessAction);
            });
        

        const expectedPendingAction = {
            type: REQUEST_ROBOTS_PENDING
        };
        actionState = store.getActions();
        expect(actionState[0]).toEqual(expectedPendingAction);

        return promise;
    });

    it('handles error from robots API', () => {
        let actionState;

        expect.assertions(2);

        const mockError = {
            status: 400,
            response: { message: 'invalid data' }
        };

        const expectedErrorAction = {
            type: REQUEST_ROBOTS_FAILED,
            payload: mockError
        };
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject(mockError);
        });
        
        const store = mockStore();
        const promise = store.dispatch( actions.requestRobots() )
            .then((response) => {
                // return of async actions
                actionState = store.getActions();
                expect(actionState[1]).toEqual(expectedErrorAction);
            });
        

        const expectedPendingAction = {
            type: REQUEST_ROBOTS_PENDING
        };
        actionState = store.getActions();
        expect(actionState[0]).toEqual(expectedPendingAction);

        return promise;
    });

});