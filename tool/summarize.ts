import genshindb, { Language } from "genshin-db";
import fs from "fs";
import { ArtifactDB } from "../src/utils/types/Artifact";
import { setKey } from "../src/utils/consts/Artifact";

type extractArtifactSetOut = {
  [key: string]: ArtifactDB;
};
const extractArtifactSet = () => {
  let dbs: extractArtifactSetOut = {};
  setKey.map((key) => {
    let setEn = genshindb.artifacts(key)!;
    let setJa = genshindb.artifacts(key, {
      resultLanguage: Language.Japanese,
    })!;
    let db: ArtifactDB = {
      name: { en: setEn.name, ja: setJa.name },
      flower: setEn.flower
        ? { name: { en: setEn.flower.name, ja: setJa.flower!.name } }
        : undefined,
      plume: setEn.plume
        ? { name: { en: setEn.plume.name, ja: setJa.plume!.name } }
        : undefined,
      sands: setEn.sands
        ? { name: { en: setEn.sands.name, ja: setJa.sands!.name } }
        : undefined,
      goblet: setEn.goblet
        ? { name: { en: setEn.goblet.name, ja: setJa.goblet!.name } }
        : undefined,
      circlet: { name: { en: setEn.circlet.name, ja: setJa.circlet.name } },
    };
    dbs[key] = db;
  });
  //console.log(dbs);
  fs.writeFileSync(
    "./genshindb-partial.json",
    JSON.stringify(dbs, null, 2),
    "utf-8"
  );
};
extractArtifactSet();
