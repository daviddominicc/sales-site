import { Link } from "react-router-dom";
import { getAllproducts } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import BestSeller from "./components/BestSeller";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Homes() {
  const [product, setProduct] = useState([]);
  const { error, data, loading } = useFetch(getAllproducts);

  console.log(product);

  useEffect(() => {
    const lastSelected = localStorage.getItem("lastSelected");
    const lastTimeStamp = localStorage.getItem("lastTimeStamp");
    const now = Date.now();

    if (data?.products?.length > 0) {
      if (
        !lastSelected ||
        !lastTimeStamp ||
        now - lastTimeStamp > 2 * 60 * 1000
      ) {
        const randomProductIndex = Math.floor(
          Math.random() * data?.products?.length
        );
        setProduct([data.products[randomProductIndex]]);
        localStorage.setItem("lastSelected", randomProductIndex);
        localStorage.setItem("lastTimeStamp", now);
      } else {
        setProduct([data?.products[lastSelected]]);
      }
    }
  }, [data.products]);

  return (
    <div className="max-w-[1024px] mt-[3rem] mx-auto py-6 px-4">
      {error && <span>{error}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {product?.map((item) => (
            <div key={item.id} className="flex flex-col-reverse md:flex-row h-[500px]">
              <div className="md:w-[50%] flex items-center justify-center">
                <div className="text-center fl">
                  <h1 className="text-xl mb-4">Product of the day </h1>
                  <h1 className="text-5xl font-bold mb-4">{item.title}</h1>
                  <p className="text-2xl">{formatCurrency(item.price)}</p>
                  <Link to={`/product/${item.id}`}>
                    <button className="bg-slate-800 text-zinc-50 p-3 rounded-full w-[200px] hover:opacity-90 mt-6">
                      View Product
                    </button>
                  </Link>
                </div>
              </div>
              <div className="md:w-[50%]">
                <LazyLoadImage
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full"
                  effect="blur"
                />
              </div>
            </div>
          ))}
        </>
      )}
      <BestSeller products={data.products}/>
    </div>
  );
}
