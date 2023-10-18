const { regexPatterns } = require("../../utils/regexPatternUtils");

const extractCommonKeterangan = (patternKey, text) => {
  const results = regexPatterns[patternKey].map(pattern => {
    const regex = new RegExp(pattern);
    const resultMatching = text.match(regex);
    if (resultMatching) return { ...resultMatching.groups };
  });
  return results.filter(result => result);
};

const extractPlntokenKeterangan = (patternKey, text, addonText) => {
  const results = regexPatterns[patternKey].map(pattern => {
    const regex = new RegExp(pattern);
    const resultMatching = text.match(regex);
    const resultMatchingAddon = addonText.match(
      regexPatterns.PLN_TOKEN_ADDON,
      "i"
    );
    if (resultMatchingAddon && resultMatching)
      return { ...resultMatchingAddon.groups, ...resultMatching.groups };
    if (resultMatching) return { ...resultMatching.groups };
  });
  return results.filter(result => result);
};

const createAddonFields = defaultLists => {
  return defaultLists.map(defaultList => {
    const kodeProduk = defaultList.kode_produk;
    if (!defaultList.keterangan) throw new Error("FIELD_KETERANGAN_IS_NULL");
    if (
      kodeProduk.includes("PLN") &&
      defaultList.keterangan.toLowerCase().includes("token")
    ) {
      const [extractedData] = extractPlntokenKeterangan(
        "PLN_TOKEN",
        defaultList.keterangan,
        defaultList.sn
      );
      return { ...defaultList, tambahan: extractedData };
    } else if (kodeProduk.includes("PLN")) {
      const [extractedData] = extractCommonKeterangan(
        "PLN",
        defaultList.keterangan
      );
      return { ...defaultList, tambahan: extractedData };
    } else if (kodeProduk.includes("BPJS")) {
      const [extractedData] = extractCommonKeterangan(
        "BPJS",
        defaultList.keterangan
      );
      return { ...defaultList, tambahan: extractedData };
    } else if (
      kodeProduk.includes("FIF") ||
      kodeProduk.includes("MCF") ||
      kodeProduk.includes("ADIRA")
    ) {
      const [extractedData] = extractCommonKeterangan(
        "FINANCE",
        defaultList.keterangan
      );
      return { ...defaultList, tambahan: extractedData };
    } else {
      const [extractedData] = extractCommonKeterangan(
        "COMMON",
        defaultList.keterangan
      );
      return { ...defaultList, tambahan: extractedData };
    }
  });
};

module.exports = {
  createAddonFields,
};
