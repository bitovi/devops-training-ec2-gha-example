import type { FC, ReactNode } from "react"

import Header from "./components/Header"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
