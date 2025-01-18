
// Post type
export interface PostType {
    id: string;
    title: string;
    user_id: string;
    content: string;
    author: string;
    created_at: Date;
    updated_at?: Date;
}
