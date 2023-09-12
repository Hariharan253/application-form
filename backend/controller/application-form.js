const express = require('express');



const ApplicationForm = require('../models/application-form');

exports.createApplicationForm = ((req, res, next) => {

    const applicationForm = new ApplicationForm({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        email_address: req.body.email,
        phone: req.body.phone
    });

    applicationForm.save()
    .then((response) => {
        console.log(response);
        return res.status(201).json({
            "response": req.body
        });
    })
    .catch(err => {
         console.log("Email Error: ", err);
        return res.status(400).json({
            "email_error": err
        });
    })
    ;
});

exports.getApplicationForm = ((req, res, next) => {
    console.log("get Form");
    return res.status(200).json({
        "message": "Get Application Form"
    })
});