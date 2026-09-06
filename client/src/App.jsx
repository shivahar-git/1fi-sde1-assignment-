import {
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";

import ProductPage from "./pages/ProductPage";


export default function App() {

  return (

    <div
      className="
        min-h-screen
        bg-[#f6f7f9]
      "
    >

      <Header />


      <Routes>

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/products/:slug"
          element={<ProductPage />}
        />


        <Route
          path="*"
          element={

            <main
              className="
                mx-auto
                max-w-6xl
                px-4
                py-20
                text-center
              "
            >

              <h1
                className="
                  text-4xl
                  font-black
                  text-slate-900
                "
              >
                404
              </h1>


              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Page not found.
              </p>

            </main>

          }
        />

      </Routes>


      <footer
        className="
          border-t
          border-slate-200
          bg-white
        "
      >

        <div
          className="
            mx-auto
            max-w-6xl
            px-4
            py-6
            text-center
            text-xs
            font-medium
            text-slate-400
            sm:px-6
          "
        >
          1Fi SDE1 Assignment Demo
          {" • "}
          Product & EMI Marketplace
        </div>

      </footer>

    </div>

  );
}
