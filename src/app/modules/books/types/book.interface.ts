export interface BookInterface extends CreateBookInterface {
  id: number;
}

export interface CreateBookInterface {
  image: string | null;
  title: string;
  author: string;
  genre: string;
}

