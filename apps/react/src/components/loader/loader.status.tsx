import { FetchStatus } from "@/hooks";

interface LoaderProp {
  status: keyof typeof FetchStatus;
  controller: AbortController
}
export function Loader({ status, controller }: LoaderProp) {
  switch (status) {
    case 'LOADING':
      return <div>loading...</div>;
    case 'DELAY':
      return <div>delayed...</div>;
    case 'ABORT':
      return (
        <div>
          wanna to abort... <button onClick={() => { controller.abort() }}>Ok</button>
        </div>
      );
    default:
      return null;
  }
}