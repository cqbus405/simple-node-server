module.exports = function(orm, db) {
  const Product = db.define('product', {
    id: {
      type: 'serial',
      required: true
    },
    name: {
      type: 'text',
      required: true
    },
    description: {
      type: 'text',
      required: true
    },
    videoUrl: {
      type: 'text',
      mapsTo: 'video_url'
    },
    pictureUrl: {
      type: 'text',
      mapsTo: 'picture_url'
    },
    specification: {
      type: 'text',
      required: true
    },
    coverPicture: {
      type: 'text',
      mapsTo: 'cover_picture',
      required: true
    },
    specificationPicture: {
      type: 'text',
      mapsTo: 'specification_picture'
    },
    created: {
      type: 'date'
    },
    modified: {
      type: 'date'
    }
  }, {
    cache: false,
    timestamp: true
  })
}