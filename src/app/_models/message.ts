export interface Message {
    id?: number;
    sender_id?: number;
    receiver_id?: number;
    content?: string;
    read?: number;
    created_at?: string;
    updated_at?: string;
    my_comment?: boolean;
}
