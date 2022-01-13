import { status as statusArray } from "./status";

export function getStatusAlias(status: number): string {
  return statusArray[status].alias;
}

export function getStatusColor(status: number): string {
  return statusArray[status].color;
}

export function getElapsedTime(time: Date | string | number): number {
  const elapsed = Math.floor(
    (new Date().getTime() - new Date(time).getTime()) / 1000
  );
  return elapsed;
}