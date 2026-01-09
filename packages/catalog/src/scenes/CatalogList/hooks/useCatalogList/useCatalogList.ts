import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { fetchProducts } from "@services/product";

type FilterPriceEvent = { min: string; max: string };

export const useCatalogList = () => {
  const { category } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: category ? ["products", "category", category] : ["products"],
    queryFn: fetchProducts,
  });

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    function handlePriceFilterChange(ev: CustomEvent<FilterPriceEvent>) {
      setMinPrice(ev.detail.min);
      setMaxPrice(ev.detail.max);
    }

    window.addEventListener("catalog-filter-price", handlePriceFilterChange);

    return () => {
      window.removeEventListener(
        "catalog-filter-price",
        handlePriceFilterChange
      );
    };
  }, []);

  const searchedData = data?.filter((item) => {
    return !search || item.name.toLowerCase().includes(search.toLowerCase());
  });

  const filteredData = searchedData?.filter((item) => {
    return (
      (!+minPrice || item.price >= +minPrice) &&
      (!+maxPrice || item.price <= +maxPrice)
    );
  });

  return { catalogList: filteredData, isLoading, isError };
};
