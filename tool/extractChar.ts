import genshindb, { Language } from "genshin-db";
import { setKey } from "../src/utils/consts/Artifact";
import fs from "fs";
import { ArtifactDB } from "../src/utils/types/Artifact";

const extractArtifactSet = () => {
  //let dbs: extractArtifactSetOut = {};
  let charlist = "";
  setKey.map((key) => {
    let setEn = genshindb.artifacts(key)!;
    let setJa = genshindb.artifacts(key, {
      resultLanguage: Language.Japanese,
    })!;
    let slots = ["flower", "plume", "sands", "goblet", "circlet"] as const;
    slots.forEach((slot) => {
      if (setEn[slot]) {
        [...setEn[slot]!.name].map((c) =>
          !charlist.includes(c) ? (charlist = charlist += c) : undefined
        );
        [...setJa[slot]!.name].map((c) =>
          !charlist.includes(c) ? (charlist = charlist += c) : undefined
        );
      }
    });

    // setEn.plume
    //   ? { name: { en: setEn.plume.name, ja: setJa.plume!.name } }
    //   : undefined
    // setEn.sands
    //   ? { name: { en: setEn.sands.name, ja: setJa.sands!.name } }
    //   : undefined
    // setEn.goblet
    //   ? { name: { en: setEn.goblet.name, ja: setJa.goblet!.name } }
    //   : undefined
    //circlet: { name: { en: setEn.circlet.name, ja: setJa.circlet.name } }
  });
  console.log(charlist);
  //console.log(dbs);
  fs.writeFileSync(
    "./genshindb-charlist.json",
    JSON.stringify(charlist, null, 2),
    "utf-8"
  );
};
extractArtifactSet();
