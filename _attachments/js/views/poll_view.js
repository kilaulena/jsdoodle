PollView = function(poll) {
  this.poll = poll;
}

PollView.prototype = {
  _id: function() {
    return this.poll._id;
  },
  title: function() {
    return this.poll.title;
  },
  options: function() {
    return [this.poll.option1, this.poll.option2, this.poll.option3];
  }
}
