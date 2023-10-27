import { Link } from "react-router-dom";
import { useGetAllMigrations } from "./api";

function Migration() {
  const { status, isLoading, isDelay, isAbort, data, controller } = useGetAllMigrations();

  console.log(status);

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isDelay) {
    return <div>delayed...</div>
  }

  if (isAbort) {
    return <div>wanna to abort... <button onClick={() => { controller.abort() }}>Cancel</button></div>
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