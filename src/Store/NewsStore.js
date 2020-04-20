import { observable } from 'mobx'

class NewsStore {
    @observable homeData = [];
}


export default new NewsStore;
