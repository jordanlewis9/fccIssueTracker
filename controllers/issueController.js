var Issue = require("./../model/issueModel");

exports.createIssue = async (req, res, next) => {
  try {
    const newIssue = await Issue.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        issue: newIssue
      }
    });
  } catch (err) {
    console.log(err.name);
    res.status(400).json({
      message: err.name
    });
  }
};

exports.updateIssue = async (req, res, next) => {
  //Since _id is required, two or more fields are needed to send a successful update
  if (Object.keys(req.body).length <= 1) {
    res.status(400).json({
      failed: "no updated field sent"
    });
  }
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json({
      success: `successfully updated ${req.body._id}`,
      data: {
        data: updatedIssue
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      failed: `could not update ${req.body._id}`
    });
  }
};

exports.deleteIssue = async (req, res, next) => {
  console.log(req.body._id);
  if (!req.body._id) {
    res.status(400).json({
      failed: "_id error"
    });
  }
  try {
    const deletedIssue = await Issue.findByIdAndDelete(req.body._id);
    res.status(200).json({
      success: `deleted ${req.body._id}`
    });
  } catch (err) {
    res.status(400).json({
      failed: `could not delete ${req.body._id}`
    });
  }
};

exports.getIssue = async (req, res, next) => {
  try {
    console.log(req.query);
    // Since objects are a thing, need an array of keys to see if there is something in the query object
    if (Object.keys(req.query).length === 0) {
      const allIssues = await Issue.find();
      res.status(200).json({
        allIssues
      });
    } else {
      const filteredIssues = await Issue.find(req.query);
      res.status(200).json({
        filteredIssues
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed"
    });
  }
};
