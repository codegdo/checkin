import { ViewModel } from "@/store/types";
import { Link } from "react-router-dom";

interface NavMenuProps extends Partial<ViewModel> {};

export function NavMenu({ modules = [] }: NavMenuProps) {
  return <nav>
    {
      modules.map((module, index) => (
        <Link key={index} to={`/${module.name}`}>{module.name}</Link>
      ))
    }
  </nav>;
}
