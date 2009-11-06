Options = function(sammy) { with(sammy) {
  get('#/options/new', function() { with(this) {
    var option = new Option(params);
    alert(option);
    var view = new OptionView(option);
    
    partial('templates/options/new.mustache', view, function(html) {
      $('#add_option').prev('p').after(html);
      $('#spinner').hide();
    });
    return false;
  }});
}};