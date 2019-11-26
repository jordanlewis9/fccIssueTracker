var mongoose = require("mongoose");

var issueSchema = mongoose.Schema({
  issue_title: {
    type: String,
    required: [true, "Please fill out a title for your issue."]
  },
  issue_text: {
    type: String,
    required: [true, "Please describe your issue."]
  },
  created_by: {
    type: String,
    required: [true, "Please tell us your name."]
  },
  assigned_to: String,
  status_text: String,
  created_on: Date,
  updated_on: Date,
  open: Boolean
});

//places timestamps on the time keeping options, and true on the open status
issueSchema.pre("save", function(next) {
  this.created_on = Date.now();
  this.updated_on = Date.now();
  this.open = true;
  next();
});

//update the updated_on field before the findOneAndUpdate query runs
issueSchema.pre("findOneAndUpdate", function(next) {
  console.log("updated_on");
  this.set({ updated_on: Date.now() });
  next();
});

var Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
