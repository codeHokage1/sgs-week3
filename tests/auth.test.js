const app = require('../server');
const request = require('supertest');
const User = require('../models/User');


describe('Event Management API tests', () => {
    // describe('Auth Routes Tests', () => {
    //     test('POST /api/v1/auth/register should return a new user and send a main notification', async() => {
    //         const user ={
    //             "email": "farhanTest7@gmail.com",
    //             "password": "testpassword"
    //         }
    //         const {body, statusCode} = await request(app)
    //                                 .post('/api/v1/auth/register')
    //                                 .send(user)
            
    //         console.log(body);

    //         const teardown = await request(app).delete(`/api/v1/users/${body.newUser._id}`);
            
    //         expect(statusCode).toEqual(201);
    //         expect(body).toEqual(expect.objectContaining({
    //             message: 'User created successfully',
    //             emailInfo: 'Welcome email sent!',
    //             newUser: expect.any(Object)
    //         }))
    //     }, 30000)
    // })
})