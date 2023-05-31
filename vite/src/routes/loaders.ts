import { getAllContents, getContentBySlug } from "@shared/services/content"
import { LoaderFunctionArgs } from "react-router-dom"

async function homeLoader() {
  const contents = await getAllContents()
  const toShow = contents?.slice(0, 9)

  const showing = toShow?.length
  const total = contents?.length

  return {
    contents: toShow,
    showing,
    total,
  }
}

async function contentLoader({ params }: LoaderFunctionArgs) {
  const content = await getContentBySlug(params?.slug?.split("-benchmark")?.[0] as string)
  return content
}

export { homeLoader, contentLoader }
