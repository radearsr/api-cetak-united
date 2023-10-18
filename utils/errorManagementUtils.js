exports.generateResponseError = (error) => {
  if (error.message.includes("Timeout")) {
    return {
      code: 500,
      message: "Request timeout, silahkan hubungi CS kami, atau coba beberapa saat lagi",
      status: "error"
    };
  }
  if (error.message === "SEQUELIZE_TRX_WITH_CODE_NOT_FOUND") {
    return {
      code: 404,
      message: "Kode TRX tidak ditemukan, silahkan gunakan kode lain",
      status: "fail"
    };
  }
  if (error.message === "SEQUELIZE_TRX_WITH_DEST_NOT_FOUND") {
    return {
      code: 404,
      message: "Data tidak ditemukan, pastikan tujuan, tanggal awal dan tanggal akhir sudah sesuai",
      status: "fail"
    }
  }
  if (error.message === "FIELD_KETERANGAN_IS_NULL") {
    return {
      code: 400,
      message: "Data tidak lengkap, silahkan hubungi cs untuk mendapatkan bantuan.",
      status: "fail"
    }
  }
  return {
    code: 500,
    message: "Terjadi kegagalan pada server kami, silahkan hubungi CS",
    status: "error"
  }
};
