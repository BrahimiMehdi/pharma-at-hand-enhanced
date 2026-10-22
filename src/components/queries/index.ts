import { gql } from "graphql-request";
import { request } from "@/lib/client";
import { EventType } from "react-hook-form";

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
          departement {
            name
            slug
          }
        }
      }
    }
  `;
  const { years } = await request<{ years: YearType[] }>(query);
  return years;
};
/** Slug and title only, for the sidebar year switcher. Reuses the cached years query. */
export const getYearLinks = async () => {
  const years = await getYears();
  return years.map(({ slug, title }) => ({ slug, title }));
};
export const getPrayers = async () => {
  const query = gql`
    query Years {
      prayers {
        prayer
      }
    }
  `;
  const { prayers } = await request<{ prayers: Prayer[] }>(query);
  return prayers;
};
export const getDepartements = async () => {
  const query = gql`
    query Deps {
        departements{
          name
          slug
        }
      }
    
  `;
  const { departements } = await request<{ departements: DepartmentType[] }>(query);
  return departements;
};
export const getClubs = async () => {
  const query = gql`
    query Clubs {
      clubs(first: 100) {
        name
        instagram
        website
        description
        logo {
          url
          width
          height
        }
      }
    }
  `;
  const { clubs } = await request<{ clubs: ClubType[] }>(query);
  return clubs;
};
export const getYear = async (slug: string) => {
  const query = gql`
    query Years($slug: String!) {
      years(where: { slug: $slug }) {
        slug
        title
        drives(first:100) {
          isMain
          link
          name
          departement {
            name
            slug
          }
        }
        modules {
          color {
            hex
          }
          name
          tp
          cours{
            name
            video{
              name
              link
              isEnglish
              isWeb
            }
          }
          video {
            name
            link
            isEnglish
            isWeb
          }
          image {
            height
            url
            width
          }
          coeff
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
  const { years } = await request<{ years: YearType[] }>(query, { slug: slug });
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
  const { articles } = await request<{ articles: ArticleType[] }>(query);
  return articles;
};
export const getEvents = async () => {
  const query = gql`
    query Events {
      past: events(where: { isUpcoming: false }) {
        author {
          instagram
          name
          description
          photo {
            width
            url
            height
          }
        }
        date
        description
        isUpcoming
        link
        location
        image {
          url
          width
          height
        }
        title
      }
      upcoming: events(where: { isUpcoming: true }) {
        author {
          instagram
          name
          description
          photo {
            width
            url
            height
          }
        }
        date
        description
        isUpcoming
        link
        location
        image {
          url
          width
          height
        }
        title
      }
    }
  `;
  const { past, upcoming } = await request<{ past: EventsType[]; upcoming: EventsType[] }>(query);
  return { past, upcoming };
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
  const { articles } = await request<{ articles: ArticleType[] }>(query, { slug: slug });
  return articles[0];
};
