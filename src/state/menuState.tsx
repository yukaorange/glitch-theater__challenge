import { proxy } from "valtio";

type MenuState = {
  isOpen: boolean;
  toggle: () => void;
};

export const menuState = proxy<MenuState>({
  isOpen: false,
  toggle: () => {
    menuState.isOpen = !menuState.isOpen;
  },
});
