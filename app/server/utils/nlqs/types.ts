export interface NLQSDocument {
  id: number;
  name: string;
  genre: string;
  reach: string;
  content: string;
}

export interface NLQSSearchResult {
  ids: number[];
  scores: number[];
}
