PollView = function(poll) {
  this.poll = poll;
}

PollView.prototype = {
  _id: function() {
    return this.poll._id;
  },
  title: function() {
    return this.poll.title;
  }
}
