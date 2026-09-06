import {
  Link
} from "react-router-dom";

import {
  ArrowRight
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


export default function ProductCard({
  product
}) {

  const variant =
    product.variants[0];


  return (

    <Link
      to={`/products/${product.slug}`}

      className="
        product-card
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-soft
        transition
        hover:-translate-y-1
      "
    >

      <div
        className="
          relative
          h-64
          overflow-hidden
          bg-slate-50
        "
      >

        <img
          src={variant.imageUrl}
          alt={`${product.name} ${variant.name}`}
          className="
            product-card-image
            h-full
            w-full
            object-cover
          "
          loading="lazy"
        />


        <span
          className="
            absolute
            left-4
            top-4
            rounded-full
            bg-white
            px-3
            py-1
            text-xs
            font-bold
            text-emerald-700
            shadow
          "
        >
          EMI AVAILABLE
        </span>

      </div>


      <div className="p-5">

        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-violet-600
          "
        >
          {product.brand}
        </p>


        <h2
          className="
            mt-1
            text-xl
            font-extrabold
            text-slate-900
          "
        >
          {product.name}
        </h2>


        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          {variant.name}
        </p>


        <div
          className="
            mt-4
            flex
            items-end
            justify-between
          "
        >

          <div>

            <p
              className="
                text-2xl
                font-black
                text-slate-900
              "
            >
              {money(variant.price)}
            </p>

            <p
              className="
                text-xs
                text-slate-400
                line-through
              "
            >
              {money(variant.mrp)}
            </p>

          </div>


          <span
            className="
              grid
              h-10
              w-10
              place-items-center
              rounded-full
              bg-violet-50
              text-violet-700
              transition
              group-hover:bg-violet-600
              group-hover:text-white
            "
          >

            <ArrowRight size={18} />

          </span>

        </div>

      </div>

    </Link>

  );
}
