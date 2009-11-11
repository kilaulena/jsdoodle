Poll = function(attributes) {
  this._id = attributes._id;
  this._rev = attributes._rev;
  this.title = attributes.title;
}

Poll.prototype = {
  valid: function() {
    // this.errors = [];
    // if(!this._id) {
    //   this.errors.push("You need to enter a username");
    // };
    // return this.errors.length === 0;
    return true;
  },
  to_json: function() {
    return {
      _id: this._id,
      _rev: this._rev,
      type: 'Poll',
      title: this.title,
    };
  }
};