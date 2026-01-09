import { Grid } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";

import ExerciseList from "./components/ExerciseList";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <Grid w="100%" px="lg">
      <Grid.Col span={{ sm: 12, md: 3 }}>
        <ExerciseList />
      </Grid.Col>
      <Grid.Col span={{ sm: 12, md: 9 }}>
        <Outlet />
      </Grid.Col>
    </Grid>
  );
};

export default Layout;
