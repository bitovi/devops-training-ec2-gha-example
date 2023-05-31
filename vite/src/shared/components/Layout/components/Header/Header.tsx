import type { FC } from "react"

import ContentfulImage from "@shared/components/ContentfulImage"

import styles from "./Header.module.css"

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.innerHeader}>
        <div className={styles.logo}>
          <a
            href="https://www.bitovi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <ContentfulImage
                src="https://images.ctfassets.net/ikiiay722ls1/2qUe8cPwWADJinF1eIFDEC/c01bce237678e8fcdf82442bfd3c4371/bitovi-logo-x2.png"
                alt="site-logo"
                width={338}
                height={129}
                sources={[
                  { breakpointMax: "40em", width: 85 },
                  { breakpointMin: "40em", breakpointMax: "60em", width: 105 },
                  { breakpointMin: "61em", width: 145 },
                ]}
                progressiveLoad={false}
              />
            </div>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
