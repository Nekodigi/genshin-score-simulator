import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import Tesseract from "tesseract.js";
import { Artifact } from "../../utils/class/Artifact";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { IconTextButton } from "./IconTextButton";

export const AutoFillButton = () => {
  let { editor } = useContext(EditorContext);
  const theme = useTheme();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    setArtifactFromImage(e.target.files[0]);
  };

  const pasteImage = (files) => {
    setArtifactFromImage(files[0]);
  };

  useEffect(() => {
    const pasteFunc = (e) => pasteImage(e.clipboardData.files);
    window.addEventListener("paste", pasteFunc);
    return () => {
      window.removeEventListener("paste", pasteFunc);
    };
  }, []);

  const setArtifactFromImage = async (file) => {
    let path = URL.createObjectURL(file);
    let result = await Tesseract.recognize(path, "jpn");
    console.log(result.data);
    let text = result.data.text;
    let artifact_ = Artifact.fromString(text);
    editor.setArtifact(artifact_);
    console.log(text);
  };

  return (
    <IconTextButton
      text="Upload Screen Shot"
      icon={faCamera}
      color={theme.palette.info.dark}
    >
      <input hidden onChange={uploadImage} type="file" accept="image/*" />
    </IconTextButton>
  );
};
