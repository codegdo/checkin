import { FetchStatus } from "@/hooks";

interface LoaderProp {
  status: FetchStatus;
  controller: AbortController
}
export function Loader({ status, controller }: LoaderProp) {
  switch (status) {
    case FetchStatus.Loading:
      return <div>loading...</div>;
    case FetchStatus.Delay:
      return <div>delayed...</div>;
    case FetchStatus.Abort:
      return (
        <div>
          wanna to abort... <button onClick={() => { controller.abort() }}>Ok</button>
        </div>
      );
    default:
      return null;
  }
}