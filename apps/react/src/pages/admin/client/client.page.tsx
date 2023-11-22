import { useFetch } from "@/hooks";
import { useGetAllClients } from "./api";

function Client() {

  const { status, isLoading, isDelay, isAbort, data, controller } = useGetAllClients();
  const api = useFetch();

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

  if(api.isSuccess && api.data) {
    
  }

  const handleClick = (id:number) => {
    console.log(id);
    api.query({url: `/admin/clients/${id}`})
  }

  return (
    <div>
      {
        data?.map(({companyId, companyName}) => {
          return <button key={companyId} type="button" onClick={() => handleClick(companyId)}>{companyName}</button>
        })
      }
      
    </div>
  );
}

export default Client;

function useGetLoginClient(): { status: any; isLoading: any; isDelay: any; isAbort: any; data: any; controller: any; } {
  throw new Error("Function not implemented.");
}
