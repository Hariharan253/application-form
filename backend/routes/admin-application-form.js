const express = require('express');
const router = express.Router();

const adminApplicationFormController = require('../controller/admin-application-form');

router.get('/application-form', adminApplicationFormController.getUsers);

router.delete('/delete/application-form/:id', adminApplicationFormController.deleteApplicationFormById);

module.exports = router;