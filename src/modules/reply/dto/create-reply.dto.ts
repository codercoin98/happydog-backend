export class CreateReplyDto {
  post_id: string;
  content: string;
  user_id: string;
  reply_to_user_id: string;
  reply_to_comment_id: string;
  reply_to_reply_id?: string;
}
