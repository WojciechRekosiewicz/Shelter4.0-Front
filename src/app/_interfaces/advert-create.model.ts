import { Guid } from 'guid-typescript';
import { Url } from 'url';

export interface AdvertCreateModel {
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: Url;
}
