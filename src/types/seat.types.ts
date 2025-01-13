export type Tier = "Silver" | "Gold" | "Platinum";

export type Seat = {
  id: string;
  row: number;
  column: number;
  price: number;
  tier: Tier;
  isSelected: boolean;
  isBooked: boolean;
};
