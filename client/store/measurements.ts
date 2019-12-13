import { GetterTree, MutationTree, ActionTree } from 'vuex/types/index'
import { MeasurementView } from '~/models/Measurement'
import * as types from './mutation-types'
import { MeasurementCreate } from '~/models/Measurement'

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
  measurements: [] as MeasurementView[]
})

export type state = ReturnType<typeof state>

export const getters: GetterTree<state, state> = {
  measurements: ({ measurements }: state) => measurements,
}

export const mutations: MutationTree<state> = {
  [types.FETCH_MEASUREMENTS](state: state, measurements: MeasurementView[]) {
    state.measurements = [...state.measurements, ...measurements]
  },

  [types.STORE_MEASUREMENT](state: state, measurement: MeasurementView) {
    state.measurements = [...state.measurements, measurement]
  },
}

export const actions: ActionTree<state, state> = {
  async fetchMeasurements({ commit }, options: IQueryOptions = {}) {
    const query = getQuery(options)
    const {
      data: measurements,
    }: { data: MeasurementView[] } = await this.$axios.get(
      `measurements${query}`,
    )
    commit(types.FETCH_MEASUREMENTS, measurements)
    return measurements
  },

  async storeMeasurement({ commit }, measurement: MeasurementCreate) {
    const { data }: { data: MeasurementView } = await this.$axios.post(
      'measurements',
      {
        ...measurement,
        timestamp: Date.now(),
      },
    )
    commit(types.STORE_MEASUREMENT, data)
    return data
  },
}
