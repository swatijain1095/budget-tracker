import { PiggyBank } from "lucide-react";
import React from "react";

function Logo() {
  return (
    <a href="/" className="flex flex-row items-center justify-center gap-2">
      <PiggyBank className="stroke h-12 w-12 stroke-fuchsia-400 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        Budget Tracker
      </p>
    </a>
  );
}

export const LogoMobile = () => {
  return (
    <a href="/" className="flex flex-row items-center justify-center gap-2">
      <p className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        Budget Tracker
      </p>
    </a>
  );
};

export default Logo;
