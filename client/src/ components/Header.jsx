import {
  Link
} from "react-router-dom";

import {
  ShieldCheck
} from "lucide-react";


export default function Header() {

  return (

    <header className="border-b border-slate-200 bg-white">

      <div
        className="
          mx-auto
          flex
          max-w-6xl
          items-center
          justify-between
          px-4
          py-4
          sm:px-6
        "
      >

        <Link
          to="/"
          className="flex items-center gap-2"
        >

          <div
            className="
              grid
              h-9
              w-9
              place-items-center
              rounded-lg
              bg-violet-600
              font-black
              text-white
            "
          >
            1F
          </div>


          <div>

            <p
              className="
                text-lg
                font-extrabold
                leading-none
                text-slate-900
              "
            >
              1Fi
            </p>

            <p
              className="
                mt-1
                text-[10px]
                font-semibold
                uppercase
                tracking-widest
                text-violet-600
              "
            >
              Smart EMI
            </p>

          </div>

        </Link>


        <div
          className="
            hidden
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-500
            sm:flex
          "
        >

          <ShieldCheck
            size={17}
            className="text-emerald-600"
          />

          Secure EMI plans

        </div>

      </div>

    </header>

  );
}
