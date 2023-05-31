import { useLoaderData } from "react-router"

import type { Content } from "@shared/interfaces"

import PageCard from "./components/PageCard"

import styles from "./Home.module.css"

interface HomeProps {
  contents: Content[]
  showing: number
  total: number
}

const Home = () => {
  const { contents, showing, total } = useLoaderData() as HomeProps;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {contents?.map((content) => (
          <PageCard key={content.slug} content={content} />
        ))}
      </div>
      <button
        className={styles.banner}
      >{`Showing ${showing} of ${total}`}</button>
    </div>
  )
}

export default Home
