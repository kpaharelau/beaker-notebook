module.exports = function(app) {
  var PublicationsController = app.Controllers.PublicationsController;

  app.get('/api/publications', PublicationsController.index);
  app.get('/api/publications/:id', PublicationsController.get);
  app.del('/api/publications/:id', PublicationsController.destroy);
  app.post('/api/publications', PublicationsController.create);
};