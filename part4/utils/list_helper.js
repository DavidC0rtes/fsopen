const dummy = (blogs) => { return 1 }

const totalLikes = (blogs) => {
	const reducer = (sum, blog) => {
		return sum + blog.likes
	}

	return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
	const sortByLikes = blogs.sort((a,b) => b.likes - a.likes)
	const {_id, url, __v, ...toReturn} = sortByLikes[0]
	return toReturn
}

const mostBlogs = (blogs) => {
	const authors = blogs.map(blog => blog.author)
	const unique = [...new Set(authors)]
	const toReturn = []
	
	unique.forEach((author) => {
		const ocurrences = authors.filter(v => author === v).length
		toReturn.push({"author":author, "blogs":ocurrences})
	})
	
	toReturn.sort((a,b) => b.blogs - a.blogs)
	return toReturn[0]
}

const mostLikes = (blogs) => {
	const authors = [ ...new Set(blogs.map(blog => blog.author)) ]	
	const toReturn = []

	authors.forEach((author) => {
		const authoredBlogs = blogs.filter(blog => blog.author === author)
		toReturn.push(
			{
				"author": author, 
				"likes": totalLikes(authoredBlogs)
			})
	}) 
	toReturn.sort((a,b) => b.likes - a.likes)
	return toReturn[0]
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
