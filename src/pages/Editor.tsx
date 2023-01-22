/** @jsxImportSource @emotion/react */

import { Box, Grid, Pagination, Typography, useTheme } from "@mui/material";
import { useContext, useMemo, useState, Suspense, lazy } from "react";
import { fontTypes } from "../utils/styles/fonts";
import { RangeInput } from "../components/molecules/RangeInput";
import { IconTextButton } from "../components/molecules/IconTextButton";
import { faAdd, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { EditorContext } from "../utils/contexts/EditorContext";
import { FormulaDisplay } from "../components/molecules/FormulaDisplay";
import { ArtifactsContext } from "../utils/contexts/ArtifactsContext";
import ArtifactCard from "../components/organisms/ArtifactCard";
import { ArtifactComparator, ArtifactFilter } from "../utils/reducers/Artifact";
import { toSortKeyScore } from "../utils/func/Sort";
import { mainstatKey } from "../utils/consts/Mainstat";
import { StatKeyInput } from "../components/molecules/SubstatInput";
import { SetInput } from "../components/molecules/SetInput";
import { SortInput } from "../components/organisms/SortInput";
import { SlotOption } from "../components/molecules/SlotOptions";
import { FormulaEditor } from "../components/organisms/FormulaEditor";
const ArtifactEditor = lazy(
  () => import("../components/organisms/ArtifactEditor")
);

const Editor = () => {
  const theme = useTheme();
  const { t } = useTranslation(["editor", "common", "artifact"]);
  const { editor, sort, filter, setFilter, weight } = useContext(EditorContext);
  const { artifacts } = useContext(ArtifactsContext);
  const [page, setPage] = useState(1);
  const pageN = 24;

  //original artifacts should not be changed
  const filtered = useMemo(() => {
    return [...artifacts]
      .filter((a) => ArtifactFilter(weight, a, filter, sort))
      .sort((a, b) => ArtifactComparator(weight, a, b, sort));
  }, [artifacts, filter, sort, weight]);

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
      <FormulaEditor />
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
              icon={faRotateLeft}
              color={theme.palette.error.dark}
              onClick={() =>
                setFilter({
                  level: [0, 20],
                  score: [0, 61],
                  slot: ["flower", "plume", "sands", "goblet", "circlet"],
                  set: "",
                  mainstat: "",
                })
              }
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
        <SlotOption
          slot={filter.slot}
          setSlot={(value) => {
            filter.slot = value;
            setFilter({ ...filter });
          }}
        />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <StatKeyInput
              sx={{ width: "100%" }}
              label={t("artifact:mainstat")!}
              keys={mainstatKey}
              key_={filter.mainstat}
              setKey={(value) => {
                filter.mainstat = value;
                setFilter({ ...filter });
              }}
              full
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SetInput
              sx={{ width: "100%" }}
              set={filter.set}
              setSet={(value) => {
                filter.set = value;
                setFilter({ ...filter });
              }}
            />
          </Grid>
        </Grid>

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
          <SortInput />
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
export default Editor;
