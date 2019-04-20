export default {
  namespace: 'CategoryRules',

  state: [
    { id: '0', name: '宠物' },
    { id: '1', name: '时尚' },
    { id: '2', name: '汽车' },
    { id: '3', name: '热点' },
    { id: '4', name: '北京' },
  ],

  effects: {},

  reducers: {
    deleteCategory(state, { payload: id }) {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].id === id) {
          console.log(state[i].id)
          state.splice(i,1);
          break;
        }
      }
      return [...state]
    },
    editCategory(state, { payload: name }) {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].name === name) {
          console.log(1)
          state[i].name = name
          break;
        }
      }
      return [...state]
    },
  },

};
