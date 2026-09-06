import {
  CheckCircle2
} from "lucide-react";


const money = (value) =>
  new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }
  ).format(value);


export default function EmiPlanCard({
  plan,
  selected,
  onSelect
}) {

  return (

    <button
      type="button"
      onClick={onSelect}

      className={`
        w-full
        rounded-xl
        border
        p-4
        text-left
        transition

        ${
          selected

            ? `
              border-violet-600
              bg-violet-50
              ring-2
              ring-violet-100
            `

            : `
              border-slate-200
              bg-white
              hover:border-violet-300
              hover:bg-slate-50
            `
        }
      `}
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <span
            className={`
              grid
              h-5
              w-5
              place-items-center
              rounded-full
              border

              ${
                selected

                  ? `
                    border-violet-600
                    bg-violet-600
                    text-white
                  `

                  : `
                    border-slate-300
                  `
              }
            `}
          >

            {selected && (
              <CheckCircle2 size={14} />
            )}

          </span>


          <div>

            <p
              className="
                text-lg
                font-extrabold
                text-slate-900
              "
            >
              {money(
                plan.monthlyPayment
              )}

              <span
                className="
                  ml-1
                  text-xs
                  font-semibold
                  text-slate-500
                "
              >
                / month
              </span>

            </p>


            <p
              className="
                mt-1
                text-xs
                font-semibold
                text-slate-500
              "
            >
              {plan.tenureMonths} months
            </p>

          </div>

        </div>


        <span
          className={`
            whitespace-nowrap
            text-sm
            font-bold

            ${
              plan.interestRate === 0
                ? "text-emerald-600"
                : "text-slate-700"
            }
          `}
        >
          {plan.interestRate}% interest
        </span>

      </div>


      {plan.cashback > 0 && (

        <p
          className="
            mt-3
            pl-8
            text-xs
            font-semibold
            text-emerald-600
          "
        >
          Additional cashback of{" "}
          {money(plan.cashback)}
        </p>

      )}

    </button>

  );
}
