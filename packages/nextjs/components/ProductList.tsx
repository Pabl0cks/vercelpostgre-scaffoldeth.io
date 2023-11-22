import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Address } from "~~/components/scaffold-eth";

export interface Product {
  id: string;
  thumbnail: string;
  title: string;
  category: string;
  brand: string;
  description: string;
  // Add other properties based on your actual data structure
}

interface ProductListProps {
  filteredProductList: Product[];
  loading: boolean;
}

export function ProductList({ filteredProductList, loading }: ProductListProps) {
  if (loading) return <>Loading</>;
  return (
    <div className="w-full h-[85%]">
      <div className="w-full">Products: </div>
      <div className="w-full h-full flex flex-wrap gap-4 justify-left items-start overflow-y-auto">
        {filteredProductList.map(product => (
          <div
            key={product.id}
            className="w-[48%] md:w-[31.5%] xl:w-[23.5%] h-fit my-3 rounded-xl overflow-hidden border border-gray-200 "
          >
            <img src={product.thumbnail} alt="product" className="w-full h-36 object-cover" />
            <div className="mt-2 mb-2 px-3">
              <div className="font-semibold flex flex-row justify-between">
                {product.title.length > 25 ? product.title.substring(0, 22) + "..." : product.title}
                <button className="text-sm outline outline-1 p-1 rounded-md outline-gray-300">
                  <HeartIcon className="inline-block h-5 w-5" /> 0
                </button>
              </div>
              {/* Displaying description */}
              <div className="text-sm text-gray-600 pt-1 pb-2">{product.description}</div>
              {/* Displaying category */}
              <div className="flex flex-row flex-wrap gap-1">
                <div className="text-xs text-indigo-600 py-2">
                  <span className="bg-indigo-100 mr-1 mb-1 py-1 px-2 rounded-2xl">{product.category}</span>
                </div>
                {/* Displaying brand */}
                <div className="text-xs text-red-600 py-2">
                  <span className="bg-red-100 mr-1 mb-1 py-1 px-2 rounded-2xl">{product.brand}</span>
                </div>
                {/* Displaying builder */}
                <div className="w-full flex justify-between pt-4 pb-2">
                  <div className="text-sm text-gray-600">
                    Built by:{" "}
                    <Address size="xs" disableAddressLink address="0x34aA3F359A9D614239015126635CE7732c18fDF3" />
                  </div>
                  <div>
                    <button className="p-1 text-sm outline outline-1 rounded-md outline-gray-300">View details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
