import { Box, SxProps, Typography } from "@mui/material";

type TwoCellTextProp = {
  text1: string;
  text2: string;
  sx?: SxProps;
};
export const TwoCellText = (props: TwoCellTextProp) => {
  const { text1, text2, sx } = props;
  return (
    <Box display="flex" flexDirection="row" gap={1}>
      <Typography flexGrow={1} color="text.secondary" sx={sx}>
        {text1}
      </Typography>
      <Typography flexGrow={1} color="text.secondary" sx={sx}>
        {text2}
      </Typography>
    </Box>
  );
};
