
// A "time string" in HH:MM format (dynamic values allowed)
export type TimeStrings = `${number}${number}:${number}${number}`;


export function isTimeString(value: string): value is TimeStrings {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return false;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}
export interface BookingOrder {
  date: string;
  time: TimeStrings;
  customerName: string;
  createdAt: string;
}

