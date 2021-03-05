const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async() => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('making a POST request to /api/blogs creates a new blog post', async() => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Anon',
        url: 'fullstackopen.com',
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('async/await simplifies making async calls')
})

test('likes default to zero', async() => {
    const blogWithNoLikes = {
        title: 'testing',
        author: 'me',
        url: 'localhost'
    }

    await api
        .post('/api/blogs')
        .send(blogWithNoLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(b => b.likes)
    expect(contents[contents.length - 1]).toEqual(0)
})

test('blog without url and title returns 400', async() => {
    const badBlog = {
        url: 'https://developer.mozilla.org'
    }

    await api
        .post('/api/blogs')
        .send(badBlog)
        .expect(400)
})

test('a blog is deleted (with valid id)', async() => {
    const id = "600b7886a911df1a97dbc23f"
    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)
})

test('a blog is updated', async() => {
    const id = "600b7886a911df1a97dbc23f"

    const updatedBlog = {
        likes: 1000
    }

    await api
        .put(`/api/blogs/${id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
	mongoose.connection.close()
})
