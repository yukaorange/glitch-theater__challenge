import { useSnapshot } from "valtio";
import { menuState } from "@/state/menuState";

export const Sns = (): JSX.Element => {
  const snap = useSnapshot(menuState);

  return (
    <>
      <div className="sns _en" data-open={menuState.isOpen}>
        <div className="sns__links">
          <a target="_blank" href="https://github.com/yukaorange" className="">
            github
          </a>
          <a target="_blank" href="https://x.com/home?lang=ja" className="">
            twitter
          </a>
        </div>
      </div>
    </>
  );
};
