import {Activity} from './activity';

export interface Category {
    id: number;
    name: string;
    image: string;
    nr_subscribers: number;
    has_favorite: boolean;
    activities: Activity[];
}
