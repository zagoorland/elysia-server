export interface BaseItemDto {
  description: string;
  duration: number;
  end: Date;
  id: string;
  imageUrl: string;
  playUrl: string;
  posterImg: string;
  progress: number;
  publishDate: Date;
  start: Date;
  subTitle: string;
  tags: string[];
  title: string;
}

export interface SeasonItemDto {
  id: number;
  title: string;
  episodes: BaseItemDto[];
}

export interface SeriesItemDto {
  id: number;
  title: string;
  seasons: SeasonItemDto[];
}
