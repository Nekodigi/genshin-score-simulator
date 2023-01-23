/** @jsxImportSource @emotion/react */

import {
  faAdd,
  faFileExport,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Alert, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { Artifact } from "../../utils/class/Artifact";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import { EditorContext, Info } from "../../utils/contexts/EditorContext";
import { fontTypes } from "../../utils/styles/fonts";
import { ArtifactType } from "../../utils/types/Artifact";
import { IconTextButton } from "../molecules/IconTextButton";
import { StyledModal } from "../molecules/StyledModal";
import { useState } from "react";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { downloadJson } from "../../utils/func/download";
import { artifacts } from "genshin-db";
import { ConfirmDialog } from "../molecules/ConfirmDialog";

export const ArtifactImporter = () => {
  const { importer } = useContext(EditorContext);
  const { artifacts, setArtifacts } = useContext(ArtifactsContext);
  const theme = useTheme();
  const [info, setInfo] = useState<Info | undefined>();
  const { t } = useTranslation(["editor", "common"]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const addFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    setInfo({ sevarity: "info", text: t("common:info.loadStart") });
    try {
      let obj = JSON.parse(await e.target.files[0].text()) as any;

      let artifact = obj.artifacts[1] as ArtifactType;
      obj.artifacts.map((artifact: ArtifactType) => {
        artifact.substats = artifact.substats.map((substat) => {
          return {
            key: substat.key,
            value: substat.value,
          };
        });
        for (let i = artifact.substats.length; i < 4; i++) {
          artifact.substats.push({ key: "", value: 0 });
        }

        setArtifacts({
          type: "ADD",
          artifact,
        });
      });
      setInfo({ sevarity: "success", text: t("common:info.loadSuccess") });
    } catch {
      setInfo({ sevarity: "error", text: t("common:info.loadFailed") });
    }
  };

  return (
    <StyledModal open={importer.open} onClose={() => importer.setOpen(false)}>
      <Typography css={fontTypes(theme).title}>
        {t("database.title")}
      </Typography>
      <Typography css={fontTypes(theme).body}>
        {t("database.import.disc")}
      </Typography>
      <IconTextButton
        text={t("database.import.importArtifacts")!}
        icon={faAdd}
        color={theme.palette.success.dark}
      >
        <input hidden onChange={addFile} type="file" accept=".json" />
      </IconTextButton>
      {info ? (
        <Alert
          variant="filled"
          severity={info.sevarity}
          css={[fontTypes(theme).disc, { color: theme.palette.com.white }]}
          sx={{ px: 1 }}
        >
          {info.text}
        </Alert>
      ) : undefined}
      <Typography css={fontTypes(theme).body} mt={2}>
        {t("database.export.disc")}
      </Typography>
      <IconTextButton
        text={t("database.export.exportArtifacts")!}
        icon={faFileExport}
        color={theme.palette.info.dark}
        onClick={() =>
          downloadJson(
            {
              artifacts: artifacts,
              format: "GOOD",
              version: 1,
              source: "ArtifactSim",
            },
            "Artifact Sim.json"
          )
        }
      />
      <Typography css={fontTypes(theme).body} mt={2}>
        {t("database.delete.disc")}
      </Typography>
      <IconTextButton
        text={t("database.delete.deleteArtifacts")!}
        icon={faTrash}
        color={theme.palette.error.dark}
        onClick={() => setConfirmOpen(true)}
      />
      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title={"本当に削除しますか？"}
        disc={
          "削除したデータは復元できないため、先に書き出してバックアップを取ることを推奨します。"
        }
        onOK={() => setArtifacts({ type: "CLEAR" })}
      />
    </StyledModal>
  );
};
