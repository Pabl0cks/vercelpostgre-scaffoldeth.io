import React, { useEffect, useState } from "react";
import { Product, ProductList } from "~~/components/ProductList";

const Products = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredProductList, setFilteredProductList] = useState<Product[]>([]);

  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  const removeCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      const removedList = selectedCategories.filter(item => item !== category);
      setSelectedCategories(removedList);
    }
  };

  const resetCategory = () => {
    setSelectedCategories([]);
  };

  const addBrand = (brand: string) => {
    if (!selectedBrands.includes(brand)) {
      setSelectedBrands(prev => [...prev, brand]);
    }
  };

  const removeBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      const removedList = selectedBrands.filter(item => item !== brand);
      setSelectedBrands(removedList);
    }
  };

  const resetBrand = () => {
    setSelectedBrands([]);
  };

  useEffect(() => {
    if (selectedCategories.length === 0 && selectedBrands.length === 0) {
      setFilteredProductList(productList);
    } else {
      setFilteredProductList(
        productList.filter(
          item =>
            (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(item.brand)),
        ),
      );
    }
  }, [selectedCategories, selectedBrands, productList]);

  const getCategories = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      const arr = data.slice(0, 6);
      setCategories(arr);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      const updatedProducts: Product[] = data.products.map((product: Product) => ({
        ...product,
        brand: product.brand || "Unknown Brand",
      }));
      setProductList(updatedProducts);
      setFilteredProductList(updatedProducts);
      getCategories();
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-screen px-5 bg-gray-100 flex justify-center items-center">
      <div className="w-full h-[90%] rounded-md bg-white">
        <div className="relative w-full flex items-center overflow-x-auto">
          <div className="w-full flex-row items-start">
            {/* Category filter */}
            <div className="flex flex-row mr-5 flex-wrap p-8">
              <span className="mx-3 ml-5 font-medium"> Categories: </span>
              {categories.map(category => (
                <div
                  onClick={() => {
                    if (selectedCategories.includes(category)) {
                      removeCategory(category);
                    } else {
                      addCategory(category);
                    }
                  }}
                  className={`w-fit min-w-fit h-8 mx-2 px-5 py-2 flex flex-row justify-center items-center text-sm border break-keep rounded-3xl cursor-pointer transition-all duration-300 ${
                    selectedCategories.includes(category)
                      ? "border-blue-500 bg-blue-500 text-white"
                      : " border-blue-500 bg-white text-gray-900"
                  } `}
                  key={category}
                >
                  {category.split("-").join(" ")}
                </div>
              ))}
              <div
                onClick={() => resetCategory()}
                className={`${
                  selectedCategories.length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"
                } sticky right-0 w-fit h-full px-5 flex justify-center items-center text-blue-500 bg-white backdrop-blur-lg cursor-pointer hover:text-blue-700 transition-all duration-300`}
              >
                clear
              </div>
            </div>

            {/* Brand filter */}
            <div className="flex flex-row mr-5 flex-wrap p-8 gap-y-2">
              <span className="mx-3 ml-5 font-medium"> Brands: </span>
              {Array.from(new Set(productList.map(product => product.brand))).map(brand => (
                <div
                  onClick={() => {
                    if (selectedBrands.includes(brand)) {
                      removeBrand(brand);
                    } else {
                      addBrand(brand);
                    }
                  }}
                  className={`w-fit min-w-fit h-8 mx-2 px-5 py-2 flex flex-row justify-center items-center text-sm border break-keep rounded-3xl cursor-pointer transition-all duration-300 ${
                    selectedBrands.includes(brand)
                      ? "border-red-500 bg-red-500 text-white"
                      : " border-red-500 bg-white text-gray-900"
                  } `}
                  key={brand}
                >
                  {brand}
                </div>
              ))}
              <div
                onClick={() => resetBrand()}
                className={`${
                  selectedBrands.length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"
                } sticky right-0 w-fit h-full px-5 flex justify-center items-center text-blue-500 bg-white backdrop-blur-lg cursor-pointer hover:text-blue-700 transition-all duration-300`}
              >
                clear
              </div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <ProductList filteredProductList={filteredProductList} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Products;
