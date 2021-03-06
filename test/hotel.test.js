const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const testPayload = require('./payloadTest')

let idHotel

describe('TEST POST Hotel /', () => {
    it('Test post hotel success', async (done) => {
        const payload = testPayload
        const res = await request.post('/').send(payload)
        idHotel = res.body._id
        expect(res.status).toBe(201)
        expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            room_type: expect.any(Array),
            facilities: expect.any(Array)
        }))
        done()
    })
    it('Test post hotel failed', async (done) => {
        const payload = null
        const res = await request.post('/').send(payload)
        expect(res.status).toBe(400)
        expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
        done()
    })
})

describe('Test GET Hotel /', () => {
    it('Test get all hotels', async (done) => {
        const res = await request.get("/")
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                _id: expect.any(String),
                name: expect.any(String),
                room_type: expect.any(Array),
                facilities: expect.any(Array)
            })
        ]))
        done()
    })
})

describe('Test GET Hotel By ID /:id', () => {
    it('Test get hotel by ID success', async (done) => {
        let id = `${idHotel}`
        const res = await request.get(`/${id}`)
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            room_type: expect.any(Array),
            facilities: expect.any(Array)
        }))
        done()
    })

    it('Test get hotel by ID failed, wrong ID', async (done) => {
        const id = '123456abcdef'
        const res = await request.get(`/${id}`)
        expect(res.status).toBe(404)
        expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
        done()
    })

    it('Test get hotel by ID failed, no ID', async (done) => {
        const id = null
        const res = await request.get(`/${id}`)
        expect(res.status).toBe(500)
        expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
        done()
    })
})


describe('TEST PUT Hotel /:id', () => {
    it('Test PUT hotel sucess', async (done) => {
        let id = `${idHotel}`
        const payload = testPayload
        const res = await request.put(`/${id}`).send(payload)
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            room_type: expect.any(Array),
            facilities: expect.any(Array)
        }))
        done()
    })

    it('Test PUT hotel failed, invalid ID', async (done) => {
        let id = '123456abcdef'
        const payload = testPayload
        const res = await request.put(`/${id}`).send(payload)
        expect(res.status).toBe(404)
        expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
        done()
    })

    it('Test PUT hotel failed, no ID', async (done) => {
        let id = null
        const payload = testPayload
        const res = await request.put(`/${id}`).send(payload)
        expect(res.status).toBe(500)
        expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
        done()
    })
})

describe('Test DELETE hotel /:id', () => {
    it('Test DELETE hotel success', async (done) => {
        let id = `${idHotel}`
        const res = await request.delete(`/${id}`)
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            room_type: expect.any(Array),
            facilities: expect.any(Array)
        }))
        done()
    })

    it('Test DELETE hotel failed, invalid ID', async (done) => {
        let id = '123456abcdef'
        const res = await request.delete(`/${id}`)
        expect(res.status).toBe(404)
        expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
        done()
    })

    it('Test DELETE hotel, no ID', async (done) => {
        let id = null
        const res = await request.delete(`/${id}`)
        expect(res.status).toBe(500)
        expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
        done()
    })
})

describe('Test Send Mail use Nodemailer', () => {
    it('Send Email Success', async (done) => {
        const testemail = "vee.qii@gmail.com"
        const res = await request.post("/bookroom").send({emailAddress : testemail})
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
        done()
    },20000)
})