/** @jsxImportSource @emotion/react */

import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { fontTypes } from "../../utils/styles/fonts";
import { css } from "@emotion/react";
import { useState } from "react";
import { slotKey, slotKeyType } from "../../utils/consts/Artifact";
import { slotDef } from "../../utils/consts/Slot";
import FontAwesomeSvgIcon from "../atoms/FontAwesomeSvgIcon";
import chroma from "chroma-js";

type SlotOptionProps = {
  slot: slotKeyType[];
  setSlot: (value: slotKeyType[]) => void;
};

//Display value will be rounded!
//x < 10 digit 1 after decimal point
//x > 10 integer


export const SlotOption = (props: SlotOptionProps) => {
  const { slot, setSlot } = props;
  const theme = useTheme();
  const disc = css([
    fontTypes(theme).disc,
    { textTransform: "none", color: theme.palette.com.white },
  ]);

  return (
    <ToggleButtonGroup
      aria-label="outlined primary button group"
      value={slot}
      exclusive
      onChange={(e, newValue) => {
        slot.length !== 5 && slot.includes(newValue)
          ? setSlot(["flower", "plume", "sands", "goblet", "circlet"])
          : setSlot([newValue]);
      }}
      sx={{ height: 32, flexGrow: 1 }}
      css={disc}
    >
      {slotKey.map((option, i) => (
        <ToggleButton
          key={i}
          value={option}
          css={{
            "&.Mui-selected": {
              background: theme.palette.com.main["L500"],
              ":hover": {
                background: chroma(theme.palette.com.main["L500"])
                  .darken()
                  .hex(),
              },
              ":focus": { background: theme.palette.com.main["L500"] },
            },
          }}
          sx={{
            ":hover": {
              bgcolor: chroma(theme.palette.com.main["L500"]).darken().hex(),
            },
            ":focus": { bgcolor: "inherit" },

            borderRadius: i === 0 ? 0 : "inherit",
            flexGrow: 1,
            px: 0,
          }}
        >
          <FontAwesomeSvgIcon
            icon={slotDef[option].icon}
            fontSize="small"
            style={{ color: theme.palette.com.white }}
          />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
