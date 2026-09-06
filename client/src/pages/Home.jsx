import {
  useEffect,
  useState
} from "react";

import {
  ArrowRight,
  Database,
  ShieldCheck,
  Sparkles
} from "lucide-react";

import ProductCard from "../components/ProductCard";

import {
  getProducts
} from "../services/api";


export default function Home() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    getProducts()

      .then((data) => {
        setProducts(data);
      })

      .catch((err) => {
        setError(err.message);
      })

      .finally(() => {
        setLoading(false);
      });

  }, []);


  return (

    <main>

      {/* HERO */}

      <section
        className="
          bg-gradient-to-br
          from-violet-700
          via-violet-600
          to-indigo-700
          text-white
        "
      >

        <div
          className="
            mx-auto
            max-w-6xl
            px-4
            py-14
            sm:px-6
            sm:py-20
          "
        >

          <div className="max-w-3xl">

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/10
                px-4
                py-2
                text-xs
                font-bold
                uppercase
                tracking-widest
                ring-1
                ring-white/20
              "
            >

              <Sparkles size={14} />

              Smart EMI marketplace

            </span>


            <h1
              className="
                mt-6
                text-4xl
                font-black
                tracking-tight
                sm:text-6xl
              "
            >
              Buy premium devices
              with flexible EMI plans.
            </h1>


            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-violet-100
                sm:text-lg
              "
            >
              Compare monthly payments,
              tenure, interest and cashback
              before choosing the plan that
              works for you.
            </p>

          </div>


          <div
            className="
              mt-10
              grid
              max-w-3xl
              grid-cols-1
              gap-3
              sm:grid-cols-3
            "
          >

            <div
              className="
                rounded-xl
                bg-white/10
                p-4
                ring-1
                ring-white/15
              "
            >

              <ShieldCheck size={20} />

              <p
                className="
                  mt-2
                  text-sm
                  font-bold
                "
              >
                Secure plans
              </p>

            </div>


            <div
              className="
                rounded-xl
                bg-white/10
                p-4
                ring-1
                ring-white/15
              "
            >

              <Database size={20} />

              <p
                className="
                  mt-2
                  text-sm
                  font-bold
                "
              >
                Live DB data
              </p>

            </div>


            <div
              className="
                rounded-xl
                bg-white/10
                p-4
                ring-1
                ring-white/15
              "
            >

              <ArrowRight size={20} />

              <p
                className="
                  mt-2
                  text-sm
                  font-bold
                "
              >
                Simple checkout
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* PRODUCTS */}

      <section
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
            mb-8
            flex
            items-end
            justify-between
            gap-4
          "
        >

          <div>

            <p
              className="
                text-sm
                font-bold
                uppercase
                tracking-widest
                text-violet-600
              "
            >
              Products
            </p>

            <h2
              className="
                mt-1
                text-3xl
                font-black
                text-slate-900
              "
            >
              Choose your device
            </h2>

          </div>


          <p
            className="
              hidden
              text-sm
              text-slate-500
              sm:block
            "
          >
            {products.length} products available
          </p>

        </div>


        {/* LOADING */}

        {loading && (

          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="
                  h-96
                  animate-pulse
                  rounded-2xl
                  bg-slate-200
                "
              />

            ))}

          </div>

        )}


        {/* ERROR */}

        {error && (

          <div
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-5
              text-sm
              font-semibold
              text-red-700
            "
          >
            {error}

            <br />

            Make sure the backend and
            PostgreSQL database are running.
          </div>

        )}


        {/* PRODUCTS */}

        {!loading &&
          !error && (

            <div
              className="
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >

              {products.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          )}

      </section>

    </main>

  );
}
