Poll = function(attributes) {
  this._id = attributes._id;
  this._rev = attributes._rev;
  this.title = attributes.title;
  this.option1 = attributes.option1;
  this.option2 = attributes.option2;
  this.option3 = attributes.option3;
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
      option1: this.option1,
      option2: this.option2,
      option3: this.option3
    };
  }
};