import { ViewModel } from "@/store/types";
import { Link } from "react-router-dom";

interface NavSidebarProps  extends Partial<ViewModel> { 
  module?: string
};

export function NavSidebar({ module = '', views = {} }: NavSidebarProps) {

  const pages = views[module] || [];

  return <nav>
    {
      pages.map((view, index) => {
        return <Link key={index} to={`/${module}/${view.name}`}>{view?.name}</Link>
      })
    }
  </nav>;
}
