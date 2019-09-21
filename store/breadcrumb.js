export const state = () => ({
  items: []
})

export const mutations = {
  set(state, items) {
    state.items = items.slice()
  },
  clear(state) {
    const length = state.items.length
    state.items.splice(0, length)
  },
  pushActive(state, title) {
    state.items.push({text: title, active: true})
  },
}
