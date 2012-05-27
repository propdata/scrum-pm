function nav_activate(elem_id) {
  // Deselect all primary navigation elements that have the class 'active'
  $.each($('[id^="pri_nav"].active'), function(e) {
    $(this).removeClass("active");
  });

  // Set the currently active element
  $(elem_id).addClass("active");
}

$(function(){
  window.Project = Backbone.Model.extend({
    urlRoot: API_PROJECTS
  });

  window.Projects = Backbone.Collection.extend({
    urlRoot: API_PROJECTS,
    model: Project, 

    maybeFetch: function(options){
      // Helper function to fetch only if this collection has not been fetched before.
      if(this._fetched){
        // If this has already been fetched, call the success, if it exists
        options.success && options.success();
        return;
      }

      // when the original success function completes mark this collection as fetched
      var self = this, successWrapper = function(success){
        return function(){
          self._fetched = true;
          success && success.apply(this, arguments);
        };
      };

      options.success = successWrapper(options.success);
      this.fetch(options);
    },

    getOrFetch: function(id, options){
      // Helper function to use this collection as a cache for models on the server
      var model = this.get(id);

      if(model){
        options.success && options.success(model);
        return;
      }

      model = new Project({
        resource_uri: id
      });

      model.fetch(options);
    }
  });

  window.ProjectView = Backbone.View.extend({
    tagName: 'tr',

    events: {
      'click .permalink': 'navigate'           
    },

    initialize: function(){
      this.model.bind('change', this.render, this);
    },

    navigate: function(e){
      this.trigger('navigate', this.model);
      e.preventDefault();
    },

    render: function(){
      var modeljson = this.model.toJSON();
      //modeljson.added = "foo"+modeljson.added;
      soy.renderElement($(this.el).get(0), spm.ui.project, modeljson);
      return this;
    }
  });

  window.DetailApp = Backbone.View.extend({
    events: {
      'click .home': 'home'
    },

    home: function(e){
      this.trigger('home');
      e.preventDefault();
    },

    render: function(){
      //$(this.el).html(ich.detailApp(this.model.toJSON()));
      console.log(this.model);
      return this;
    }                                        
  });

  window.InputView = Backbone.View.extend({
    events: {
      'click .tweet': 'createTweet',
      'keypress #message': 'createOnEnter'
    },

    createOnEnter: function(e){
      if((e.keyCode || e.which) == 13){
        this.createTweet();
        e.preventDefault();
      }
    },

    createTweet: function(){
      var message = this.$('#message').val();
      if(message){
        this.collection.create({
          message: message
        });
        this.$('#message').val('');
      }
    }
  });

  window.ListView = Backbone.View.extend({
    initialize: function(){
      _.bindAll(this, 'addOne', 'addAll');

      this.collection.bind('add', this.addOne);
      this.collection.bind('reset', this.addAll, this);
      this.views = [];
    },

    addAll: function(){
      this.views = [];
      this.collection.each(this.addOne);
    },

    addOne: function(tweet){
      var view = new ProjectView({
        model: tweet
      });
      $(this.el).prepend(view.render().el);
      this.views.push(view);
      view.bind('all', this.rethrow, this);
    },

    rethrow: function(){
      this.trigger.apply(this, arguments);
    }
  });

  window.ListApp = Backbone.View.extend({
    el: "#main",

    rethrow: function(){
      this.trigger.apply(this, arguments);
    },

    render: function(){
      nav_activate('#pri_nav_projects');
      soy.renderElement($(this.el).get(0), spm.ui.projects, {});
      var list = new ListView({
        collection: this.collection,
        el: this.$('#projects')
      });
      list.addAll();
      list.bind('all', this.rethrow, this);
      new InputView({
        collection: this.collection,
          el: this.$('#input')
      });
    }
  });

  window.AppRouter = Backbone.Router.extend({
    routes: {
      '': 'dashboard',
      'projects': 'list',
      'projects/:id': 'detail'
    },

    navigate_to: function(model){
      var path = (model && model.get('id') + '/') || '';
      this.navigate(path, true);
    },

    detail: function(){},

    list: function(){}
  });

  //var AppRouter = Backbone.Router.extend({
  //  routes: {
  //    "": "dashboard",
  //    "projects": "projects"
  //  },

  //  dashboard: function() {
  //    var v = {
  //      'current_sprint': {
  //        'ends_in_days': 4
  //      },
  //      'tickets': {
  //        'closed': Math.floor((Math.random()*100)+1)
  //      }
  //    };
  //    nav_activate('#pri_nav_dashboard');
  //    soy.renderElement($('#main').get(0), spm.ui.dashboard, v);
  //  },

  //  projects: function() {
  //    var p = {
  //      'projects': [
  //        {
  //          'name': 'Project 1'
  //        },
  //        {
  //          'name': 'Project 2'
  //        }
  //      ]
  //    };
  //    nav_activate('#pri_nav_projects');
  //    soy.renderElement($('#main').get(0), spm.ui.projects, p);
  //  }
  //});
  //var app = new AppRouter();

  window.app = window.app || {};
  app.router = new AppRouter();
  app.projects = new Projects();
  app.list = new ListApp({
    el: $("#main"),
    collection: app.projects
  });
  app.detail = new DetailApp({
    el: $("#main")
  });
  app.router.bind('route:list', function(){
    app.projects.maybeFetch({
      success: _.bind(app.list.render, app.list)                
    });
  });
  app.router.bind('route:detail', function(id){
    app.projects.getOrFetch(app.projects.urlRoot + id + '/', {
      success: function(model){
        app.detail.model = model;
        app.detail.render();                    
      }
    });
  });

  app.list.bind('navigate', app.router.navigate_to, app.router);
  app.detail.bind('home', app.router.navigate_to, app.router);
  //Backbone.history.start({
  //    pushState: true, 
  //    silent: app.loaded
  //});
  Backbone.history.start();
});
