import {City} from './city';

export interface User {
    id: number;
    city?: City;
    country?: string;
    role_id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    email_verified_at?: string;
    address?: string;
    gender?: string;
    biography?: string;
    birth_date?: string;
    profile_image?: string;
    is_active?: number;
    xp_points?: number;
    website?: string;
    username?: string;
    password?: string;
    created_at?: string;
    updated_at?: string;
    friendship?: number;
    nr_activities?: number;
    rating?: number;
    given_xp?: boolean;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    topics?: {};
    xp_purchase?: number;
}
