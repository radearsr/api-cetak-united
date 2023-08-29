const sequelizeServices = require("../services/sequelize/sequelizeService");
const regexServices = require("../services/regex/regexServices");
const { formattedDate } = require("../utils/dateUtils");

exports.postHistoryByDestinationController = async (req, res, next) => {
  try {
    const payload = req.body;
    const histories = await sequelizeServices.readTransactionByDestination({
      destination: payload.tujuan || "0",
      startDate: payload.start_date || formattedDate,
      endDate: payload.end_date || formattedDate,
      pageSize: payload.per_page || 10,
      currentPage: payload.page || 1,
    });
    res.send({
      status: "success",
      message: `Berhasil menampilkan dari tujuan ${payload.tujuan}`,
      data: histories.data,
      pages: histories.page,
    });
  } catch (error) {
    next(error);
  }
};

exports.postHistoryByIdController = async (req, res, next) => {
  try {
    const payload = req.body;
    const history = await sequelizeServices.readTransactionByCode(payload.kodetrx);
    const resultHistoryWithAddon = regexServices.createAddonFields([history.data]);
    res.send({
      status: "success",
      message: `Berhasil menampilkan data dari kode ${payload.kodetrx}`,
      data: resultHistoryWithAddon,
    });
  } catch (error) {
    next(error);  
  }
};
