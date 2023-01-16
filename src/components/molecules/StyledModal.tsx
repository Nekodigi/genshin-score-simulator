import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Box, Modal, SxProps, useTheme } from "@mui/material";
import { IconButton } from "./IconButton";

type StyledModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
export const StyledModal = ({ open, onClose, children }: StyledModalProps) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={style}
        display="flex"
        flexDirection="column"
        gap={1.5}
        style={{ background: theme.palette.local.modal }}
      >
        <IconButton
          icon={faClose}
          color={theme.palette.error.dark}
          onClick={onClose}
        />
        {children}
      </Box>
    </Modal>
  );
};
const style: SxProps = {
  position: "absolute" as "absolute",
  outline: "none",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 390,
  width: "100vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};
