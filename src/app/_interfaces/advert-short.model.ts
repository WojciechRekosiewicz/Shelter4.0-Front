import { Guid } from "guid-typescript";
import { Url } from 'url';

export interface AdvertShort {
  advertId: number;
  title: string;
  reservingId: Guid;
  shortDescription: string;
  imageUrl: Url;
}
