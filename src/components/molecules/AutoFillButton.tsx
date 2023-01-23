import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Box, CircularProgress, LinearProgress, useTheme } from "@mui/material";
import cv, { Mat } from "@techstark/opencv-js";
import { useContext, useEffect, useCallback } from "react";
import Tesseract, { createWorker } from "tesseract.js";
import { Artifact } from "../../utils/class/Artifact";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { IconTextButton } from "./IconTextButton";
import { useRef, useState } from "react";
import { imreadUrl } from "../../utils/func/opencv";
import { ArtifactScan, ScanRes2GOOD } from "../../utils/func/artifactScan";
import { useTranslation } from "react-i18next";

const AutoFillButton = () => {
  let { editor } = useContext(EditorContext);
  const dummyImgRef = useRef<HTMLCanvasElement>(null);
  const [templateImgs, setTemplateImgs] = useState<Mat[] | undefined>();
  const [worker, setWorker] = useState<Tesseract.Worker>();
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation(["editor", "common"]);

  let scale = 1.5; //small faster large precise

  const loadTemplate = async () => {
    let i1 = await imreadUrl("template/right.png");
    cv.resize(i1, i1, new cv.Size(i1.size().width / 2, i1.size().height / 2));
    let i2 = await imreadUrl("template/left.png");
    cv.resize(i2, i2, new cv.Size(i2.size().width / 2, i2.size().height / 2));
    let i3 = await imreadUrl("template/mid.png");
    cv.resize(i3, i3, new cv.Size(i3.size().width / 2, i3.size().height / 2));
    setTemplateImgs([i1, i2, i3]);
    //console.log("SET IMAGE");
    return [i1, i2, i3];
  };

  const initWorker = async () => {
    let worker = await createWorker(); //{logger: (m) => console.log(m), // Add logger here}
    await worker.loadLanguage("eng+jpn");
    await worker.initialize("eng+jpn");
    setWorker(worker);
  };

  useEffect(() => {
    if (templateImgs) return;
    initWorker();
    cv["onRuntimeInitialized"] = async () => {
      let templateImgs_ = await loadTemplate();
      const pasteFunc = (e) => pasteImage(e.clipboardData.files, templateImgs_);
      window.addEventListener("paste", pasteFunc);
      return () => {
        window.removeEventListener("paste", pasteFunc);
      };
    };
  }, []);

  const theme = useTheme();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (
      e.target.files === null ||
      e.target.files.length === 0 ||
      templateImgs === undefined
    )
      return;
    setArtifactFromImage(e.target.files[0], templateImgs as Mat[]);
    e.target.files = null;
  };

  const pasteImage = (files: Blob, templateImgs: Mat[]) => {
    if (files === null || templateImgs === undefined) return;
    setArtifactFromImage(files[0], templateImgs);
  };

  const setArtifactFromImage = async (file: Blob, templateImgs: Mat[]) => {
    if (worker === undefined) await loadTemplate();
    editor.setInfo({ sevarity: "info", text: t("common:info.loadStart") });
    let url = URL.createObjectURL(file);
    setImgSrc(url);
    //try {
    //let path = URL.createObjectURL(file);
    let i = await imreadUrl(url);
    try {
      let res = await ArtifactScan(
        i,
        scale,
        templateImgs[1],
        templateImgs[0],
        templateImgs[2],
        dummyImgRef,
        worker
      );
      console.log(res);
      console.log(res.warning, res.error);
      let good = ScanRes2GOOD(res);
      editor.setArtifact(good);
      console.log(good);
      if (res.warning.length === 0 && res.error.length === 0) {
        editor.setInfo({
          sevarity: "success",
          text: t("common:info.loadSuccess"),
        });
      } else {
        editor.setInfo({
          sevarity: "warning",
          text: t("common:info.loadWarning"),
        });
      }
    } catch (e) {
      console.log("CANNOT READ", e);
      editor.setInfo({ sevarity: "error", text: t("common:info.loadFailed") });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {worker !== undefined && templateImgs !== undefined ? (
        <IconTextButton
          text={t("editor.uploadScreenShot")!}
          icon={faCamera}
          color={theme.palette.info.dark}
        >
          <input onChange={uploadImage} type="file" accept="image/*" hidden />
          <canvas ref={dummyImgRef} style={{ display: "none" }} />
        </IconTextButton>
      ) : (
        <CircularProgress />
      )}
      {/* <img
        style={{ padding: 16, maxHeight: 256, objectFit: "contain" }}
        src={imgSrc}
      /> */}
    </Box>
  );
};
export default AutoFillButton;
