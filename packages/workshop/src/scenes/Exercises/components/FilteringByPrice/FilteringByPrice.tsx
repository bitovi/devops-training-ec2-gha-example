import type { FC } from "react";

import { Text, Code } from "@mantine/core";

import ExerciseLayout from "../../shared/components/ExerciseLayout";
import { CodeHighlight } from "@mantine/code-highlight";

const useQuery = `const { data, isLoading, isError } = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
});`;

const theFilter = `const filterForPrice = (item: CatalogItem): boolean => {
  return (!+minPrice || item.price >= +minPrice) && (!+maxPrice || item.price <= +maxPrice);
};
`;

const filterComponent = `const Filter: Catalog.Filter = () => {
  return (
    <Container fluid px="md" w="350" py="lg">
      <Categories />
      <Divider mt="md" mb="lg" />
      <Filters onPriceChange={() => {/** Add dispatch here */}} />
    </Container>
  );
};`;

const FilteringByPrice: FC = () => {
  return (
    <ExerciseLayout
      title="Filtering by Price"
      previous="../exercise-7"
      next="../exercise-9"
      slides="https://davidnic11.github.io/workshop-enterprise-grade-micro-frontends/07-eventing-pub-sub"
    >
      <Text>
        You may continue from your work on the previous exercise, or check out a clean branch using the command below.
      </Text>
      <CodeHighlight my="lg" code="git checkout soln/adding-items-to-cart" />
      <Text>
        Another area we need to add custom eventing to is the catalog filter. Like the cart, we need to set up the
        state, the listeners, and the dispatching. All of the logic should be added to the catalog project, the types in
        the catalog section of <Code>shared-types</Code>. The event should be called <Code>catalog-filter-price</Code>{" "}
        and have a detail of the following shape.
      </Text>
      <CodeHighlight my="lg" code="type FilterPriceEvent = { min: string; max: string };" />
      <Text>
        The min and max should correspond to the input to the min and max text fields in the <Code>Filters</Code>{" "}
        component.
      </Text>
      <Text pt="md">
        The listener should be added to the <Code>useCatalogList</Code> hook in <Code>CatalogList</Code>. The list
        itself comes out of the <Code>useQuery</Code> hook as data.
      </Text>
      <CodeHighlight my="lg" code={useQuery} />
      <Text>
        The data will need to be filtered based on the min and max from the event. You can use the following filter
        function to achieve this
      </Text>
      <CodeHighlight my="lg" code={theFilter} />
      <Text>
        You can add the dispatching of the event to the
        <Code>Filter</Code> component (<Code>catalog/src/scenes/Filter/Filter.tsx</Code>) using the{" "}
        <Code>onPriceChange</Code> prop that is currently empty. The function will give you the <Code>min</Code> and{" "}
        <Code>max</Code> values when the input is updated.
      </Text>
      <CodeHighlight my="lg" code={filterComponent} />
    </ExerciseLayout>
  );
};

export default FilteringByPrice;
