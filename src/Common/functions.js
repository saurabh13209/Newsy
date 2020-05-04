import NewsStore from "../Store/NewsStore"
import Realm from 'realm';
import { BookmarkSchema, FollowSchema } from "./Schema";

const realm = new Realm({ schema: [BookmarkSchema, FollowSchema] });

export const getRealmData = () => {
    var tempId = {}
    NewsStore.followingPages = []
    NewsStore.followingNames = []
    realm.objects("Follow").forEach((followPage, index) => {
        tempId[followPage.id] = index;
        NewsStore.followingPages = [
            ...NewsStore.followingPages,
            followPage.id
        ]
        NewsStore.followingNames = [
            ...NewsStore.followingNames,
            followPage
        ]
    })
    return tempId;
}



export const setBookMarkData = () => {
    NewsStore.bookmarkId = []
    NewsStore.bookmarkData = []
    realm.objects("Bookmark").forEach(bookmarkPage => {
        NewsStore.bookmarkId = [
            ...NewsStore.bookmarkId,
            bookmarkPage.title
        ]
        NewsStore.bookmarkData = [
            ...NewsStore.bookmarkData,
            bookmarkPage
        ]
    })
}
