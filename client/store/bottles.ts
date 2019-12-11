import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { BottleView } from '~/models/Bottle'
import * as types from './mutation-types'

interface IQueryOptions {
  skip?: number
  take?: number
  order?: number
  userId?: string
}

const getQuery = (options: IQueryOptions = {}): string => {
  const params = new URLSearchParams()

  Object.entries(options).forEach(([key, value]) => {
    params.set(key, value)
  })

  return '?' + params.toString()
}

export const state = () => ({
  bottles: {} as { [key: string]: BottleView },
})

export type state = ReturnType<typeof state>

export const getters: GetterTree<state, state> = {
  bottles: ({ bottles }: state) => bottles,
  bottle: ({ bottles }: state) => (id: string) => bottles[id]
}

export const mutations: MutationTree<state> = {
  [types.FETCH_BOTTLES](state: state, bottles: BottleView[]) {
    bottles.forEach(bottle => {
      state.bottles[bottle.id] = bottle
    })
  },

  [types.FETCH_BOTTLE](state: state, bottle: BottleView) {
    state.bottles[bottle.id] = {
      ...state.bottles[bottle.id],
      ...bottle
    }
  },

  [types.ADD_BOTTLE](state: state, bottle: BottleView) {
    state.bottles[bottle.id] = bottle
  },

  [types.UPDATE_BOTTLE](state: state, bottle: BottleView) {
    state.bottles[bottle.id] = {
      ...state.bottles[bottle.id],
      ...bottle
    }
  },

  [types.REMOVE_BOTTLE](state: state, bottle: BottleView) {
    delete state.bottles[bottle.id]
  },
}

export const actions: ActionTree<state, state> = {
  async fetchMyBottles({ commit }, options: IQueryOptions = {}) {
    const query = getQuery(options)
    const { data: bottles }: { data: BottleView[] } = await this.$axios.get(`bottles${query}`)
    commit(types.FETCH_BOTTLES, bottles)
    return bottles
  },

  async fetchBottle({ commit }, id) {
    const { data: bottle }: { data: BottleView } = await this.$axios.get(`bottles/${id}`)
    commit(types.FETCH_BOTTLE, bottle)
    return bottle
  }
}