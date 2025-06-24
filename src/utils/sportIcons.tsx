import {
  MdSportsSoccer,
  MdSportsTennis,
  MdSportsBasketball,
  MdSportsBaseball,
  MdSportsHockey,
  MdPool,
  MdDirectionsRun,
} from "react-icons/md";
import { type ComponentType } from "react";

const SPORT_ICONS: Record<
  string,
  ComponentType<{ size?: number; className?: string }>
> = {
  football: MdSportsSoccer,
  tennis: MdSportsTennis,
  basketball: MdSportsBasketball,
  baseball: MdSportsBaseball,
  hockey: MdSportsHockey,
  swimming: MdPool,
  athletics: MdDirectionsRun,
};

export const getSportIcon = (code: string | null | undefined) => {
  if (!code) {
    return MdDirectionsRun;
  }
  return SPORT_ICONS[code] || MdDirectionsRun;
};
