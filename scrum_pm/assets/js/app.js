function nav_activate(elem_id) {
  // Deselect all primary navigation elements that have the class 'active'
  $.each($('[id^="pri_nav"].active'), function(e) {
    $(this).removeClass("active");
  });

  // Set the currently active element
  $(elem_id).addClass("active");
}

$(function(){
  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "dashboard",
      "projects": "projects"
    },

    dashboard: function() {
      var v = {
        'current_sprint': {
          'ends_in_days': 4
        },
        'tickets': {
          'closed': Math.floor((Math.random()*100)+1)
        }
      };
      nav_activate('#pri_nav_dashboard');
      soy.renderElement($('#main').get(0), spm.ui.dashboard, v);
    },

    projects: function() {
      var p = {
        'projects': [
          {
            'name': 'Project 1'
          },
          {
            'name': 'Project 2'
          }
        ]
      };
      nav_activate('#pri_nav_projects');
      soy.renderElement($('#main').get(0), spm.ui.projects, p);
    }
  });

  var app = new AppRouter();
  Backbone.history.start();
});
