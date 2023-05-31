import { createHashRouter } from "react-router-dom"

import Home from "@scenes/Home"
import ContentDetail from "@scenes/Content"
import { contentLoader, homeLoader } from "./loaders"


const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: "/:slug",
    element: <ContentDetail />,
    loader: contentLoader,
  },
])

export default router
