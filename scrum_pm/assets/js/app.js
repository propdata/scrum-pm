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
      nav_activate('#pri_nav_dashboard');
      var v = {
        'current_sprint': {
          'ends_in_days': 4
        },
        'tickets': {
          'closed': Math.floor((Math.random()*100)+1)
        }
      }
      $('#main').html($("#tmpl_dashboard").tmpl(v));
    },

    projects: function() {
      nav_activate('#pri_nav_projects');
      $('#main').html($("#tmpl_projects").tmpl());
    }
  });

  var app = new AppRouter();
  Backbone.history.start();
});
