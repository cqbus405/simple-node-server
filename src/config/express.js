import bodyParser from 'body-parser'

export default function(app, express) {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
		extended: true
	}))
	app.use('/static', express.static('public'))
}