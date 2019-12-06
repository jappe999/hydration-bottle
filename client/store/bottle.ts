import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { BottleView } from '~/models/Bottle'
import * as types from './mutation-types'

export const state = () => ({
    bottles: {} as { [key: string]: BottleView },
})

export type state = ReturnType<typeof state>

export const getters: GetterTree<state, state> = {
    bottles: ({ bottles }: state) => bottles,
}

export const mutations: MutationTree<state> = {

}

export const actions: ActionTree<state, state> = {
    fetchMyBottles({ commit }) {

    }
}