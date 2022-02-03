import { status as statusArray } from "./status";

export function getStatusAlias(status: number): string {
  return statusArray[status].alias;
}

export function getStatusColor(status: number): string {
  return statusArray[status].color;
}

export function getElapsedTime(
  time1: Date | string | number,
  time2?: Date | string | number
): number {
  const MOD = 1000;
  const elapsed = !time2
    ? (Date.now() - new Date(time1).getTime()) / MOD
    : Math.abs(new Date(time2).getTime() - new Date(time1).getTime()) / MOD;
  return elapsed;
}
