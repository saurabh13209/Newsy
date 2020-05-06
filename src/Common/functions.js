import NewsStore from "../Store/NewsStore"
import Realm from 'realm';
import { BookmarkSchema, FollowSchema, LikedSchema, UnlikedSchema } from "./Schema";

const realm = new Realm({ schema: [BookmarkSchema, FollowSchema, LikedSchema, UnlikedSchema] });


export const getKeyMain = (item) => {
    var keyMain = item.publishedAt + "" + item.title.split(" ")[0] + item.title.split(" ")[1] + item.title.split(" ")[2]
    keyMain = keyMain.split(".");
    keyMain = keyMain.join();
    keyMain = keyMain.split("#");
    keyMain = keyMain.join();
    keyMain = keyMain.split("$");
    keyMain = keyMain.join();
    keyMain = keyMain.split("[");
    keyMain = keyMain.join();
    keyMain = keyMain.split("'");
    keyMain = keyMain.join();
    keyMain = keyMain.split("]");
    keyMain = keyMain.join();
    keyMain = keyMain.split("\"");
    keyMain = keyMain.join();
    return keyMain
}

// FOLLOW DATABASE
export const getFollowData = () => {
    NewsStore.followingPages = []
    NewsStore.followingNames = []
    realm.objects("Follow").forEach(followPage => {
        NewsStore.followingPages = [
            ...NewsStore.followingPages,
            followPage.id
        ]
        NewsStore.followingNames = [
            ...NewsStore.followingNames,
            followPage
        ]
    })
}

export const setFollowData = (name, id) => {
    if (NewsStore.followingPages.includes(id)) {
        var temp = {}
        realm.objects("Follow").forEach((data, index) => {
            temp[data.id] = index
        })
        realm.write(() => {
            realm.delete(realm.objects("Follow")[temp[id]])
        })
        getFollowData();
    } else {
        realm.write(() => {
            realm.create("Follow", {
                name: name,
                id: id
            })
        })
        getFollowData();
    }
}

// BOOKMARK DATABASE
export const getBookmarkData = () => {
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

export const setBookmarkData = (item) => {
    if (!NewsStore.bookmarkId.includes(item.title)) {
        NewsStore.bookmarkId.push(item.title);
        realm.write(() => {
            realm.create("Bookmark", {
                sourceName: item.sourceName,
                sourceId: item.sourceId,
                url: item.url,
                title: item.title,
                urlToImage: item.urlToImage,
                description: item.description,
                publishedAt: item.publishedAt
            })
        })
    } else {
        var index = 0;
        realm.objects("Bookmark").forEach((data, i) => {
            if (data["title"] == item.title && data["url"] == item.url) {
                index == i
                return
            }
        })
        realm.write(() => {
            realm.delete(realm.objects("Bookmark")[index])
        });
    }
    getBookmarkData();
}

// LIKE DATABASE
export const addLike = (title) => {
    realm.write(() => {
        realm.create("Liked", {
            title: title
        })
    })
    setLikeDislike(title, 1);
}

export const addDislike = (title) => {
    realm.write(() => {
        realm.create("Unliked", {
            title: title
        })
    })
    setLikeDislike(title, 0);
}

export const getLikedItems = () => {
    var array = [];
    realm.objects("Liked").forEach(val => {
        array.push(val.title);
    })
    return array
}

export const getDislikedItems = () => {
    var array = [];
    realm.objects("Unliked").forEach(val => {
        array.push(val.title);
    })
    return array
}

export const setLikeDislike = (title, task) => {
    console.log(title);
    console.log(task);
    var temp = [];

    NewsStore.homeData.forEach((data, i) => {
        var keyMain = getKeyMain(data);
        if (keyMain == title) {
            if (task == 1) {
                var x = data;
                x["Like"] += 1;
                temp = [
                    ...temp,
                    x
                ]
            } else {
                var x = data;
                x["Dislike"] += 1;
                temp = [
                    ...temp,
                    x
                ]
            }
        } else {
            temp = [
                ...temp,
                data
            ]
        }
    })
    NewsStore.homeData = temp
}
