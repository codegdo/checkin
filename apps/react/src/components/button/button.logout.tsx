import { useAction } from "@/hooks";

export function ButtonLogout() {
  const { logoutSession } = useAction();

  const handleClick = () => {
    logoutSession();
  }

  return (
    <button type="button" onClick={handleClick}>logout</button>
  );
}