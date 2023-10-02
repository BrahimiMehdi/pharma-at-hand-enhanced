import { gql } from "graphql-request";
import client from "@/lib/client";

export const getYears = async () => {
  const query = gql`
    query Years {
      years {
        slug
        title
        drives {
          isMain
          link
          name
        }
      }
    }
  `;
  const { years } = await client.request<{ years: YearType[] }>(query);
  return years;
};
export const getYear = async (slug: string) => {
  const query = gql`
    query Years($slug: String!) {
      years(where: { slug: $slug }) {
        slug
        title
        drives {
          isMain
          link
          name
        }
        guide: article {
          author {
            name
            instagram
            photo {
              height
              url
              width
            }
            description
          }
          content {
            raw
          }
          image {
            url
            width
            height
          }
          description
          slug
          title
        }
      }
    }
  `;
  const { years } = await client.request<{ years: YearType[] }>(query, { slug: slug });
  return years[0];
};
export const getArticles = async () => {
  const query = gql`
    query Articles {
      articles {
        author {
          name
          instagram
          photo {
            height
            url
            width
          }
          description
        }
        content {
          raw
        }
        image {
          url
          width
          height
        }
        description
        slug
        title
      }
    }
  `;
  const { articles } = await client.request<{ articles: ArticleType[] }>(query);
  return articles;
};
export const getArticle = async (slug: string) => {
  const query = gql`
    query Articles($slug: String!) {
      articles(where: { slug: $slug }) {
        author {
          name
          instagram
          photo {
            height
            url
            width
          }
          description
        }
        content {
          raw
        }
        image {
          url
          width
          height
        }
        description
        slug
        title
      }
    }
  `;
  const { articles } = await client.request<{ articles: ArticleType[] }>(query, { slug: slug });
  return articles[0];
};
