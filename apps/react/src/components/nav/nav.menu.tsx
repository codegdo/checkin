import { Link } from "react-router-dom";

interface NavMenuProps {
  modules?: Record<string, string>;
  views?: Record<string, Record<string, string>[]>;
}

export function NavMenu({ views }: NavMenuProps) {
  const renderedObject = views && Object.keys(views).map((key) => {
    const viewItems = views[key];

    // Render each view item in the current view type
    return viewItems.map((item, index) => (
      <Link key={index} to={`/${key}/${item.name}`}>{item.name}</Link>
    ));
  });

  return <nav>{renderedObject}</nav>;
}
