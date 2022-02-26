import { Activity } from './activity';

export interface Company {
    id: number;
    firm: string;
    addition: string;
    street: string;
    branch: string;
    website: string;
    cover_image: string;
    nr_subscribers: number;
    has_subscribed: boolean;
    activities: Activity[];
    description: string;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    logo: string;
}
