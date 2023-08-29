exports.regexPatterns = {
  PLN: [
    "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TD:(?<tarif_daya>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  ],
  PLN_TOKEN_ADDON: "(?<token>.+)\\/(?<nama>[a-zA-Z\\s]+)\\/(?<trf_daya>.+)\\/(?<kwh>.+)",
  PLN_TOKEN: [
    "TOKEN:(?<token>.+)/NAMA:(?<nama>.+)/IDMeteran:(?<id_meteran>.+)/IDPel:(?<id_pelanggan>.+)/ANGSURAN:(?<angsuran>.+)/RPTOKEN:(?<rp_token>.+)/PPN:(?<ppn>.+)/PPJ:(?<ppj>.+)/MATERAI:(?<materai>.+)/PLNREF:(?<pln_ref>.+)/SM:(?<stand_meter>.+)/ADMIN:(?<admin>.+)/",
    "INFO:(?<info>.+)/Token TMP:(?<token_tmp>.+)/RPTOKEN:(?<rp_token>.+)/PPN:(?<ppn>.+)/PPJ:(?<ppj>.+)/MATERAI:(?<materai>.+)/PLNREF:(?<pln_ref>.+);IDMeter:(?<id_meter>.+);IDPel:(?<pln_pel>.+);Admin:(?<admin>.+)",
  ],
  BPJS: [
    "NAMA:(?<nama>.+)/PST:(?<peserta>.+)/CBG:(?<cbg>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  ],
  FINANCE: [
    "NAMA:(?<nama>.+)/NPOL:(?<npol>.+)/TNOR:(?<tnor>.+)/PTAG:(?<ptag>.+)/JTEM:(?<jtem>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+)/DENDA:(?<denda>.+)/COLLFEE:(?<collfee>.+).",
    "NAMA:(?<nama>.+)/NPOL:(?<npol>.+)/TNOR:(?<tnor>.+)/PTAG:(?<ptag>.+)/JTEM:(?<jtem>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  ],
  COMMON: [
    "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/DENDA:(?<denda>.+)/TTAG:(?<total_tagihan>.+).",
    "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/SM:(?<stand_meter>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
    "NAMA:(?<nama>.+)/PTAG:(?<periode>.+)/JBLN:(?<jml_bulan>.+)/TAG:(?<tagihan>.+)/ADM:(?<admin>.+)/TTAG:(?<total_tagihan>.+).",
  ],
};
