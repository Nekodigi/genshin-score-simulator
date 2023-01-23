/** @jsxImportSource @emotion/react */

import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { fontTypes } from "../../utils/styles/fonts";
import { SortKey } from "../../utils/types/Sort";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpShortWide,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

export const SortInput = () => {
  const { t } = useTranslation("editor");
  const theme = useTheme();
  const disc = fontTypes(theme).disc;
  const { sort, setSort } = useContext(EditorContext);
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="flex-end"
      flexGrow={1}
      gap={1}
    >
      <Typography css={[disc, { color: theme.palette.local.black }]}>
        {t("artifacts.sortBy")}:
      </Typography>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{ height: 32 }}
      >
        <FormControl variant="standard">
          <Select
            label="Key"
            value={sort.key}
            onChange={(e) => {
              sort.key = e.target.value as SortKey;
              setSort({ ...sort });
            }}
            css={[disc, { color: theme.palette.com.white }]}
            sx={{
              width: 112,
              height: "100%",
              background: theme.palette.primary.main,
              pl: 1,
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}
            disableUnderline
          >
            <MenuItem css={disc} value="minScore">
              {t("filters.minScore")}
            </MenuItem>
            <MenuItem css={disc} value="avgScore">
              {t("filters.avgScore")}
            </MenuItem>
            <MenuItem css={disc} value="maxScore">
              {t("filters.maxScore")}
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          startIcon={
            <FontAwesomeIcon
              icon={sort.desc ? faArrowUpWideShort : faArrowUpShortWide}
            />
          }
          onClick={() => {
            sort.desc = !sort.desc;
            setSort({ ...sort });
          }}
          sx={{
            textTransform: "none",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          {sort.desc ? t("order.desc") : t("order.asc")}
        </Button>
      </ButtonGroup>
    </Box>
  );
};
