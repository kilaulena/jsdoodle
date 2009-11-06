OptionView = function(option) {
  this.option = option;
}

OptionView.prototype = {
  _id: function() {
    return this.option._id;
  },
  text: function() {
    return this.option.text;
  },
  poll_id: function() {
    return this.option.poll_id;
  },
  number: function() {
    return $('.option').length + 1;
  }
}