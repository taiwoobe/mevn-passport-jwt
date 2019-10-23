import { HTTP } from '@/api/api'

const state = {
    token: localStorage.getItem('token') || '',
    status: '',
    currentUser: {}
}

const mutations = {
    auth_request(state) {
        state.status = 'pending';
    },
    auth_success(state, { token, currentUser }) {
        state.status = 'success';
        state.token = token;
        state.currentUser = currentUser;
    },
    auth_error(state) {
        state.status = 'error';
    },
    logout(state) {
        state.token = '';
        state.status = '';
        state.currentUser = {}
    }
}

const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            HTTP({ url: 'login', data: user, method: 'POST' }).then(result => {
                const token = result.data.token;
                const currentUser = result.data.user;
                localStorage.setItem('token', token);
                HTTP.defaults.headers.common['Authorization'] = token;
                commit('auth_success', { token, currentUser });
                resolve(result);
            }).catch(error => {
                commit('auth_error');
                localStorage.removeItem('token');
                reject(error);
            })
        })
    },
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            HTTP.post('register', user).then(result => {
                const token = result.data.token;
                const currentUser = result.data.user;
                localStorage.setItem('token', token);
                HTTP.defaults.headers.common['Authorization'] = token;
                commit('auth_success', { token, currentUser });
                resolve(result);
            }).catch(error => {
                commit('auth_error');
                localStorage.removeItem('token');
                reject(error);
            })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('logout');
            localStorage.removeItem('token');
            delete HTTP.defaults.headers.common['Authorization'];
            resolve();
        })
    }
}

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    loggedInUser: state => state.currentUser
}

export default {
    state, mutations, actions, getters
}