import type { FC } from "react";

import ExerciseLayout from "../../shared/components/ExerciseLayout";

import { Alert, Code, Text } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { IconInfoCircle } from "@tabler/icons-react";

const code = `const searchFilter = (item: CatalogItem) => {
  return !search || item.name.toLowerCase().includes(search.toLowerCase());
}`;

const params = `const [searchParams, setSearchParams] = useSearchParams();
`;

const SearchingTheCatalog: FC = () => {
  return (
    <ExerciseLayout
      title="Searching the Catalog"
      previous="../exercise-9"
      next="../complete"
    >
      <Text>
        You may continue from your work on the previous exercise, or check out a
        clean branch using the command below.
      </Text>
      <CodeHighlight my="lg" code="git checkout soln/shop-categories" />
      <Text>
        Let's finish our journey through URL-based communication for
        micro-frontends. The last big missing piece of functionality is our
        search.
      </Text>
      <Text pt="md">
        The search functionality needs to be added to the URL using a query
        parameter called search in the <Code>useSearch</Code> hook within the
        search micro-frontend (<Code>catalog/search</Code>). The hook is already
        wired up to the search bar. The query parameters can be accessed and
        changed via:
      </Text>
      <CodeHighlight my="lg" code={params} />
      <Alert
        icon={<IconInfoCircle />}
        title="Want to add some additional features?"
      >
        Ideally, this type of functionality is tied to a debounce, which is a
        mechanism that delays a the set state's execution to reduce re-renders
        (or data fetches) and make the experience less jarring. Most component
        libraries with hook utilities, which Mantine has, have a debounce hook.
        To improve the search UX wire the search params and the debounce hook
        from
        <CodeHighlight
          my="lg"
          code={`import { useDebouncedValue } from "@mantine/hooks";`}
        />
      </Alert>
      <Text pt="md">
        Once added, the catalog list needs to be updated based on the newly
        added search parameter. Update the <Code>useCatalogList</Code> hook to
        filter the data based on the search text. A filter is provided below for
        convenience.
      </Text>
      <CodeHighlight code={code} my="lg" />
    </ExerciseLayout>
  );
};

export default SearchingTheCatalog;
