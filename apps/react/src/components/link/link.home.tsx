import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface LinkHomeProp extends PropsWithChildren { }

export function LinkHome({ children }: LinkHomeProp) {
  return <Link to="/">{children}</Link>
}