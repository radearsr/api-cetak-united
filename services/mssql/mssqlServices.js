const { sql, connectToDatabase } = require("../../database/connection");

exports.getTotalDataSelected = async (tujuan, startDate, endDate, totalSelected) => {
  const pool = await connectToDatabase();
  let result;
  if (tujuan.includes(",")) {
    const splitedTujuan = tujuan.split(",");
    const tujuanReformatWithBracket = splitedTujuan.map((data) => "('" + data.trim() + "')");
    result = await pool.request()
    .input("startDate", sql.VarChar, startDate)
    .input("endDate", sql.VarChar, endDate)
    .query(`SELECT FORMAT(tgl_entri, 'dd-MM-yyyy HH:mm:ss') AS tgl_entri, kode, kode_produk, tujuan, harga, sn, keterangan FROM transaksi WHERE (FORMAT(tgl_entri, 'yyyy-MM-dd') BETWEEN @startDate AND @endDate) AND ((kode_produk LIKE 'BYR%' OR kode_produk LIKE 'PL%' OR kode_produk LIKE 'TKN%' AND kode_produk NOT LIKE 'CEK%') AND status = 20) AND tujuan IN (${tujuanReformatWithBracket.join(",")}) ORDER BY kode DESC`);
  } else {
    result = await pool.request()
   .input("tujuan", sql.VarChar, tujuan)
   .input("startDate", sql.VarChar, startDate)
   .input("endDate", sql.VarChar, endDate)
   .query("SELECT format(tgl_entri, 'dd-MM-yyyy HH:mm:ss') AS tgl_entri, kode, kode_produk, tujuan, harga, sn, keterangan FROM transaksi WHERE (FORMAT(tgl_entri, 'yyyy-MM-dd') BETWEEN @startDate AND @endDate) AND ((kode_produk LIKE 'BYR%' OR kode_produk LIKE 'PL%' OR kode_produk LIKE 'TKN%' AND kode_produk NOT LIKE 'CEK%') AND status = 20) AND tujuan IN (@tujuan) ORDER BY kode DESC");
  }
  return Math.ceil(result.rowsAffected[0] / totalSelected);
}

exports.getAllTrxByTujuanAndDate = async (tujuan, startDate, endDate, page, totalSelected) => {
  const pool = await connectToDatabase();
  let result;

  const startIndexSelected = (page * totalSelected) - totalSelected;

  if (tujuan.includes(",")) {
    const splitedTujuan = tujuan.split(",");
    const tujuanReformatWithBracket = splitedTujuan.map((data) => "('" + data.trim() + "')");
    result = await pool.request()
    .input("startDate", sql.VarChar, startDate)
    .input("endDate", sql.VarChar, endDate)
    .input("startIndexSelected", sql.Int, startIndexSelected)
    .input("totalSelected", sql.Int, totalSelected)
    .query(`SELECT FORMAT(tgl_entri, 'dd-MM-yyyy HH:mm:ss') AS tgl_entri, kode, kode_produk, tujuan, harga, sn, keterangan FROM transaksi WHERE (FORMAT(tgl_entri, 'yyyy-MM-dd') BETWEEN @startDate AND @endDate) AND ((kode_produk LIKE 'BYR%' OR kode_produk LIKE 'PL%' OR kode_produk LIKE 'TKN%' AND kode_produk NOT LIKE 'CEK%') AND status = 20) AND tujuan IN (${tujuanReformatWithBracket.join(",")}) ORDER BY kode DESC OFFSET @startIndexSelected ROWS FETCH NEXT @totalSelected ROWS ONLY`);
  } else {
    result = await pool.request()
   .input("tujuan", sql.VarChar, tujuan)
   .input("startDate", sql.VarChar, startDate)
   .input("endDate", sql.VarChar, endDate)
   .input("startIndexSelected", sql.Int, startIndexSelected)
   .input("totalSelected", sql.Int, totalSelected)
   .query("SELECT format(tgl_entri, 'dd-MM-yyyy HH:mm:ss') AS tgl_entri, kode, kode_produk, tujuan, harga, sn, keterangan FROM transaksi WHERE (FORMAT(tgl_entri, 'yyyy-MM-dd') BETWEEN @startDate AND @endDate) AND ((kode_produk LIKE 'BYR%' OR kode_produk LIKE 'PL%' OR kode_produk LIKE 'TKN%' AND kode_produk NOT LIKE 'CEK%') AND status = 20) AND tujuan IN (@tujuan) ORDER BY kode DESC OFFSET @startIndexSelected ROWS FETCH NEXT @totalSelected ROWS ONLY");
  }
  console.log(result);
  if (result.recordset.length > 0) {
    return result.recordset;
  }

  return "Not Found";
};

exports.getTrxDetailsByKode = async (kode) => {
  const pool = await connectToDatabase();
  
  const result = await pool.request()
  .input("kode", kode)
  .query("SELECT format(tgl_entri, 'dd-MM-yyyy HH:mm:ss') AS tgl_entri, kode, kode_produk, tujuan, harga, sn, keterangan FROM transaksi WHERE kode=@kode");

  return result.recordset;
};
