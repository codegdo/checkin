import { Link } from "react-router-dom";
import { useGetAllMigrations } from "./api";
import { Loader } from "@/components";

function Migration() {
  const { status, data, controller } = useGetAllMigrations();

  console.log(status);

  if (!data) {
    return <Loader status={status} controller={controller} />
  }

  return (
    <div>
      <div>
        <Link to={`../migration-categories`}>Edit Migration Categories</Link>
        <Link to={`../migration-scripts`}>Edit Migration Scripts</Link>
      </div>
      {
        data?.map((item) => {
          return <div key={item.id}><Link to={`./${item.id}`}>{item.name}</Link></div>
        })
      }
    </div>
  );
}

export default Migration;