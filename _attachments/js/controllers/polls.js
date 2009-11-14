Polls = function(sammy) { with(sammy) {
  get('#/polls/new', function() { with(this) {        
    new_object('Poll');
  }});
  
  get('#/polls/new_choice', function() { with(this) {
    partial('./templates/choices/new.mustache', new ChoiceView(), function(html) {
      $('#add_choice').prev('p').after(html);
      $('#spinner').hide();
    });
    return false;
  }});
  
  post('#/polls', function() { with(this) {
    create_object('Poll', params, {message: 'Poll successfully created'});
  }});
  
  get('#/polls/:id', function() { with(this) {
    // console.log('show');
    load_object('Poll', params);
  }});
  
  get('#/polls', function() { with(this) {
    list_objects('Poll', 'polls', params);
  }});
  
  route('delete', '#/polls/:id', function() { with(this) {
    destroy_object('Poll', params);
  }});
  
  // post('#/polls/:id/votes', function() { with(this) {
  //   var context = this;
  //   
  //   couchapp.db.openDoc(params['id'], {
  //     success: function(doc) {
  //       var poll = new Poll(doc);
  //       trigger('notice', {message: 'Thank you for your vote!'});
  //       // context.mark_false_answers(cloze.correct_answers(context.params['answers']), '#blank{{i}}');
  //       // $('#submit').hide();
  //       $('#spinner').hide();
  //     }
  //   });
  //   return false;
  // }});
  
}};