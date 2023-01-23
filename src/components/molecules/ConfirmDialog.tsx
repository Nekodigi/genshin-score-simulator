/** @jsxImportSource @emotion/react */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { fontTypes } from "../../utils/styles/fonts";

type ConfirmDialogProps = {
  title: string;
  disc: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onOK: () => void;
  onCancel?: () => void;
};

export const ConfirmDialog = ({
  title,
  disc,
  open,
  setOpen,
  onOK,
  onCancel,
}: ConfirmDialogProps) => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle css={fontTypes(theme).title}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText css={fontTypes(theme).body}>
          {disc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
            onCancel && onCancel();
          }}
          css={[
            fontTypes(theme).body,
            { color: theme.palette.com.main["200"] },
          ]}
        >
          {t("action.cancel")}
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            onOK();
          }}
          css={[
            fontTypes(theme).body,
            { color: theme.palette.com.main["200"] },
          ]}
        >
          {t("action.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
