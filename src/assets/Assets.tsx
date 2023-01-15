import flower from './icon_slot_flower.png'
import plume from './icon_slot_plume.png'
import sands from './icon_slot_sands.png'
import goblet from './icon_slot_goblet.png'
import circlet from './icon_slot_circlet.png'
import { SvgIcon } from '@mui/material'

const Assets = {
  slot: {
    flower,
    plume,
    sands,
    goblet,
    circlet,
  },
  svg: {
    anvil: <SvgIcon>
      <path fill="currentColor" d="M9 5v5c4.03 2.47-.56 4.97-3 6v3h15v-3c-6.41-2.73-3.53-7 1-8V5H9M2 6c.81 2.13 2.42 3.5 5 4V6H2Z" />
    </SvgIcon>
  }
} as const;
export default Assets;
