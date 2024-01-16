export function checkValidEmail(email: string | null | undefined): boolean {
  if (!email) {
    return true;
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}