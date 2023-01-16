/** @jsxImportSource @emotion/react */

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { Artifact } from "../../utils/class/Artifact";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { fontTypes } from "../../utils/styles/fonts";
import { ArtifactValue } from "../../utils/types/Artifact";
import { IconTextButton } from "../molecules/IconTextButton";
import { StyledModal } from "../molecules/StyledModal";

export const ArtifactImporter = () => {
  const { importer } = useContext(EditorContext);
  const { setArtifacts } = useContext(ArtifactsContext);
  const theme = useTheme();

  const addFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    let obj = JSON.parse(await e.target.files[0].text()) as any;
    console.log(obj);

    let artifact = obj.artifacts[1] as ArtifactValue;
    console.log(new Artifact(artifact).score());
    obj.artifacts.map((artifact: ArtifactValue) => {
      artifact.substats = artifact.substats.map((substat) => {
        return {
          key: substat.key === "" ? "ERR" : substat.key,
          value: substat.value,
        };
      });
      if (artifact.substats.length === 3)
        artifact.substats.push({ key: "ERR", value: 0 });
      setArtifacts({
        type: "ADD",
        artifact,
      });
    });
  };

  return (
    <StyledModal open={importer.open} onClose={() => importer.setOpen(false)}>
      <Typography css={fontTypes(theme).title}>Import Artifact</Typography>
      <Typography css={fontTypes(theme).body}>
        Genshin Optimizer、Adepti
        Scanner等のツールから聖遺物をまとめて追加する事ができます。.jsonファイルをアップロードしてください。
      </Typography>
      <IconTextButton
        text={"Import Artifacts"}
        icon={faAdd}
        color={theme.palette.success.dark}
      >
        <input hidden onChange={addFile} type="file" accept=".json" />
      </IconTextButton>
    </StyledModal>
  );
};
