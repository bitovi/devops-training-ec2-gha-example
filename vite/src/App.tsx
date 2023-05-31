import { RouterProvider } from "react-router"

import router from "./routes"
import Layout from "@shared/components/Layout"

function App() {
  return (
    <div className="App">
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </div>
  )
}

export default App
