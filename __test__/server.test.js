//check explanation at https://zellwk.com/blog/endpoint-testing/

const app = require('../src/server/server.js')
const supertest = require('supertest')
const request = supertest(app)

// Example from URL above to check if this is working
describe('Test functionality', () => {
    jest.setTimeout(8000);
    test('Gets the test endpoint', async done => {
        const res = await request.get('/test')
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('pass!')
    })
})

