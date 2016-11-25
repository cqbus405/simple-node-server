import path from 'path'

export default function(app, controllers) {
	app.get('/', function(req, res, next) {
	return res.sendFile(path.resolve(__dirname, '../../public/html/index.html'))
})

	app.get('/user/list', controllers.user.getUsers)
}