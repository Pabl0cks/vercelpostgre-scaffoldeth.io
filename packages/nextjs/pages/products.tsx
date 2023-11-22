import React, { useEffect, useState } from "react";
import { Product, ProductList } from "~~/components/ProductList";

const Products = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredProductList, setFilteredProductList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleSearch = () => {
    // Filter based on search query and selected categories/brands
    const filteredList = productList.filter(
      item =>
        (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(item.brand)) &&
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    setFilteredProductList(filteredList);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (selectedCategories.length === 0 && selectedBrands.length === 0 && searchQuery === "") {
      setFilteredProductList(productList);
    } else {
      setFilteredProductList(
        productList.filter(
          item =>
            (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(item.brand)) &&
            (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())),
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
        description: product.description || "No description",
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
    <div className="px-5 bg-gray-100 flex justify-center items-center">
      <div className="w-full h-[90%] rounded-md bg-white">
        {/* Search bar */}
        <div className="p-6">
          <input
            type="text"
            placeholder="Search Builds"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress} // Trigger search on 'Enter' key press
            className="border rounded-md p-2"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-2 rounded-md ml-2">
            Search
          </button>
        </div>
        <div className="relative w-full flex items-center overflow-x-auto">
          <div className="w-full flex-row items-start">
            {/* Category filter */}
            <div className="flex flex-row mr-5 flex-wrap p-6">
              <span className="font-medium mr-5"> Categories: </span>
              {categories.map(category => (
                <div
                  onClick={() => {
                    if (selectedCategories.includes(category)) {
                      removeCategory(category);
                    } else {
                      addCategory(category);
                    }
                  }}
                  className={`w-fit min-w-fit h-6 mx-1 px-2 py-1 flex flex-row justify-center items-center text-sm border break-keep rounded-3xl cursor-pointer transition-all duration-300 text-xs ${
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
                clear category filter
              </div>
            </div>

            {/* Brand filter */}
            <div className="flex flex-row mr-5 flex-wrap p-6 gap-y-2">
              <span className="font-medium mr-5"> Brands: </span>
              {Array.from(new Set(productList.map(product => product.brand))).map(brand => (
                <div
                  onClick={() => {
                    if (selectedBrands.includes(brand)) {
                      removeBrand(brand);
                    } else {
                      addBrand(brand);
                    }
                  }}
                  className={`w-fit min-w-fit h-6 mx-1 px-2 py-1 flex flex-row justify-center items-center text-sm border break-keep rounded-3xl cursor-pointer transition-all duration-300 text-xs ${
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
                clear brand filter
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <ProductList filteredProductList={filteredProductList} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Products;
