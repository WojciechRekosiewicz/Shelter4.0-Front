import { Guid } from "guid-typescript";
import { Url } from 'url';

export interface Advert {
  advertId: number;
  title: string;
  authorId: Guid;
  reservingId: Guid;
  shortDescription: string;
  longDescription: string;
  imageUrl: Url;
}
