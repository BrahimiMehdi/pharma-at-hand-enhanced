
import { Nav } from "./Nav";
type Props = {
  children: React.ReactNode;
  NavLinks : NavLinksType;
  slug:string | string[]
};

function NavLayout({ children,NavLinks ,slug}: Props) {

  return (
    <div className="flex relative pl-80">
      <Nav slug={slug} links={NavLinks} />
      <div className="w-full lg:border-l">{children}</div>
    </div>
  );
}

export default NavLayout;
