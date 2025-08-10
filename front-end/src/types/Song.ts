export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  songUrl: string;
  userId?: string;
  likes?: number | string[];
  coverImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  publicId?: string;
  imageUrl?: string;
}
