const regexPatterns = [
  "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TD:(?<tarif_daya>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  "INFO:(?<info>.+)/Token TMP:(?<token_tmp>.+)/RPTOKEN:(?<rp_token>.+)/PPN:(?<ppn>.+)/PPJ:(?<ppj>.+)/MATERAI:(?<materai>.+)/PLNREF:(?<pln_ref>.+);IDMeter:(?<id_meter>.+);IDPel:(?<pln_pel>.+);Admin:(?<admin>.+).",
  "(?<token>.+)/(?<nama>[a-zA-Z\s]+)/(?<trf_daya>.+)/(?<kwh>.+)",
  "NAMA:(?<nama>.+)/PST:(?<peserta>.+)/CBG:(?<cbg>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/DENDA:(?<denda>.+)/TTAG:(?<ttag>.+).",
  "NAMA:(?<nama>.+)/NPOL:(?<npol>.+)/TNOR:(?<tnor>.+)/PTAG:(?<ptag>.+)/JTEM:(?<jtem>.+)/TAG:(?<tag>.+)/ADM:(?<adm>.+)/TTAG:(?<ttag>.+)/DENDA:(?<denda>.+)/COLLFEE:(?<collfee>.+).",
  "NAMA:(?<nama>.+)/NPOL:(?<npol>.+)/TNOR:(?<tnor>.+)/PTAG:(?<ptag>.+)/JTEM:(?<jtem>.+)/TAG:(?<tag>.+)/ADM:(?<adm>.+)/TTAG:(?<ttag>.+)."
];

const regenerateDataForAddRegex = (datas) => {
  const dataCombinedWithRegex = datas.map((data) => {
    if (data.keterangan === null) throw new Error("KETERANGAN BERISI NULL");
    let resultRegex;
    for (const index in regexPatterns) {
      const regex = new RegExp(regexPatterns[index]);
      const result = data.keterangan.match(regex);
      if (!result) continue;
      resultRegex = result.groups;
    }
    console.log(resultRegex);
    return Object.assign(data, {
      tambahan: { ...resultRegex },
    });
  });
  return dataCombinedWithRegex;
};

module.exports = {
  regenerateDataForAddRegex,
};
