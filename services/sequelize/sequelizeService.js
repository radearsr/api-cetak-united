const db = require("../../config/db");
const queryUtils = require("../../utils/queryStringUtils");

const readTransactionByCode = async (code) => {
  const startTime = new Date();
  const sqlString = queryUtils.SQL_SELECT_BY_CODE(code);  
  const [transactions, resultLength] = await db.query(sqlString);
  const endTime = new Date();
  const executionTime = endTime - startTime;
  if (!resultLength) throw new Error("SEQUELIZE_TRX_WITH_CODE_NOT_FOUND");
  return {
    data: transactions[0],
    executionTime: `${executionTime} ms`,
  };
};

const countTransactionByDestination = async (destination, startDate, endDate) => {
  const sqlStringCount = queryUtils.SQL_COUNT_BY_DEST_MORE_AND_DATE(destination, startDate, endDate);
  const [countData, resultLength] = await db.query(sqlStringCount);
  if (!resultLength) throw new Error("SEQUELIZE_TRX_COUNT_IS_ZERO");
  return countData[0].totalData;
};

const readTransactionByDestination = async ({ destination, startDate, endDate, currentPage, pageSize}) => {
  
  const destinationArray = destination.split(",");
  const destinationMapping = destinationArray.map((destination) => `'${destination.trim()}'`).join(",");

  const startTime = new Date();
  const transactionCount = await countTransactionByDestination(
    destinationMapping,
    startDate,
    endDate
  );

  const startSelectIndex = currentPage * pageSize - pageSize;
  const endSelectIndex = pageSize;

  let sqlString;

  sqlString = queryUtils.SQL_SELECT_BY_DEST_AND_DATE(
    destinationMapping,
    startDate,
    endDate,
    startSelectIndex,
    endSelectIndex
  );

  if (destinationArray.length > 1) {
    sqlString = queryUtils.SQL_SELECT_BY_DEST_MORE_AND_DATE(
      destinationMapping,
      startDate,
      endDate,
      startSelectIndex,
      endSelectIndex
    );
  }

  const [transactions, resultLength] = await db.query(sqlString);
  const endTime = new Date();
  const executionTime = endTime - startTime;

  if (!resultLength) throw new Error("SEQUELIZE_TRX_WITH_DEST_NOT_FOUND");

  return {
    data: transactions,
    page: {
      pageSize: pageSize,
      currentPage: currentPage,
      totalPage: Math.ceil(transactionCount / pageSize),
    },
    executionTime: `${executionTime} ms`,
  };
};

module.exports = {
  readTransactionByCode,
  readTransactionByDestination,
};
