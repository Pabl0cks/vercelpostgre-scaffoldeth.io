import React from "react";

export interface Product {
  id: string;
  thumbnail: string;
  title: string;
  category: string;
  brand: string;
  // Add other properties based on your actual data structure
}

interface ProductListProps {
  filteredProductList: Product[];
  loading: boolean;
}

export function ProductList({ filteredProductList, loading }: ProductListProps) {
  if (loading) return <>Loading</>;
  return (
    <div className="w-full h-[85%] px-5">
      <div className="w-full">Products: </div>
      <div className="w-full h-full flex flex-wrap gap-1 justify-left items-start overflow-y-auto">
        {filteredProductList.map(product => (
          <div key={product.id} className="w-[19%] h-fit my-3 rounded-xl overflow-hidden border border-gray-200">
            <img src={product.thumbnail} alt="product" className="w-full h-28 object-cover" />
            <div className="mt-2 mb-2 px-3">
              <div className="font-semibold">
                {product.title.length > 25 ? product.title.substring(0, 22) + "..." : product.title}
              </div>
              <div className="text-sm text-gray-600 py-2">
                <span className="border-solid border-2 border-indigo-600 mr-1 mb-1 py-1 px-3 rounded-3xl">
                  {product.category}
                </span>
              </div>
              {/* Displaying brand */}
              <div className="text-sm text-gray-600 py-2">
                <span className="border-solid border-2 border-red-600 mr-1 mb-1 py-1 px-3 rounded-3xl">
                  {product.brand}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
