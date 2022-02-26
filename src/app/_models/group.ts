import { Activity } from './activity';
import {User} from './user';

export interface Group {
    id: number;
    name: string;
    branch: string;
    cover_image?: string;
    description: string;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    my_group: boolean;
    membership: number;
    group_type: string;
    nr_members: number;
    user?: User;
}
