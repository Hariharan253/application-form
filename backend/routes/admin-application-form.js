const express = require('express');
const router = express.Router();

const adminApplicationFormController = require('../controller/admin-application-form');
const checkAuth = require('../middleware/check-auth');

router.get('/application-form', checkAuth, adminApplicationFormController.getUsers);

router.get('/application-form/get-application-form-by-id/:id', checkAuth, adminApplicationFormController.getUserApplicationFormById);

router.put('/update/application-form/:id', checkAuth, adminApplicationFormController.updateApplicationFormById);

router.delete('/delete/application-form/:id', checkAuth, adminApplicationFormController.deleteApplicationFormById);


module.exports = router;