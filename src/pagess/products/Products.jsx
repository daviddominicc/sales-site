import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getAllproductsByCategory } from "../../api/api";
import Spinner from "../../components/Spinner";
import ProductCard from "../../components/ProductCard";

export default function Products() {
  const { categoryName } = useParams();
  const { error, data, loading } = useFetch(
    getAllproductsByCategory,
    categoryName
  );

  return (
    <div className="max-w-[1024px] mx-auto py-6 px-4">
      <h1 className="uppercase my-4 font-semibold text-xl">{categoryName}</h1>
      {error && <span>{error}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {data?.products?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {data?.products?.map((product) => (
                    <ProductCard item={product} key={product.id}/>
                 ))}
            </div>
          ) : (
            <p>No product to display for this category.</p>
          )}
        </>
      )}
    </div>
)
}