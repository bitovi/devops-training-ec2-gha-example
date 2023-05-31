import type { FC } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Link } from "react-router-dom"

import type { Content } from "@shared/interfaces"

import styles from "./PageCard.module.css"
import ContentfulImage from "@shared/components/ContentfulImage"

const PageCard: FC<{ content: Content }> = ({ content }) => {
  return (
    <Link to={`/${content.slug}`}>
      <article className={styles.cardArticle}>
        <div className={styles.cardContainer}>
          <ContentfulImage
            src={content.image.url}
            alt={content.image.title}
            width={+content.image.width}
            height={+content.image.height}
            progressiveLoad={false}
            sources={[
              { breakpointMax: "500px", width: +content.image.width / 10 },
              {
                breakpointMin: "501px",
                breakpointMax: "768px",
                width: +content.image.width / 2,
              },
              { breakpointMin: "769px", width: +content.image.width },
            ]}
          />
          <div className={styles.cardMeta}>
            <div className={styles.cardTitle}>{content.name}</div>
            <div className={styles.cardSub}>
              {documentToReactComponents(content.description.json)}
            </div>
            <div className={styles.price}>
              <span>{`$${content.price / 100}`}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PageCard
