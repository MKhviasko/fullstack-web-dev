const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    }, {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save)
    await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
    const response = await await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned bloges', async () => {
    const response = await api.get('/api/blogs')
    const authors = response.body.map(r => r.author)
    expect(authors).toContain(
        'Edsger W. Dijkstra'
    )
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('the first blog is about Michael Chan', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].author).toBe('Michael Chan')
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Test',
        author: 'Author test',
        url: 'http://test',
        likes: 3
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(authors).toContain(
        'Author test'
    )
})

afterAll(async () => {
    await mongoose.connection.close()
})