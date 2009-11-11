Choice = function(attributes) {
  this._id = attributes._id || new UUID().toString();
  this._rev = attributes._rev;
  this.text = attributes.text;
  this.poll_id = attributes.poll_id;
}

Choice.prototype = {
  valid: function() {
    return true;
  },
  to_json: function() {
    return {
      _id: this._id,
      _rev: this._rev,
      type: 'Choice',
      text: this.text,
      poll_id: this.poll_id
    };
  }
};