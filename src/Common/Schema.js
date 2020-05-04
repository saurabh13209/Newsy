export const BookmarkSchema = {
    name: "Bookmark",
    properties: {
        sourceName: "string",
        sourceId: "string",
        title: "string",
        url: "string",
        urlToImage: "string",
        description: "string",
        publishedAt: "date"
    }
}

export const FollowSchema = {
    name: "Follow",
    properties: {
        id: "string",
        name: "string",
    }
}