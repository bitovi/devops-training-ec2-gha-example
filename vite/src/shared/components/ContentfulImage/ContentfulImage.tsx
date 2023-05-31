import type { FC } from "react"

import "lazysizes"
import { Fragment } from "react"

export type ImageSource = {
  width: number
  quality?: number
  breakpointMax?: string
  breakpointMin?: string
}

const ContentfulImage: FC<{
  src: string
  alt: string
  width: number
  height: number
  sources: ImageSource[]
  progressiveLoad: boolean
}> = ({ src, alt, width, height, sources, progressiveLoad }) => {
  return (
    <picture>
      {sources?.map((source) => (
        <Fragment key={source.width}>
          <source
            type="image/webp"
            media={buildMediaQuery(source.breakpointMin, source.breakpointMax)}
            srcSet={
              progressiveLoad
                ? buildContentfulSrc(src, "webp", source.width / 10, 50)
                : buildContentfulSrc(src, "webp", source.width, source.quality)
            }
            data-srcset={buildContentfulSrc(
              src,
              "webp",
              source.width,
              source.quality,
            )}
          />
          <source
            type="image/png"
            media={buildMediaQuery(source.breakpointMin, source.breakpointMax)}
            srcSet={
              progressiveLoad
                ? buildContentfulSrc(src, "png", source.width / 10, 50)
                : buildContentfulSrc(src, "png", source.width, source.quality)
            }
            data-srcset={buildContentfulSrc(
              src,
              "png",
              source.width,
              source.quality,
            )}
          />
        </Fragment>
      ))}

      <img
        src={src}
        width={width}
        height={height}
        style={{ width: "100%", height: "auto" }}
        alt={alt}
        className="lazyload"
      />
    </picture>
  )
}

export default ContentfulImage

function buildContentfulSrc(
  src: string,
  format: string,
  width: number,
  quality = 75,
): string {
  const params = [
    typeof format !== "undefined" && "fm=" + format,
    typeof width !== "undefined" && "w=" + width,
    typeof quality !== "undefined" && "q=" + quality,
  ]
    .filter(Boolean)
    .join("&")

  return `${src}?${params}`
}

const buildMediaQuery = (
  min: string | undefined,
  max: string | undefined,
): string => {
  const mediaQuery = [
    typeof min !== "undefined" && `(min-width: ${min})`,
    typeof max !== "undefined" && `(max-width: ${max})`,
  ]
    .filter(Boolean)
    .join(" and ")

  return mediaQuery
}
