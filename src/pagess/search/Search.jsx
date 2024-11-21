import { searchProduct } from "../../api/api";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";
import useFetch from "../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [SearchParams] = useSearchParams();
  const query = SearchParams.get("query");
  const { data, error, loading } = useFetch(searchProduct, query);
  console.log(data);
  return (
    <div className="max-w-[1024px] mx-auto py-6 px-4 ">
       <h1 className="text-xl">
        Search results for <strong>{query} :</strong>{" "} <span className="mx-2">{data?.products?.length} product(s) found</span>
       </h1>
       <div className="mt-6">
       {error && <span>{error}</span>}
       {loading ? <Spinner/>:
         <>
         {data?.products?.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {data?.products?.map((product) => (
                    <ProductCard item={product} key={product.id}/>
                 ))}
            </div> : <p>No results found</p>}
         </>
       }

       </div>
    </div>
  );
}
