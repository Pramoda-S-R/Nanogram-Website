import { Link, useLocation } from "react-router-dom";
import { BOTTOMBAR_ITEMS } from "../../constants";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {BOTTOMBAR_ITEMS.map(({ to, icon: Icon, label }) => {
        const isActive = pathname === to;

        return (
          <div
            key={label}
            className={`${
              isActive && "bg-primary p-2 rounded-lg text-neutral-white"
            }`}
          >
            <Link to={to}>
              <Icon />
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default Bottombar;
