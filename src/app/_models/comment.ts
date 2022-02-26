import {User} from './user';

export interface Comment {
    id: number;
    comment: string;
    created_at: string;
    my_comment: boolean;
    user: User;
}
