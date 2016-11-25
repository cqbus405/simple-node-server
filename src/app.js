import index from './lib/index'

index((err, result) => {
	if (err) {
		console.log(err)
	}

	console.log('server is running @ port ' + result.port + ' ' + result.mode)
})