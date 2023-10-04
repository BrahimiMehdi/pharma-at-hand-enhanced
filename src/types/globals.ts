type DriveType = {
  name: string;
  link: string;
  isMain:boolean;
};
type ImageType={
  url:string;
  width:number;
  height:number
}
type AuthorType = {
  name:string;
  description:string;
  instagram:string;
  articles:ArticleType[];
  photo:ImageType
}
type ArticleType = {
  title: string;
  description: string;
  slug: string;
  image:ImageType;
  content:any;
  author:AuthorType
};
type ModuleType = {
  name:string;
  coeff:number;
  image:ImageType;
  year:YearType;
  tp:boolean;
  video:{
    name:string;
    link:string;
  }[]
  color:{
    hex:string;
  }
}
interface ColumnType extends ModuleType{
  T1?:number;
  T2?:number;
  T3?:number;
  TP?:number | string;
  total:number;
  moyenne?:number;
  moyenneSansTp?:number;
}

type YearType = {
  title: string;
  drives: DriveType[];
  slug:string;
  guide?:ArticleType;
  modules:ModuleType[];
};
type ClubType = {
  name: string;
  instagram: string;
  website?: string;
  description:string;
  logo:ImageType;  
};
type NavLinksType = {
 
    link:string;
    name:string;
    isActive?:boolean;
    icon:JSX.Element
 
}[]
