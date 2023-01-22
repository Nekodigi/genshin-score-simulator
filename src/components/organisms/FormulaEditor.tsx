/** @jsxImportSource @emotion/react */

import { StyledModal } from "../molecules/StyledModal";
import { useContext } from "react";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { fontTypes } from "../../utils/styles/fonts";
import { useTranslation } from "react-i18next";
import { FormulaDisplay } from "../molecules/FormulaDisplay";
import { substatKey } from "../../utils/consts/Substat";
import { WeightInput } from "../molecules/WeightInput";
import { IconTextButton } from "../molecules/IconTextButton";
import { faFloppyDisk, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export const FormulaEditor = () => {
  const { formulaEditor, weight, setWeight } = useContext(EditorContext);
  const theme = useTheme();
  const { t } = useTranslation("editor");
  return (
    <StyledModal
      open={formulaEditor.open}
      onClose={() => formulaEditor.setOpen(false)}
    >
      <Typography css={fontTypes(theme).title}>
        {t("formula.editorTitle")}
      </Typography>
      <Typography css={fontTypes(theme).subtitle}>
        {t("formula.title")}
      </Typography>
      <FormulaDisplay />
      <Typography css={fontTypes(theme).subtitle}>
        {t("formula.weight")}
      </Typography>
      <Grid container spacing={1} rowSpacing={1.5}>
        {substatKey.map((key, i) =>
          key !== "" ? (
            <Grid item key={i} xs={6}>
              <WeightInput
                statKey={key}
                value={weight[key]}
                setValue={(value) => {
                  weight[key] = value;
                  setWeight({ ...weight });
                }}
              />
            </Grid>
          ) : undefined
        )}
      </Grid>
      <Box display="flex" gap={1} justifyContent="flex-end" mt={2.5}>
        <IconTextButton
          text={t("common:action.reset")!}
          icon={faRotateLeft}
          color={theme.palette.error.dark}
          onClick={() => {
            setWeight({
              hp: 0,
              atk: 0,
              def: 0,
              hp_: 0,
              atk_: 1,
              def_: 0,
              eleMas: 0,
              enerRech_: 0,
              critRate_: 2,
              critDMG_: 1,
              "": 0,
            });
          }}
        />
        <IconTextButton
          text={t("common:action.save")!}
          icon={faFloppyDisk}
          color={theme.palette.success.dark}
          onClick={() => formulaEditor.setOpen(false)}
        />
      </Box>
    </StyledModal>
  );
};
