const request = require('supertest');
const server = require('../api/server');

describe('server.js endpoints', () => {
    describe('GET /', () => {
        it('should return 200 ok, server is running', async ()=> {
            const response = await request(server).get('/')
            expect(response.status).toBe(200);
        })
    })

    describe('POST /register', () => {

        it(' should return 201 if username & password in body', async () => {
            return request(server)
                .post('/api/auth/register')
                .send({ 
                    "username": "kyle1000",
                    "password": "kyle1000"
                })
                .expect(201);
        });

        it(' should return 500 if username & password NOT in body', async () => {
            return request(server)
                .post('/api/auth/register')
                .send({ 
                    "username": "kyle2",                    
                })
                .expect(500);
        })
    })

        describe('POST /login', () => {
            it('should return JSON object', () => {
                return request(server)
                .post('/api/auth/login')
                .send({
                    "username": "kyle",
                    "password": "kyle"
                })
                .then(res => {
                     expect(res.type).toMatch(/json/i);
                })
               
            })
        

            it(' should return 401 if username doesnt exist', async () => {
                return request(server)
                    .post('/api/auth/login')
                    .send({ 
                        "username": "notanuser",
                        "password": "notapassword"
                    })
                    .expect(401);
            });        

        });

        describe('GET /api/jokes', () => {
            it(' should return 401 if not logged in', async () => {
                return request(server)
                    .get('/api/jokes')                    
                    .expect(401);
            })

            it(' should return 200 when logged in', async () => {
                return request(server)
                    .get('/api/jokes')
                    .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1aXMiLCJpYXQiOjE1ODUzMjkzNDgsImV4cCI6MTU4NTMzMTE0OH0.wtyvwNqS3LNPdqsaLDnQE_7JURN9CyZBcz2h9mdXdEw')             
                    .expect(200);
            })
        });

})
    




