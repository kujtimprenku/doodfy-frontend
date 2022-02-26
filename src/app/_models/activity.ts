import {User} from './user';
import {Comment} from './comment';
import {City} from './city';
import {Category} from './category';
import {Rating} from './rating';

export interface Activity {
    id: number;
    subcategory_id: number;
    category_id: number;
    city: City;
    title: string;
    description: string;
    category: Category[];
    image: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    max_persons: number;
    location: string;
    lat: string;
    lon: string;
    nr_joined: number;
    has_joined: boolean;
    has_saved: boolean;
    has_xp: boolean;
    is_active: boolean;
    my_activity: boolean;
    comments: Comment[];
    user: User;
    users: User[];
    rating: Rating;
    subcategory: Category;
}
