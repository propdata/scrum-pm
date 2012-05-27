// This file was automatically generated from ui.soy.
// Please don't edit this file by hand.

if (typeof spm == 'undefined') { var spm = {}; }
if (typeof spm.ui == 'undefined') { spm.ui = {}; }


spm.ui.dashboard = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="hero-unit"><h1>Welcome, Greg!</h1><p>There are still <big>38</big> open stories in the current sprint backlog. <br/>You have closed <big>', soy.$$escapeHtml(opt_data.tickets['closed']), '</big> tickets towards the current sprint which ends in <big>', soy.$$escapeHtml(opt_data.current_sprint['ends_in_days']), '</big> days on <big>April 29</big>. <br/>Drill down into <a href="#projects">projects</a>, <a href="#projects">sprints</a>, <a href="#projects">backlogs</a> or <a href="#projects">reports</a>, or <a href="#sprint">jump right into your sprint</a>.</p><p><a class="btn btn-primary btn-large">Go to my sprint &raquo;</a></p></div><div class="row-fluid"><div class="span5"><div class="row-fluid"><div class="span12"><h2>Your Stats</h2><p><ul><li>Average velocity is <b>29</b> tickets per sprint</li><li>You are <b>above average</b> this sprint</li><li>You\'ve closed <b>7,623</b> tickets this year</li><li><b>67</b> closed tickets have been reopened</li></ul></p><p><a class="btn" href="#">View details &raquo;</a></p></div><!--/span--></div><div class="row-fluid"><div class="span12"><h2>Team Stats</h2><p><ul><li>Average velocity is <b>500</b> tickets per sprint</li><li>Team is <b>above average</b> over the past 3 mo.</li><li><b>76,234</b> tickets have been closed this year</li><li><b>367</b> closed tickets have been reopened</li></ul></p><p><a class="btn" href="#">View details &raquo;</a></p></div><!--/span--></div></div><div class="span7"><h2>Recent Activity</h2><p><dl class="dl-horizontal"><dt><span class="gray-sm">2h ago.</span></dt><dd><a href="#1">Greg A.</a> commented on Story <a href="#1">Database development</a></dd><dt><span class="gray-sm">8h ago.</span></dt><dd><a href="#1">Greg A.</a> accepted as Story <a href="#1">Task Number 2</a></dd><dt><span class="gray-sm">16h ago.</span></dt><dd><a href="#1">Greg A.</a> created Story <a href="#1">Task Number 2</a></dd><dt><span class="gray-sm">22h ago.</span></dt><dd><a href="#1">Greg A.</a> accepted as Story <a href="#1">Database development</a></dd><dt><span class="gray-sm">2d ago.</span></dt><dd><a href="#1">Nic W.</a> created Story <a href="#1">Database development</a></dd><dt><span class="gray-sm">1w ago.</span></dt><dd><a href="#1">Juan P.</a> commented on Story <a href="#1">Turn the thingie on</a></dd><dt><span class="gray-sm">1w ago.</span></dt><dd><a href="#1">Donovan B.</a> commented on Story <a href="#1">Turn the thingie off</a></dd><dt><span class="gray-sm">2w ago.</span></dt><dd><a href="#1">Muhammed A.</a> commented on Story <a href="#1">Turn the thingie on</a></dd><dt><span class="gray-sm">3w ago.</span></dt><dd><a href="#1">Greg A.</a> commented on Story <a href="#1">Turn the thingie off</a></dd></dl></p><p><a class="btn" href="#">View all activity &raquo;</a></p></div></div>');
  return opt_sb ? '' : output.toString();
};


spm.ui.projects = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class="breadcrumb"><li><a href="#">Dashboard</a> <span class="divider">/</span></li><li><a href="#projects">Projects</a> <span class="divider">/</span></li><li class="active">All Current Projects</li></ul><h1>Projects <small>All current projects.</small></h1><table class="table table-condensed"><thead><tr><th>ID</th><th>Created</th><th>Status</th><th>Project Name</th><th>Code</th><th class="a-right">Open Stories</th><th class="a-right">Closed Stories</th></tr></thead><tbody id="projects"></tbody></table>');
  return opt_sb ? '' : output.toString();
};


spm.ui.project = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<td>', soy.$$escapeHtml(opt_data.id), '</td><td>', soy.$$escapeHtml(opt_data.added), '</td><td>', soy.$$escapeHtml(opt_data.status), '</td><td><a href="#projects/', soy.$$escapeHtml(opt_data.id), '">', soy.$$escapeHtml(opt_data.name), '</a></td><td>', soy.$$escapeHtml(opt_data.code), '</td><td class="a-right">', soy.$$escapeHtml(opt_data.open_stories), '</td><td class="a-right">', soy.$$escapeHtml(opt_data.closed_stories), '</td>');
  return opt_sb ? '' : output.toString();
};
