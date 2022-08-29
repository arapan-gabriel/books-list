export interface BookInterface extends CreateBookInterface {
  id: number;
}

export interface CreateBookInterface {
  image: String | null;
  title: String;
  author: String;
  genre: String;
}

