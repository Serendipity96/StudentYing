import { message } from 'antd';

export default {
  namespace: 'form',

  state: {
  },

  effects: {
    *submitForm({ payload }, { call }) {

      message.success('提交成功');
    },

  },

  reducers: {
    submitForm(state, { payload: values }) {
      console.log(values)
      return {...state}
    },
  },
};
