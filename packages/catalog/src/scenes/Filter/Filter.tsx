import { Container, Divider } from "@mantine/core";

import Categories from "./components/Categories";
import Filters from "./components/Filters/Filters";

import { Catalog } from "shared-types";

function broadcastPriceChange(min: string, max: string) {
  window.dispatchEvent(
    new CustomEvent("catalog-filter-price", {
      detail: {
        min,
        max,
      },
    })
  );
}

const Filter: Catalog.Filter = () => {
  return (
    <Container fluid px="md" w="350" py="lg">
      <Categories />
      <Divider mt="md" mb="lg" />
      <Filters onPriceChange={broadcastPriceChange} />
    </Container>
  );
};

export default Filter;
