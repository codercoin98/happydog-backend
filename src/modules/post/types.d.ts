export interface PostCreateResult {
  _id: string;
  title: string;
  content: string;
  author: [
    {
      _id: string;
      nickname: string;
      avatar_url: string;
    }
  ];
  categories: string[];
  created_at: string;
}
export interface GetPostParams {
  currentPage: number;
  size: number;
}
