import { observable } from 'mobx'

class NewsStore {
    @observable homeData = [];

    @observable followingData = [];
    @observable followingPages = []
    @observable followingNames = [];

    @observable bookmarkId = [];
    @observable bookmarkData = []

}


export default new NewsStore;
