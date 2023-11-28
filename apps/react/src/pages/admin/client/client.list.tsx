import { Loader } from "@/components";
import { useGetAllClients, useGetClientSwitch } from "./api";

function Client() {

  const { status, data, controller } = useGetAllClients();
  const { query } = useGetClientSwitch();

  if (!data) {
    return <Loader status={status} controller={controller} />
  }

  const handleClick = (id: number) => {
    query({ url: `/admin/clients/${id}` });
  }

  return (
    <div>
      {
        data?.map(({ companyId, companyName }) => {
          return <button key={companyId} type="button" onClick={() => handleClick(companyId)}>{companyName}</button>
        })
      }

    </div>
  );
}

export default Client;