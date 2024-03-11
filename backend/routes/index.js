const express =require('express');
const userRouter =require('./user');
const jobRouter =require('./job');
const applicationRouter =require('./application');
const router =express.Router();

router.use('/user',userRouter);
router.use('/job',jobRouter);
router.use('/application', applicationRouter);


module.exports =router;