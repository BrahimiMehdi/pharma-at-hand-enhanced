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
  const {years} = await client.request<{years:YearType[]}>(query)
  return years
};
export const getYear = async (slug:string) => {
  const query = gql`
    query Years($slug:String!) {
      years(where: {slug: $slug}) {
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
  const {years} = await client.request<{years:YearType[]}>(query,{slug:slug})
  return years[0]
};
