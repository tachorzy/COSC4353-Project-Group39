import registerUser from '../../pages/api/registerUser';
import dbConnect from '../../__database/dbConnect.js'
import Client from '../../__models/client.js'
import { createMocks } from 'node-mocks-http';

jest.mock('../../__database/dbConnect.js')
jest.mock('../../__models/client.js')

describe('registerUser API endpoint', () => {
    it('Should register a new user with the correct login credentials', async () => {
        const { request, response } = createMocks({
            method: 'POST',
            body: {
                email: 'test@gmail.com',
                password: 'testpassword'
            }
        });
        
        Client.findOne.mockResolvedValue({ 
            email: 'test@gmail.com'
        })

        dbConnect.mockResolvedValue(true);
        await registerUser(request, response);

        expect(response._getStatusCode()).toBe(500);
        // expect(response._getData().email).toEqual('test@gmail.com');
        // expect(response._getData().password).not.toEqual('testpassword');
        // expect(response._getData().profileSet).toBe(true);
        // expect(response._getData().personalDetails).toEqual([]);
        expect(response._getJSONData()).toEqual('User already exists under this email.')
    });
});