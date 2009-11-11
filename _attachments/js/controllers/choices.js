Choices = function(sammy) { with(sammy) {
  get('#/choices/new', function() { with(this) {
	var choice = new Choice(params);
    var view = new ChoiceView(choice);

    partial('./templates/choices/new.mustache', view, function(html) {
      $('#add_choice').prev('p').after(html);
      $('#spinner').hide();
    });
    return false;
  }});
}};