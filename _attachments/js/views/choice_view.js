ChoiceView = function(choice) {
  this.choice = choice;
}

ChoiceView.prototype = {
  _id: function() {
    return this.choice._id;
  },
  text: function() {
    return this.choice.text;
  },
  poll_id: function() {
    return this.choice.poll_id;
  },
  number: function() {
    return $('.choice').length + 1;
  }
}