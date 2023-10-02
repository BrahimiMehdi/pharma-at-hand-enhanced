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
type YearType = {
  title: string;
  drives: DriveType[];
  createdAt: string;
  updatedAt: string;
  slug:string;
  guide:ArticleType;  
};
type NavLinksType = {
 
    link:string;
    name:string;
    isActive?:boolean;
    icon:JSX.Element
 
}[]
