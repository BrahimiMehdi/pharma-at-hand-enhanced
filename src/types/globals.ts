type DriveType = {
  name: string;
  link: string;
  isMain: boolean;
  departement:DepartmentType;
};
type Prayer{
  prayer:string;
}
type ImageType = {
  url: string;
  width: number;
  height: number;
};
type AuthorType = {
  name: string;
  description: string;
  instagram: string;
  articles: ArticleType[];
  photo: ImageType;
  events?:EventsType[];
};
type ArticleType = {
  title: string;
  description: string;
  slug: string;
  image: ImageType;
  content: any;
  author: AuthorType;
};
type ModuleType = {
  name: string;
  coeff: number;
  image: ImageType;
  year: YearType;
  tp: boolean;
  video: {
    name: string;
    link: string;
    isEnglish: boolean;
  }[];
  color: {
    hex: string;
  };
};
type MoyenState = { module: ModuleType; moyenne: number; moycoeff: number };
interface ColumnType extends ModuleType {
  T1?: number | string;
  T2?: number | string;
  T3?: number | string;
  TP?: number | string;
  total: number;
  moyenne?: number;
  moycoeff?: number;
}
type EventsType = {
  title:string;
  description:string;
  isUpcoming:boolean;
  location:string;
  image:ImageType;
  link:string;
  author:AuthorType;
  date:string;
}
type DepartmentType={
  name:string;
  slug:string;
}
type YearType = {
  title: string;
  drives: DriveType[];
  slug: string;
  guide?: ArticleType;
  modules: ModuleType[];
};
type ClubType = {
  name: string;
  instagram: string;
  website?: string;
  description: string;
  logo: ImageType;
};
type NavLinksType = {
  link: string;
  name: string;
  isActive?: boolean;
  icon: JSX.Element;
}[];
