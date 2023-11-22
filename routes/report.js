const express=require("express");
const router=express.Router();
const {isAuthenticated}=require('../Middleware/isAuth');


const { getReport,deleteReport} =require ("../controller/report");

router.get("/:reportId", isAuthenticated, getReport);
router.get("/user/:userid", isAuthenticated, getReport);
router.delete("/:reportId",isAuthenticated,deleteReport);

module.exports= router;