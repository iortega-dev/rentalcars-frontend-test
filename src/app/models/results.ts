import { SearchItem } from './search-item';

export interface Results {
    isGooglePowered: boolean;
    docs: SearchItem[];
    numFound: number;
}
