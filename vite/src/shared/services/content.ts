import type { Content } from "@shared/interfaces"

import { fetchGraphQL } from "./contentful"

type FetchResponse<T> = {
  errors?: Error[]
  data: {
    productCollection: {
      items: T[]
    }
  }
}

export async function getAllContents(): Promise<Content[]> {
  const entries = await fetchGraphQL<FetchResponse<Content>>(
    `query {
      productCollection {
        items {
          name
          slug
          price
          image {
            title
            url
            width
            height
          }
          description {
            json
          }
        }
      }
    }`,
  )

  return extractContentEntries(entries)
}

export async function getContentBySlug(slug: string): Promise<Content> {
  const data = await fetchGraphQL<FetchResponse<Content>, { slug: string }>(
    `query getPage($slug: String!) {
      productCollection(where:{slug: $slug}, limit: 1) {
        items {
          name
          slug
          price
          image {
            title
            url
            width
            height
          }
          description {
            json
          }
        }
      }
    }`,
    { slug },
  )

  return extractContentEntries(data)?.[0]
}

function extractContentEntries(
  fetchResponse: FetchResponse<Content>,
): Content[] {
  if (fetchResponse.errors) {
    throw new Error(
      fetchResponse.errors.map((error: Error) => error.message).join("\n"),
    )
  }

  // ENV var for benchmarking. If its not provided, the normal app functionality will occur
  if (!import.meta.env.VITE_NUMBER_OF_PAGES) {
    return fetchResponse?.data?.productCollection?.items
  }

  // Build extra pages
  const pages = fetchResponse?.data?.productCollection?.items
  const numberOfPages = Number(import.meta.env.VITE_NUMBER_OF_PAGES) - pages.length

  const extraPagesForBenchmarking = Array.from({ length: numberOfPages}).map(
    (_item, index) => {
      const pageIndex = index % pages.length

      return {
        ...pages[pageIndex],
        slug: `${pages[pageIndex].slug}-benchmark-${index}`,
      }
    },
  )

  return [...pages, ...extraPagesForBenchmarking]
}
