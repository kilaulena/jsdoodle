var couchapp = null;
$.CouchApp(function(app) {
  couchapp = app;
});
var content = $('#content');

var sammy = new Sammy.Application(function() { with(this) {
  element_selector = '#content';
  use(Sammy.Mustache);

  get('#/', function(){with(this) {
    redirect('#/polls');
    return false;
  }});
  
  helpers({
    new_object: function(name) {
      var plural_name = name.toLowerCase() + 's';
      this.partial('./templates/' + plural_name + '/new.mustache');
      $('#spinner').hide();
    },
    create_object: function(name, params, options) {
      options = options || {};
      var context = this;
      var _prototype = eval(name);
      var object = new _prototype(params);
      
      if(object.valid()) {
        couchapp.db.saveDoc(object.to_json(), {
          success: function(res) {
            trigger('notice', {message: (options.message || (name + ' saved.'))});
            if(options.success) {
              options.success(object);
            }            
            context.redirect(options.redirect || ('#/' + name.toLowerCase() + 's/' + res.id));
            $('#spinner').hide();
          },
          error: function(response_code, res) {
            trigger('error', {message: 'Error saving ' + name + ': ' + res});
          }
        });
      } else {
        trigger('error', {message: object.errors.join(", ")});
      };
      return false;
    },
    list_objects: function(name, view_name, params) {
      var context = this;
      couchapp.design.view(view_name, {
         include_docs: true,
         success: function(json) {
           var plural_name = name.toLowerCase() + 's';
           var view = {};
           view[plural_name] = json['rows'].map(function(row) {return row.doc});
           context.partial('./templates/' + plural_name + '/index.mustache', view);
           $('#spinner').hide();
         }
       });
    },
    load_object: function(name, params) {
      var context = this;
      couchapp.db.openDoc(params['id'], {
        success: function(doc) {
          var _prototype = eval(name);
          var view_prototype = eval(name + 'View');
          var view = new view_prototype(new _prototype(doc));
          context.partial('./templates/' + name.toLowerCase() + 's/show.mustache', view);
          $('#spinner').hide();
        },
        error: function() {
          context.notFound();
        }
      });
    },
    destroy_object: function(name, params) {
      var context = this;
      couchapp.db.openDoc(params['id'], {
        success: function(doc) {
          couchapp.db.removeDoc(doc, {
            success: function(doc) {
              context.redirect('#/' + name.toLowerCase() + 's');
              $('#spinner').hide();
            }
          });      
        },
        error: function() {
          context.notFound();
        }        
      });
    }
  });
  
  Polls(this);
  
  before(function() {
    $('#error').html('').hide();
    $('#notice').html('').hide();
    $('#spinner').show();
  });
  
  get('#/', function() {});
  
  bind('error', function(e, data) { with(this) {
    $('#error').html(data.message).show();
  }});
  
  bind('notice', function(e, data) { with(this) {
    $('#notice').html(data.message).show();
  }});
}});

$(function() {
  sammy.run('#/');

  // without this hack cucumber/culerity doesn't recognize the changed hash
  $('a').live('click', function() {
    var hash = $(this).attr('href').match(/#.+/)[0];
    if(hash) {
      sammy.runRoute('get', hash);
    };
    return false;
  });
});
