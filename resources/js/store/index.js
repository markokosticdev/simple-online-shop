import { createStore } from 'vuex'

export default createStore({
    state: {
        lastViewed: JSON.parse(localStorage.getItem('lastViewed')) || []
    },
    mutations: {
        addViewed(state, product) {
            if (state.lastViewed.length >= 10) {
                state.lastViewed.shift();
            }
            state.lastViewed.push(product);
            localStorage.setItem('lastViewed', JSON.stringify(state.lastViewed));
        },
        removeAllViewed(state) {
            state.lastViewed = [];
            localStorage.setItem('lastViewed', JSON.stringify(state.lastViewed));
        }
    },
    getters: {
        lastViewed: state => state.lastViewed
    }
})
