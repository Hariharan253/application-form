const express = require('express');
const router = express.Router();

const adminApplicationFormController = require('../controller/admin-application-form');

router.get('/application-form', adminApplicationFormController.getUsers);

module.exports = router;