import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Sparkles
} from "lucide-react";

import EmiPlanCard from "../components/EmiPlanCard";

import {
  getProduct
} from "../services/api";


const money = (value) =>
  new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }
  ).format(value);


export default function ProductPage() {

  const { slug } = useParams();


  const [product, setProduct] =
    useState(null);

  const [variantId, setVariantId] =
    useState("");

  const [selectedPlanId, setSelectedPlanId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [proceeded, setProceeded] =
    useState(false);


  useEffect(() => {

    setLoading(true);

    setError("");


    getProduct(slug)

      .then((data) => {

        setProduct(data);

        setVariantId(
          data.variants[0]?.id || ""
        );

        setSelectedPlanId(
          data.variants[0]
            ?.emiPlans[0]
            ?.id || ""
        );

      })

      .catch((err) => {
        setError(err.message);
      })

      .finally(() => {
        setLoading(false);
      });

  }, [slug]);


  const variant = useMemo(

    () =>
      product?.variants.find(
        (item) =>
          item.id === variantId
      ),

    [product, variantId]

  );


  const selectedPlan =
    variant?.emiPlans.find(
      (plan) =>
        plan.id === selectedPlanId
    );


  const selectVariant = (id) => {

    setVariantId(id);

    const nextVariant =
      product.variants.find(
        (item) => item.id === id
      );

    setSelectedPlanId(
      nextVariant?.emiPlans[0]?.id || ""
    );

    setProceeded(false);
  };


  if (loading) {

    return (

      <main
        className="
          mx-auto
          max-w-6xl
          px-4
          py-12
          sm:px-6
        "
      >

        <div
          className="
            h-[600px]
            animate-pulse
            rounded-3xl
            bg-slate-200
          "
        />

      </main>

    );

  }


  if (
    error ||
    !product ||
    !variant
  ) {

    return (

      <main
        className="
          mx-auto
          max-w-6xl
          px-4
          py-16
          sm:px-6
        "
      >

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-violet-700
          "
        >

          <ArrowLeft size={16} />

          Back to products

        </Link>


        <div
          className="
            mt-8
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-6
            text-red-700
          "
        >
          {error || "Product not found"}
        </div>

      </main>

    );

  }


  return (

    <main
      className="
        mx-auto
        max-w-6xl
        px-4
        py-8
        sm:px-6
        sm:py-12
      "
    >

      <Link
        to="/"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-bold
          text-slate-500
          transition
          hover:text-violet-700
        "
      >

        <ArrowLeft size={16} />

        All products

      </Link>


      <div
        className="
          mt-6
          grid
          gap-8
          lg:grid-cols-[0.9fr_1.1fr]
        "
      >

        {/* PRODUCT */}

        <section
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-soft
            sm:p-7
          "
        >

          <div
            className="
              mb-5
              flex
              items-center
              justify-between
            "
          >

            <span
              className="
                rounded-full
                bg-emerald-50
                px-3
                py-1
                text-xs
                font-extrabold
                text-emerald-700
              "
            >
              NEW
            </span>


            <span
              className="
                text-xs
                font-semibold
                text-slate-400
              "
            >
              {product.variants.length}
              {" "}
              variants
            </span>

          </div>


          <div
            className="
              overflow-hidden
              rounded-2xl
              bg-slate-50
            "
          >

            <img
              src={variant.imageUrl}
              alt={`${product.name} ${variant.name}`}
              className="
                h-[380px]
                w-full
                object-cover
                sm:h-[470px]
              "
            />

          </div>


          <div className="mt-6">

            <p
              className="
                text-sm
                font-bold
                uppercase
                tracking-widest
                text-violet-600
              "
            >
              {product.brand}
            </p>


            <h1
              className="
                mt-1
                text-3xl
                font-black
                text-slate-900
              "
            >
              {product.name}
            </h1>


            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              "
            >
              {product.description}
            </p>

          </div>


          {/* VARIANTS */}

          <div className="mt-6">

            <p
              className="
                mb-3
                text-sm
                font-extrabold
                text-slate-900
              "
            >
              Select variant
            </p>


            <div
              className="
                grid
                gap-3
                sm:grid-cols-2
              "
            >

              {product.variants.map(
                (item) => (

                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      selectVariant(item.id)
                    }

                    className={`
                      rounded-xl
                      border
                      p-4
                      text-left
                      transition

                      ${
                        item.id === variantId

                          ? `
                            border-violet-600
                            bg-violet-50
                          `

                          : `
                            border-slate-200
                            hover:border-violet-300
                          `
                      }
                    `}
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-2
                      "
                    >

                      <span
                        className="
                          text-sm
                          font-extrabold
                          text-slate-900
                        "
                      >
                        {item.name}
                      </span>


                      {item.id ===
                        variantId && (

                        <span
                          className="
                            grid
                            h-5
                            w-5
                            place-items-center
                            rounded-full
                            bg-violet-600
                            text-white
                          "
                        >

                          <Check
                            size={13}
                          />

                        </span>

                      )}

                    </div>


                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      {item.color}
                    </p>

                  </button>

                )
              )}

            </div>

          </div>

        </section>


        {/* EMI */}

        <section>

          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-soft
              sm:p-7
            "
          >

            <div
              className="
                flex
                flex-wrap
                items-end
                justify-between
                gap-4
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-500
                  "
                >
                  {variant.name}
                </p>


                <div
                  className="
                    mt-1
                    flex
                    items-end
                    gap-3
                  "
                >

                  <p
                    className="
                      text-4xl
                      font-black
                      tracking-tight
                      text-slate-900
                    "
                  >
                    {money(variant.price)}
                  </p>


                  <p
                    className="
                      pb-1
                      text-sm
                      text-slate-400
                      line-through
                    "
                  >
                    {money(variant.mrp)}
                  </p>

                </div>

              </div>


              <div
                className="
                  rounded-xl
                  bg-emerald-50
                  px-4
                  py-3
                  text-right
                "
              >

                <p
                  className="
                    text-xs
                    font-bold
                    text-emerald-700
                  "
                >
                  SAVE
                </p>


                <p
                  className="
                    text-sm
                    font-black
                    text-emerald-800
                  "
                >
                  {money(
                    variant.mrp -
                    variant.price
                  )}
                </p>

              </div>

            </div>


            {/* EMI TITLE */}

            <div
              className="
                mt-8
                flex
                items-center
                gap-2
                border-b
                border-slate-200
                pb-4
              "
            >

              <CreditCard
                size={19}
                className="text-violet-600"
              />


              <h2
                className="
                  text-lg
                  font-black
                  text-slate-900
                "
              >
                EMI plans backed by
                mutual funds
              </h2>

            </div>


            {/* PLANS */}

            <div className="mt-4 space-y-3">

              {variant.emiPlans.map(
                (plan) => (

                  <EmiPlanCard
                    key={plan.id}
                    plan={plan}

                    selected={
                      plan.id ===
                      selectedPlanId
                    }

                    onSelect={() => {

                      setSelectedPlanId(
                        plan.id
                      );

                      setProceeded(
                        false
                      );

                    }}
                  />

                )
              )}

            </div>


            {/* INFO */}

            <div
              className="
                mt-5
                flex
                items-start
                gap-3
                rounded-xl
                bg-slate-50
                p-4
              "
            >

              <ShieldCheck
                className="
                  mt-0.5
                  shrink-0
                  text-emerald-600
                "
                size={19}
              />


              <p
                className="
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                EMI information is loaded
                from the backend database.
                Choose a plan to continue.
              </p>

            </div>


            {/* PROCEED */}

            <button
              type="button"

              disabled={!selectedPlan}

              onClick={() =>
                setProceeded(true)
              }

              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-violet-600
                px-5
                py-4
                text-sm
                font-extrabold
                text-white
                shadow-lg
                shadow-violet-200
                transition
                hover:bg-violet-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              Proceed with selected plan

              <ChevronRight
                size={18}
              />

            </button>


            {/* SUCCESS */}

            {proceeded &&
              selectedPlan && (

                <div
                  className="
                    mt-4
                    rounded-2xl
                    border
                    border-emerald-200
                    bg-emerald-50
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >

                    <div
                      className="
                        grid
                        h-9
                        w-9
                        shrink-0
                        place-items-center
                        rounded-full
                        bg-emerald-600
                        text-white
                      "
                    >

                      <Check size={18} />

                    </div>


                    <div>

                      <p
                        className="
                          font-extrabold
                          text-emerald-900
                        "
                      >
                        Plan selected
                      </p>


                      <p
                        className="
                          mt-1
                          text-sm
                          leading-6
                          text-emerald-800
                        "
                      >
                        {money(
                          selectedPlan.monthlyPayment
                        )}

                        {" "}per month for{" "}

                        {selectedPlan.tenureMonths}
                        {" "}months at{" "}

                        {selectedPlan.interestRate}%
                        {" "}interest.
                      </p>


                      <p
                        className="
                          mt-2
                          text-xs
                          font-bold
                          text-emerald-700
                        "
                      >
                        This demo stops before
                        payment/KYC.
                      </p>

                    </div>

                  </div>

                </div>

              )}

          </div>


          {/* EXTRA INFO */}

          <div
            className="
              mt-5
              grid
              gap-4
              sm:grid-cols-2
            "
          >

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
              "
            >

              <Sparkles
                className="text-violet-600"
                size={20}
              />

              <p
                className="
                  mt-3
                  font-extrabold
                  text-slate-900
                "
              >
                Flexible tenures
              </p>


              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Compare short and long
                repayment options.
              </p>

            </div>


            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
              "
            >

              <ShieldCheck
                className="text-emerald-600"
                size={20}
              />


              <p
                className="
                  mt-3
                  font-extrabold
                  text-slate-900
                "
              >
                Transparent pricing
              </p>


              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                See interest and cashback
                before proceeding.
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>

  );
}
