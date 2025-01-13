export type Movie = {
  id: string;
  name: string;
  imageUrl: string;
  rating: string;
  showTime: string;
  layout: {
    rows: number;
    columns: number;
    seats: {
      gold: {
        row: number;
        price: number;
      };
      silver: {
        row: number;
        price: number;
      };
      platinum: {
        row: number;
        price: number;
      };
    };
  };
};
