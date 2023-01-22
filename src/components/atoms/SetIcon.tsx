/** @jsxImportSource @emotion/react */

import { Box, Typography, useTheme } from "@mui/material";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { statDef, statKeyType } from "../../utils/consts/Stat";
import { fontTypes } from "../../utils/styles/fonts";
import FontAwesomeSvgIcon from "./FontAwesomeSvgIcon";
import artifacts from "../../utils/consts/genshindb-partial.json";
import { setKeyType } from "../../utils/consts/Artifact";

type SetIconProps = {
  setKey: setKeyType;
  size?: number;
};

export const SetIcon = (props: SetIconProps) => {
  let { setKey, size } = props;
  const theme = useTheme();
  const { t, i18n } = useTranslation("artifact");
  if (size === undefined) size = 14;

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      height={size * 2}
      fontSize={size}
    >
      {setKey !== "" ? (
        <img
          alt="artifact set"
          src={`Artifacts/${setKey}/${
            artifacts[setKey]["flower"] !== undefined ? "flower" : "circlet"
          }.png`}
          width={size * 3}
        />
      ) : undefined}
      <Typography
        css={[fontTypes(theme).disc, { color: "inherit", fontSize: "inherit" }]}
      >
        {artifacts[setKey].name[i18n.language.substring(0, 2)]}
      </Typography>
    </Box>
  );
};
