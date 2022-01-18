interface Status {
  alias: string;
  color: string;
}

export const status: Status[] = [
  { alias: "Pending1", color: "orange" },
  { alias: "Staged", color: "blue" },
  { alias: "Pending2", color: "purple" },
  { alias: "Included", color: "green" },
  { alias: "Discarded", color: "red" },
];
