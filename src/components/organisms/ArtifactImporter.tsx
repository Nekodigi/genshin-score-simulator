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

export const ArtifactImporter = () => {
  const { importer } = useContext(EditorContext);
  const { setArtifacts } = useContext(ArtifactsContext);
  const theme = useTheme();
  const [info, setInfo] = useState<Info | undefined>();
  const { t } = useTranslation(["editor", "common"]);

  const addFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
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
        {t("importer.title")}
      </Typography>
      <Typography css={fontTypes(theme).body}>{t("importer.disc")}</Typography>
      <IconTextButton
        text={t("importer.importArtifacts")!}
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
      <Typography css={fontTypes(theme).body}>
        現在の聖遺物を.jsonファイルとして書き出します。デバイス間のデータ移行や、データのバックアップに使用できます。
      </Typography>
      <IconTextButton
        text={"聖遺物を全て書き出す"}
        icon={faFileExport}
        color={theme.palette.info.dark}
      />
      <Typography css={fontTypes(theme).body}>
        現在の聖遺物を全て削除します。別のデータで聖遺物を置き換える、聖遺物を一から登録し直す場合に便利です。
      </Typography>
      <IconTextButton
        text={"聖遺物を全て削除"}
        icon={faTrash}
        color={theme.palette.error.dark}
      />
    </StyledModal>
  );
};
