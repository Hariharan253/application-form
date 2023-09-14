const ApplicationForm = require("../models/application-form");

exports.getUsers = (req, res, next) => {   
  var offset = 1;
  offset = +req.query.offset;
  var limit = 10;
  limit = +req.query.limit;

  const getUserQuery = ApplicationForm.find();
  getUserQuery.skip(offset).limit(limit);

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
        offset: +req.query.offset
      });
    })
    .catch((err) => {
        console.log('Error: ', err);
      return res.status(500).json({
        message: err,
      });
    });
}


exports.deleteApplicationFormById = (req, res, next) => {
  

  try {
    ApplicationForm.deleteOne({_id: req.params.id})
    .then(response => {
      if(response.deletedCount === 1) {
        return res.status(200).json({
          message: "Application Form Deleted Successfully",
          isDeleted: true
        });
      }
      else {
        return res.status(200).json({
          message: "Unable to delete User",
          err: response,
          isDeleted: false
        });
      }
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: error 
    })
  }

};