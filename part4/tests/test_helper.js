const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: "Test",
		author: "David",
		url: "www.example.com",
		likes: 1
	},
	{
		title: "hola",
		author: "david",
		url: "www.example.org",
		likes: 10
	}
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, blogsInDb
}
