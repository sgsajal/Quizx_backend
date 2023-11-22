const Report =require("../models/report");

const getReport = async (req, res, next) => {
  try {
    let report;
    if (!!req.params.reportId) {
      const reportId = req.params.reportId;
      report = await Report.findById(req.params.reportId);

      if(!report) {
        const err = new Error("No report found!");
        err.statusCode = 404;
        throw err;
      }

      if (report.userId.toString() !== req.userId) {
        const err = new Error("You are not allowed");
        err.statusCode = 405;
        throw err;
      }
    } else {
      report = await Report.find({ userId: req.userId });
    }

    if (!report) {
      const err = new ProjectError("Report not found");
      err.statusCode = 404;
      throw err;
    }

    let resp = {
      status: "success",
      message: "Report!",
      data: report,
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

const deleteReport = async (req, res, next) => {
  try {
      let report;
      const reportId = req.params.reportId;
      console.log(req.params)
      console.log(reportId)
      report = await Report.findById(req.params.reportId);

      if(!report) {
        const err = new Error("No report found!");
        err.statusCode = 404;
        throw err;
      }

      if (report.userId.toString() !== req.userId) {
        const err = new Error("You are not allowed");
        err.statusCode = 405;
        throw err;
      }
      await report.deleteOne({_id:reportId});
      res.status(200).json({ message: 'Resource deleted successfully' });
    }
    catch (error) {
    next(error);
  }
};


module.exports= { getReport,deleteReport };