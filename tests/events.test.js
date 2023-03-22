const app = require('../server');
const request = require('supertest');
const User = require('../models/User');


describe('Events Routes Tests', () => {
    test('GET /api/v1/events - Should return all events', async () => { 

        // login with an existing user
        const logIn = await request(app).post('/api/v1/auth/login').send({
            "email": "farhan1@gmail.com",
            "password": "test1234"
        })

        const {body, statusCode} = await request(app).get('/api/v1/events').set('Authorization', `Bearer ${logIn.body.jwt}`);

        expect(statusCode).toEqual(200);
        expect(body.length).toBeGreaterThan(0);
    })

    test('GET /api/v1/events/{eventId} - Should return the event with given id', async () => { 

        // login with an existing user
        const logIn = await request(app).post('/api/v1/auth/login').send({
            "email": "farhan1@gmail.com",
            "password": "test1234"
        })

        const response = await request(app).post('/api/v1/events').send({
            "name": "Test Event",
            "date": "04-12-2023",
            "location": "Kenya",
            "description":"Chilling"
          }).set('Authorization', `Bearer ${logIn.body.jwt}`);

        console.log(response.body.event._id)

        const {body, statusCode} = await request(app).get(`/api/v1/events/${response.body.event._id}`).set('Authorization', `Bearer ${logIn.body.jwt}`);

        const deletResponse = await request(app).delete(`/api/v1/events/${response.body.event._id}`).set('Authorization', `Bearer ${logIn.body.jwt}`);

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.any(Object));
    })
})
