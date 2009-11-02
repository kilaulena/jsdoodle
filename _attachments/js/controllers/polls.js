Polls = function(sammy) { with(sammy) {
  get('#/polls/new', function() { with(this) {        
    new_object('Poll');
  }});
  
  post('#/polls', function() { with(this) {
    // console.log('params in post polls: ' + params);
    create_object('Poll', params, {message: 'Poll successfully created'});
  }});
  
  get('#/polls/:id', function() { with(this) {
    load_object('Poll', params);
  }});
  
  get('#/polls', function() { with(this) {
    list_objects('Poll', 'polls', params);
  }});
  
  
  post('#/polls/:id/votes', function() { with(this) {
    var context = this;
    
    couchapp.db.openDoc(params['id'], {
      success: function(doc) {
        var poll = new Poll(doc);
        trigger('notice', {message: 'Thank you for your vote!'});
        // context.mark_false_answers(cloze.correct_answers(context.params['answers']), '#blank{{i}}');
        // $('#submit').hide();
      }
    });
    return false;
  }});
  
}};