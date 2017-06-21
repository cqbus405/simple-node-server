export const getAppEnvironment = (req, res) => {
  res.json({
    'env': process.env.NODE_ENV
  })
}

export const getAppSettings = (req, res) => {
  res.json({
    settings: req.settings
  })
}

export const esTest = (req, res) => {
  req.esClient.ping({
    // ping usually has a 3000ms timeout 
    requestTimeout: 1000
  }, function(error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      res.send('<h1>all is well</h1>')
    }
  });
}