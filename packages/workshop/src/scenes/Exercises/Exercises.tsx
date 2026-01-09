import type { FC } from "react";

import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import GettingSetup from "./components/GettingSetup";
import ConfiguringModuleFederation from "./components/ConfiguringModuleFederation";
import SharingCommonModules from "./components/SharingCommonModules";
import FaultTolerance from "./components/FaultTolerance";
import AddingMoreMicroFrontends from "./components/AddingMoreMicroFrontends";
import SettingUpRoutes from "./components/SettingUpRoutes";
import CheckoutFlow from "./components/CheckoutFlow";
import AddingItemsToCart from "./components/AddingItemsToCart";
import FilteringByPrice from "./components/FilteringByPrice";
import ShopCategories from "./components/ShopCategories";
import SearchingTheCatalog from "./components/SearchingTheCatalog";
import Conclusion from "./components/Conclusion";

const Workshop: FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route path="set-up" element={<GettingSetup />} />
        <Route path="exercise-1" element={<ConfiguringModuleFederation />} />
        <Route path="exercise-2" element={<SharingCommonModules />} />
        <Route path="exercise-3" element={<FaultTolerance />} />
        <Route path="exercise-4" element={<AddingMoreMicroFrontends />} />
        <Route path="exercise-5" element={<SettingUpRoutes />} />
        <Route path="exercise-6" element={<CheckoutFlow />} />
        <Route path="exercise-7" element={<AddingItemsToCart />} />
        <Route path="exercise-8" element={<FilteringByPrice />} />
        <Route path="exercise-9" element={<ShopCategories />} />
        <Route path="exercise-10" element={<SearchingTheCatalog />} />
        <Route path="complete" element={<Conclusion />} />
      </Route>
    </Routes>
  );
};

export default Workshop;
