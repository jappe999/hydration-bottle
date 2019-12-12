import { GetterTree, MutationTree, ActionTree } from 'vuex/types/index'
import { MeasurementView } from '~/models/Measurement'
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
  currentMeasurementId: '' as string,
  measurements: {} as { [key: string]: MeasurementView },
})

export type state = ReturnType<typeof state>

export const getters: GetterTree<state, state> = {
  measurements: ({ measurements }: state) => measurements,
  measurement: ({ measurements, currentMeasurementId: id }: state) =>
    measurements[id] || {},
}

export const mutations: MutationTree<state> = {
  [types.FETCH_BOTTLES](state: state, measurements: MeasurementView[]) {
    measurements.forEach(measurement => {
      state.measurements[measurement.id] = measurement
    })
  },

  [types.FETCH_BOTTLE](state: state, measurement: MeasurementView) {
    state.measurements[measurement.id] = {
      ...state.measurements[measurement.id],
      ...measurement,
    }

    state.currentMeasurementId = measurement.id
  },

  [types.ADD_BOTTLE](state: state, measurement: MeasurementView) {
    state.measurements[measurement.id] = measurement
    state.currentMeasurementId = measurement.id
  },

  [types.UPDATE_BOTTLE](state: state, measurement: MeasurementView) {
    state.measurements[measurement.id] = {
      ...state.measurements[measurement.id],
      ...measurement,
    }
  },

  [types.REMOVE_BOTTLE](state: state, measurement: MeasurementView) {
    delete state.measurements[measurement.id]
    state.currentMeasurementId = ''
  },
}

export const actions: ActionTree<state, state> = {
  async fetchMyMeasurements({ commit }, options: IQueryOptions = {}) {
    const query = getQuery(options)
    const {
      data: measurements,
    }: { data: MeasurementView[] } = await this.$axios.get(
      `measurements${query}`,
    )
    commit(types.FETCH_BOTTLES, measurements)
    return measurements
  },

  async fetchMeasurement({ commit }, id) {
    const {
      data: measurement,
    }: { data: MeasurementView } = await this.$axios.get(`measurements/${id}`)
    commit(types.FETCH_BOTTLE, measurement)
    return measurement
  },
}
