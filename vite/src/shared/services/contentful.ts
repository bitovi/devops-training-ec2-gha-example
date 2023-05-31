export async function fetchGraphQL<Response, Variables = never>(
  query: string,
  variables?: Variables,
): Promise<Response> {
  const contentfulSpaceID = import.meta.env.VITE_CONTENTFUL_SPACE_ID
  const contentfulAccessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN

  if (!contentfulSpaceID || !contentfulAccessToken) {
    throw new Error(
      "Missing environment variable CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN",
    )
  }

  const contentfulResponse = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${contentfulAccessToken}`,
      },
      body: JSON.stringify({ query, variables }),
    },
  )

  const fetchedData = await contentfulResponse.json()
  return fetchedData
}
