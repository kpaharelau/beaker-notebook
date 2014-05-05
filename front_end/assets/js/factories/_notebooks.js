;(function(angular, app) {
  app.factory('NotebooksFactory', ["Restangular", function(Restangular) {
    var R = Restangular;

    function project(id) {
      return R.one('projects', id);
    }

    return {
      open: function(projectId, notebookName) {
        return R.all('open_notebooks').post({
          projectId: projectId,
          notebookName: notebookName
        });
      },

      close: function(projectId, notebookName) {
        return R.all('open_notebooks').remove({
          projectId: projectId,
          notebookName: notebookName
        });
      },

      getNotebook: function(projectId, name) {
        return project(projectId).one('notebooks', name).get();
      },

      getOpenNotebooks: function() {
        return R.all('open_notebooks').getList();
      },

      getNotebooks: function(projectId) {
        return project(projectId).getList('notebooks').then(function(notebooks) {
          var updates = _.map(notebooks, function(notebook) {
            return new Date(notebook.lastModified);
          });

          var numCommits = _.reduce(notebooks, function(sum, notebook) {
            return sum + notebook.numCommits;
          }, 0);

          return {
            list: notebooks,
            numCommits: numCommits,
            lastUpdated: Math.max.apply(null, updates)
          };
        });
      }
    };
  }]);
})(angular, window.bunsen);