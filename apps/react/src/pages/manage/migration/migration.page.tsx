import { useEffect } from "react";
import { getAllMigrations } from "./migration.api";

function Migration() {
  const api = getAllMigrations();

  useEffect(() => {
    api.useQuery();
  }, []);

  console.log(api);

  return <div>Migration</div>;
}

export default Migration;