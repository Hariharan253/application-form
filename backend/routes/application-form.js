const express = require('express');
const router = express.Router();

const ApplicationFormController = require('../controller/application-form');

router.post("/post", ApplicationFormController.createApplicationForm);

router.get("/", ApplicationFormController.getApplicationForm);

module.exports = router;