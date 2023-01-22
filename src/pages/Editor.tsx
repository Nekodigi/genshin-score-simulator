/** @jsxImportSource @emotion/react */

import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useMemo, useState, Suspense, lazy } from "react";
import { fontTypes } from "../utils/styles/fonts";
import { css } from "@emotion/react";
import { RangeInput } from "../components/molecules/RangeInput";
import { IconTextButton } from "../components/molecules/IconTextButton";
import {
  faAdd,
  faArrowUpShortWide,
  faArrowUpWideShort,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { EditorContext } from "../utils/contexts/EditorContext";
import { FormulaDisplay } from "../components/molecules/FormulaDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddRounded } from "@mui/icons-material";
import { ArtifactsContext } from "../utils/contexts/ArtifactsContext";
import ArtifactCard from "../components/organisms/ArtifactCard";
import { Sort, SortKey } from "../utils/types/Sort";
import { ArtifactComparator, ArtifactFilter } from "../utils/reducers/Artifact";
import { toSortKeyScore } from "../utils/func/Sort";
import { ArtifactType } from "../utils/types/Artifact";
import { statKey } from "../utils/consts/Stat";
//import { ArtifactEditor } from "../components/organisms/ArtifactEditor";
const ArtifactEditor = lazy(
  () => import("../components/organisms/ArtifactEditor")
);

export const Editor = () => {
  const theme = useTheme();
  const { t } = useTranslation(["editor", "common"]);
  const { editor, sort, setSort, filter, setFilter } =
    useContext(EditorContext);
  const { artifacts } = useContext(ArtifactsContext);
  const [page, setPage] = useState(1);
  const pageN = 24;

  const disc = css([
    fontTypes(theme).disc,
    { textTransform: "none", color: theme.palette.com.white },
  ]);

  //original artifacts should not be changed
  const filtered = useMemo(() => {
    return [...artifacts]
      .filter((a) => ArtifactFilter(a, filter, sort))
      .sort((a, b) => ArtifactComparator(a, b, sort));
  }, [artifacts, filter, sort]);

  const artifactsRendered = useMemo(() => {
    return filtered
      .slice((page - 1) * pageN, page * pageN)
      .map((artifact, id) => (
        <ArtifactCard targetId={artifact.id!} key={id} artifact={artifact} />
      ));
  }, [filtered, page]);

  return (
    <Box>
      <Suspense>
        <ArtifactEditor />
      </Suspense>
      <Box display="flex" flexDirection="column" gap={1.5}>
        <Box display="flex" justifyContent="space-between">
          <Typography css={fontTypes(theme).title}>
            {t("filter.title")}
          </Typography>
          <Box display="flex" gap={2} alignItems="baseline">
            <Typography css={[fontTypes(theme).body]}>
              {t("filter.filtered")} {filtered.length}/{artifacts.length}
            </Typography>
            <IconTextButton
              text={t("common:action.reset")!}
              icon={faRotateRight}
              color={theme.palette.error.dark}
              onClick={() => setFilter({ level: [0, 20], score: [0, 61] })}
            />
          </Box>
        </Box>

        <RangeInput
          name={t("artifact.level")}
          min={0}
          max={20}
          value={filter.level}
          setValue={(value) => {
            filter.level = value;
            setFilter({ ...filter });
          }}
        />
        <RangeInput
          name={t(`filters.${toSortKeyScore(sort.key)}`)}
          min={0}
          max={61}
          value={filter.score} //target automatically change based on sort
          setValue={(value) => {
            filter.score = value;
            setFilter({ ...filter });
          }}
        />
        {/* <Autocomplete
          options={statKey}
          renderInput={(params) => (
            <TextField
              {...params}
              css={fontTypes(theme).disc}
              sx={{ minHeight: 0 }}
              variant="standard"
              label="Artifact Sets"
            />
          )}
        /> */}

        <Typography css={fontTypes(theme).title}>
          {t("formula.title")}
        </Typography>
        <FormulaDisplay />

        <Typography css={fontTypes(theme).title}>
          {t("artifacts.title")}
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={1}
          justifyContent="space-between"
        >
          <Pagination
            page={page}
            onChange={(e, value) => setPage(value)}
            count={Math.ceil(filtered.length / pageN)}
            color="primary"
          />
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
              <Button sx={{ px: 0 }}>
                <FormControl variant="standard">
                  <Select
                    label="Key"
                    value={sort.key}
                    onChange={(e) => {
                      sort.key = e.target.value as SortKey;
                      setSort({ ...sort });
                    }}
                    css={disc}
                    sx={{
                      width: 112,
                      height: "100%",
                      background: theme.palette.primary.main,
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
              </Button>
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
                sx={{ textTransform: "none" }}
              >
                {sort.desc ? t("order.desc") : t("order.asc")}
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        <IconTextButton
          text={t("artifacts.addNew")!}
          icon={faAdd}
          color={theme.palette.success.dark}
          onClick={() => editor.change(true)}
        />
        <Grid container spacing={1.5}>
          {artifactsRendered}
        </Grid>
      </Box>
    </Box>
  );
};

{
  /* 
    const noXpad = css({
    paddingLeft: 0,
    paddingRight: 0,
    background: "#BDBDBD",
    "&.Mui-selected, &.Mui-selected:hover": { background: "#3F51B5" },
    ":focus": { background: "#BDBDBD" },
  });
  <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        sx={{ height: 32 }}
        fullWidth
      >
        <ToggleButton value="1" aria-label="bold" css={noXpad}>
          <Typography css={disc}>1 Substats</Typography>
        </ToggleButton>
        <ToggleButton value="2" aria-label="italic" css={noXpad}>
          <Typography css={disc}>2 Substats</Typography>
        </ToggleButton>
        <ToggleButton value="3" aria-label="underlined" css={noXpad}>
          <Typography css={disc}>3 Substats</Typography>
        </ToggleButton>
        <ToggleButton value="4" aria-label="underlined" css={noXpad}>
          <Typography css={disc}>4 Substats</Typography>
        </ToggleButton>
      </ToggleButtonGroup> */
}
