import type { FC } from "react";

import { Alert, Anchor, Code, Text } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { IconInfoCircle } from "@tabler/icons-react";

import ExerciseLayout from "../../shared/components/ExerciseLayout";

const catalogList = `const CatalogList = () => {
  throw new Error("whoops")

  return ...
}`;

const errorBoundary = `import { ErrorBoundary } from "react-error-boundary";

// ...

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <Suspense>
    <MFE />
  </Suspense>
</ErrorBoundary>`;

const FaultTolerance: FC = () => {
  return (
    <ExerciseLayout
      title="Fault Tolerance"
      next="../exercise-4"
      previous="../exercise-2"
      slides="https://davidnic11.github.io/workshop-enterprise-grade-micro-frontends/05-fault-tolerant-composition"
    >
      <Text>
        Currently, if an MFE goes down, our entire application goes down, which,
        considering most of our MFEs are not "mission critical", this is an
        issue.
      </Text>
      <Alert
        title="Want to See it in Action?"
        icon={<IconInfoCircle />}
        my="xl"
      >
        If you want to see it in action, throw an error in any component in an
        MFE.
        <CodeHighlight my="lg" code={catalogList} />
      </Alert>
      <Text>
        If the Filter MFE goes down, our customers should still be able to shop
        in the catalog, just in a limited capacity.
      </Text>
      <Text pt="md">
        To remedy this, the shell application needs to wrap our MFEs in a
        suspense boundary and an error boundary. Rather than creating an error
        boundary from scratch, we will use{" "}
        <Anchor href="https://www.npmjs.com/package/react-error-boundary">
          react-error-boundary.
        </Anchor>
      </Text>
      <Text pt="lg">
        You may continue from your work on the previous exercise, or check out a
        clean branch using the command below.
      </Text>
      <CodeHighlight my="lg" code="git checkout soln/sharing-common-modules" />

      <Text pt="md">
        To use <Code>react-error-boundary</Code>.
      </Text>
      <CodeHighlight my="lg" code={errorBoundary} />
      <Text>
        Add error boundaries to each of the MFEs the shell application is
        currently using. The fallbacks can be as intricate or plain as you'd
        like - feel free to explore using Mantine to create more elaborate
        fallbacks.
      </Text>
    </ExerciseLayout>
  );
};

export default FaultTolerance;
