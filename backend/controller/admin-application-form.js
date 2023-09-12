const ApplicationForm = require("../models/application-form");

exports.getUsers = (req, res, next) => {
  console.log("Query: ", req.query.offset);
  var offset = 1;
  offset = +req.query.offset;
  var limit = 10;
  limit = +req.query.limit;

  const getUserQuery = ApplicationForm.find();
  getUserQuery.skip(offset * (limit - 1)).limit(limit);

  var users = {};
  getUserQuery
    .then((document) => {
      users = document;
      return ApplicationForm.count();
    })
    .then((count) => {
      res.status(200).json({
        count: count,
        message: "Users fetched Successfully",
        users: users,
      });
    })
    .catch((err) => {
        console.log('Error: ', err);
      return res.status(500).json({
        message: err,
      });
    });
};
