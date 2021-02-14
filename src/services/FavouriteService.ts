//manages favourites saved to local storage, keeping it abstracted in case I want to move it to a back-end at a later date.

import { Stop } from "../types/Transit.type";
import TTCApi from "./TTCApi";

interface FavouriteTags {
    stopTag: string;
    routeTag: string;
}

class FavouriteService {
    
    static readonly LOCALSTORAGEKEY = "FAVOURITES"

    async GetFavourites(): Promise<Stop[]> {
        const storageVal = localStorage.getItem(FavouriteService.LOCALSTORAGEKEY)
        if(storageVal){
            const tags: FavouriteTags[] = JSON.parse(storageVal);
            const ttcApi = new TTCApi();
            const stops = await Promise.all(tags.map(async (t, i) => {
                const s = await ttcApi.GetStop(t.stopTag, t.routeTag);
                return s;
            }));
            return stops;
        } else {
            return []
        }
    }

    IsFavourite(stop:Stop): boolean{
        const storageVal = localStorage.getItem(FavouriteService.LOCALSTORAGEKEY)
        if(storageVal){
            const tags: FavouriteTags[] = JSON.parse(storageVal);
            return tags.some(t => t.stopTag === stop.tag && t.routeTag === stop.route.tag);
        } else {
            return false;
        }
    }

    AddFavourite(stop: Stop) {
        const storageVal = localStorage.getItem(FavouriteService.LOCALSTORAGEKEY)
        if(storageVal){
            const tags: FavouriteTags[] = JSON.parse(storageVal);
            if(!tags.find(t => t.stopTag === stop.tag)){
                const newTags = [{stopTag: stop.tag, routeTag: stop.route.tag}].concat(tags);
                localStorage.setItem(FavouriteService.LOCALSTORAGEKEY, JSON.stringify(newTags));
            }
        } else {
            const newTags = [{stopTag: stop.tag, routeTag: stop.route.tag}]
            localStorage.setItem(FavouriteService.LOCALSTORAGEKEY, JSON.stringify(newTags));
        }
    }

    RemoveFavourite(stop: Stop) {
        const storageVal = localStorage.getItem(FavouriteService.LOCALSTORAGEKEY)
        if(storageVal){
            const tags: FavouriteTags[] = JSON.parse(storageVal);
            const newTags = tags.filter(t => t.stopTag !== stop.tag);
            localStorage.setItem(FavouriteService.LOCALSTORAGEKEY, JSON.stringify(newTags));
        }
    }

}

export default FavouriteService;