module.exports = function() {
  return this.Widgets.RelatedItems = this.Widget.List.extend({
    root: '.related-items',
    itemSelector: 'li a',

    itemTitle: function(index) {
      return this.findAll(this.itemSelector).then(function(nodes) {
        // When.js and bluebird don't seem to work with webdriver.promise
        // so we use webdriver's map here
        return $.map(nodes, function(n) {
          return n.getInnerHtml();
        }).then(function(titles) {
          return titles[index];
        })
      });
    },

    getCount: function() {
      return this.findAll(".related-item").then(function(v){
        return v.length;
      });
    },

    clickItem: function(title) {
      return this.findAll(this.itemSelector).then(function(nodes) {
        return $.filter(nodes, function(n) {
          return n.getInnerHtml().then(function(t) {
            return title === t;
          });
        })
        .then(function(filtered) {
          return filtered[0].click();
        });
      });
    }
  });
};