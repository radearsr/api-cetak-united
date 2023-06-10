const regexPatterns = {
  General: "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  PLNPascabayar: "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TD:(?<tarif_daya>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  PLNPrabayar: "INFO:(?<info>.+)/Token TMP:(?<token_tmp>.+)/RPTOKEN:(?<rp_token>.+)/PPN:(?<ppn>.+)/PPJ:(?<ppj>.+)/MATERAI:(?<materai>.+)/PLNREF:(?<pln_ref>.+);IDMeter:(?<id_meter>.+);IDPel:(?<pln_pel>.+);Admin:(?<admin>.+).",
  AddonPlnPrabayar: "(?<token>.+)/(?<nama>[a-zA-Z\s]+)/(?<trf_daya>.+)/(?<kwh>.+)",
  BPJS: "NAMA:(?<nama>.+)/PST:(?<peserta>.+)/CBG:(?<cbg>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  PDAM: "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  PDAMSEC: "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/DENDA:(?<denda>.+)/TTAG:(?<ttag>.+).",
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
      const addonRegex = new RegExp(regexPatterns.AddonPlnPrabayar);
      const regex = new RegExp(regexForPln);
      const { groups: result } = data.keterangan.match(regex);
      let resultAddon;
      try {
        const { groups } = data.sn.match(addonRegex);
        resultAddon = groups;
      } catch (error) {
        if (!error.message.includes("Cannot destructure property 'groups'")){
          throw new Error(error.message);
        }
        resultAddon = null;
      }
      if (!resultAddon) return Object.assign(data, { tambahan: {...result } });
      return Object.assign(data, {
        tambahan: {
          ...result,
          ...resultAddon,
        },
      });
    } else if (data.kode_produk.includes("BYRBPJS")) {
      const regex = new RegExp(regexPatterns.BPJS);
      const result = data.keterangan.match(regex);
      return Object.assign(data, {tambahan: result.groups});
    } else if (data.kode_produk.includes("BYRPDAM")) {
      const regex = new RegExp(regexPatterns.PDAMSEC);
      const result = data.keterangan.match(regex);
      if (!result) {
        const secRegex = new RegExp(regexPatterns.PDAM);
        const alternativeResult = data.keterangan.match(secRegex);
        return Object.assign(data, {tambahan: alternativeResult.groups });
      }
      return Object.assign(data, { tambahan: result.groups });
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
