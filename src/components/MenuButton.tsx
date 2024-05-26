import { menuState } from "@/state/menuState";

export const MenuButton = (): JSX.Element => {
  return (
    <button onClick={menuState.toggle} className="button-menu _en">
      menu
    </button>
  );
};
