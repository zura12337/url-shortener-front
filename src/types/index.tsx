export interface UrlType {
  originalUrl: string;
  id: string;
  shortUrl: string;
  visitors: [{ date: string; ip: string }];
  uniqueVisitors: [{ date: string; ip: string }];
  generatedBy: [string];
  date: string;
}

export interface UrlMetadataType {
  title: string;
  image: string;
}

export interface UserType {
  ip: string;
  visitedLinks: [string];
}
