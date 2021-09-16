export const hourToMinutes = (time: string): number => {

  const [hours, minutes] = time.replace(/[^0-9:]/g, "").trim().split(':');

  return Number(hours) * 60 + Number(minutes);

}