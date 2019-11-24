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
