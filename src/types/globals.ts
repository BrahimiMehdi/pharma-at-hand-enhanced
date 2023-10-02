
type DriveType = {
  name: string;
  link: string;
  isMain:boolean;
};
type YearType = {
  title: string;
  drives: DriveType[];
  createdAt: string;
  updatedAt: string;
  slug:string;
};
type NavLinksType = {
 
    link:string;
    name:string;
    isActive?:boolean;
    icon:JSX.Element
 
}[]
