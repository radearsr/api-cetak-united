const mssqlServices = require("../services/mssql/mssqlServices");
const parsingService = require("../services/parsing/parsingServices");
const exception = 

exports.historyTrxByTujuan = async (req, res) => {
  try {
    const {
      tujuan,
      start_date,
      end_date,
      per_page = 10,
      page = 1,
    } = req.body;
    console.log(JSON.stringify(req.body));
    const totalData = await mssqlServices.getTotalDataSelected(tujuan, start_date, end_date, per_page);
    const histories = await mssqlServices.getAllTrxByTujuanAndDate(tujuan, start_date, end_date, page, per_page);
    if (histories === "Not Found") {
      return res.json({
        status: "fail",
        message: "Data tidak ditemukan",
      });
    }
    const reformatHistories = parsingService.regenerateDataForAddRegex(histories);
    res.json({
      status: "success",
      total_page: totalData,
      data: reformatHistories,
    });
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("Timeout")) {
      res.statusCode = 500;
      return res.json({
        status: "error",
        message: "Request Timeout, silahkan coba beberapa saat lagi / hubungi cs untuk lebih lanjut.",
      });
    } else if (error.message.includes("KETERANGAN BERISI NULL")) {
      res.statusCode = 400;
      return res.json({
        status: "fail",
        message: "Data tidak lengkap, silahkan hubungi cs untuk mendapatkan bantuan.",
      });
    }
    res.json({
      status: "error",
      message: "Terjadi kegagalan pada server, check log..."
    });
    console.error(error);
  }
};

exports.printHistoryByKode = async (req, res) => {
  try {
    const { kodetrx } = req.body;
    console.log(JSON.stringify(kodetrx));
    const details = await mssqlServices.getTrxDetailsByKode(kodetrx);
    if (details.length < 1) {
      return res.json({
        status: "success",
        message: "ID tidak ditemukan, silahkan gunakan ID lain...",
      });
    }
    const reformatDetails = parsingService.regenerateDataForAddRegex(details);
    res.json({
      status: "success",
      data: reformatDetails,
    });
  } catch (error) {
    res.statusCode = 500;
    res.json({
      status: "error",
      message: "Terjadi kegagalan pada server, check log..."
    });
    console.error(error);
  }
}