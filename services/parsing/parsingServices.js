const regexPatterns = {
  General: "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  PLNPascabayar: "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TD:(?<tarif_daya>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  PLNPrabayar: "INFO:(?<info>.+)/Token TMP:(?<token_tmp>.+)/RPTOKEN:(?<rp_token>.+)/PPN:(?<ppn>.+)/PPJ:(?<ppj>.+)/MATERAI:(?<materai>.+)/PLNREF:(?<pln_ref>.+);IDMeter:(?<id_meter>.+);IDPel:(?<pln_pel>.+);Admin:(?<admin>.+).",
  BPJS: "NAMA:(?<nama>.+)/PST:(?<peserta>.+)/CBG:(?<cbg>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  PDAM: "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  FNFIF: "NAMA:(?<nama>.+)/NPOL:(?<npol>.+)/TNOR:(?<tnor>.+)/PTAG:(?<ptag>.+)/JTEM:(?<jtem>.+)/TAG:(?<tag>.+)/ADM:(?<adm>.+)/TTAG:(?<ttag>.+)/DENDA:(?<denda>.+)/COLLFEE:(?<collfee>.+).",
  FNFIFSEC: "NAMA:(?<nama>.+)/NPOL:(?<npol>.+)/TNOR:(?<tnor>.+)/PTAG:(?<ptag>.+)/JTEM:(?<jtem>.+)/TAG:(?<tag>.+)/ADM:(?<adm>.+)/TTAG:(?<ttag>.+)."
};

const checkPlnPraOrPascaBayar = (kodeProduk, regexPlnPra, regexPlnPasca) => {
  if (kodeProduk.includes("BYR")) {
    return regexPlnPasca;
  } else {
    return regexPlnPra;
  }
};

const regenerateDataForAddRegex = (datas) => {
  const dataCombinedWithRegex = datas.map((data) => {
    if (data.kode_produk.includes("PLN") || data.kode_produk.includes("TKN")) {
      const regexForPln = checkPlnPraOrPascaBayar(
        data.kode_produk,
        regexPatterns.PLNPrabayar,
        regexPatterns.PLNPascabayar,
      );
      const regex = new RegExp(regexForPln);
      const result = data.keterangan.match(regex);
      console.log({result});
      return Object.assign(data, {tambahan: result.groups});
    } else if (data.kode_produk.includes("BYRBPJS")) {
      const regex = new RegExp(regexPatterns.BPJS);
      const result = data.keterangan.match(regex);
      return Object.assign(data, {tambahan: result.groups});
    } else if (data.kode_produk.includes("BYRPDAM")) {
      const regex = new RegExp(regexPatterns.PDAM);
      const result = data.keterangan.match(regex);
      return Object.assign(data, {tambahan: result.groups});
    } else if (data.kode_produk.includes("FIF")) {
      let regex = new RegExp(regexPatterns.FNFIF);
      let result = data.keterangan.match(regex);
      if (result === null) {
        regex = new RegExp(regexPatterns.FNFIFSEC);
        result = data.keterangan.match(regex);
        return Object.assign(data, { tambahan: {...result.groups, denda: "0", collfee: "0" } });
      }
      return Object.assign(data, { tambahan: result.groups });
    } else {
      const regex = new RegExp(regexPatterns.General);
      const result = data.keterangan.match(regex);
      return Object.assign(data, { tambahan: result.groups });
    }
  });
  return dataCombinedWithRegex;
};

module.exports = {
  regenerateDataForAddRegex,
};
