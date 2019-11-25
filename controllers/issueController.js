var Issue = require("./../model/issueModel");

exports.createIssue = async (req, res, next) => {
  const newIssue = await Issue.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      issue: newIssue
    }
  });
};

exports.updateIssue = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length <= 1) {
      res.status(400).json({
        failed: "no updated field sent"
      });
    }
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
