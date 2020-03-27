const request = require('supertest');
const server = require('../api/server');

describe('server.js endpoints', () => {
    describe('GET /', () => {
        it('should return 200 ok, server is running', async ()=> {
            const response = await request(server).get('/')
            expect(response.status).toBe(200);
        })
    }
    )


        it(' should return 201 if username & password in body', async () => {
            return request(server)
                .post('/api/auth/register')
                .send({ 
                    "username": "kyle1",
                    "password": "kyle1"
                })
                .expect(201);
        });

        it(' should return 500 if username & password NOT in body', async () => {
            return request(server)
                .post('/api/auth/register')
                .send({ 
                    "username": "kyle",                    
                })
                .expect(500);
        })
    });
    




