const express = require('express');

const router =express.Router();


const { verifyLoginController }=require('../controller/login.controller');
router.post('/login',verifyLoginController);

module.exports =router;