import { artifactKeyType, setKeyType, slotKeyType } from "../consts/Artifact";
import { statKeyType } from "../consts/Stat";
import { SubstatType } from "./Substat";

export type ArtifactType = {
  setKey?: setKeyType;
  rarity?: 1 | 2 | 3 | 4 | 5;
  level: number;
  slotKey?: slotKeyType;
  mainStatKey?: statKeyType; //how to calc main stat value
  substats: SubstatType[];
  location?: string;
  exclude?: boolean;
  lock?: boolean;
  id?: string;
};

type Scores = {
  minScore: number;
  avgScore: number;
  maxScore: number;
};

type NameLang = {
  name: { en: string; ja: string };
};
export type ArtifactDB = {
  name: { en: string; ja: string };
  flower?: NameLang;
  plume?: NameLang;
  sands?: NameLang;
  goblet?: NameLang;
  circlet: NameLang;
};

export type { Scores };

// {
//   "setKey": "NoblesseOblige",
//   "rarity": 5,
//   "level": 0,
//   "slotKey": "plume",
//   "mainStatKey": "atk",
//   "substats": [
//     { "key": "critRate_", "value": 2.7 },
//     { "key": "def", "value": 21 },
//     { "key": "def_", "value": 5.1 },
//     { "key": "hp", "value": 269 }
//   ],
//   "location": "",
//   "exclude": false,
//   "lock": false,
//   "id": "artifact_1"
// },
