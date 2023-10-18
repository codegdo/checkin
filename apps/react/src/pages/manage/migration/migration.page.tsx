import { Link } from "react-router-dom";
import { useGetAllMigrations } from "./api";

function Migration() {
  const { isLoading, data } = useGetAllMigrations();

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <Link to={`./categories`}>Edit Migration Categories</Link>
        <Link to={`./scripts`}>Edit Migration Scripts</Link>
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