import React, { Component } from 'react';
import { List, Input, Button, Modal, Form } from 'antd';
import { connect } from 'dva';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const namespace = 'CategoryRules';
const mapStateToProps = (state) => {
  const categoryList = state[namespace];
  return {
    categoryList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCate: (id) => {
      const action = {
        type: `${namespace}/deleteCategory`,
        payload: id,
      };
      dispatch(action);
    },
    editCate: (name) => {
      const action = {
        type: `${namespace}/editCategory`,
        payload: name,
      };
      dispatch(action);
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Category extends Component {

  state = { visible: false }

  showDelete = (item) => {
    const that = this;
    confirm({
      title: '删除标签',
      content: '确定删除此标签吗？',
      onOk() {
        that.props.deleteCate(item.id);
      },
      onCancel() {
      },
    });
  };




  showModal = (item) => {
    this.setState({
      id:item.id,
      name:item.name,
      visible: true,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  edit = (name) => {
    console.log(1)
    this.props.editCate(name);
    console.log(2)
    this.setState({
      visible: false,
    });
  }

  changeCate = (value)=>{
    console.log(value.target.value);
    this.setState({
      name:value.target.value
    })
  }

  render() {

    const getModalContent = (value) => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="类别名称" style={{ display: 'flex' }} >
            <input placeholder="类别" defaultValue={value.name} onChange={e => this.changeCate(e)} />
          </FormItem>
        </Form>
      );
    };
    const list = this.props.categoryList;
    return (
      <div>
        <div style={{ display: 'flex', marginBottom: '1em' }}>
          <Input placeholder="新增类别" allowClear style={{ width: 120 }}/>
          <Button type="primary" style={{ marginLeft: 10 }}>新增</Button>
        </div>
        <List
          size="large"
          dataSource={list}
          renderItem={item => (<List.Item key={item.id} style={{ width: 200 }}>
            <div style={{ marginLeft: 11 }}>{item.name}</div>
            <ul style={{ display: 'flex', marginBottom: 0, marginLeft: 40 }}>
              <li style={{ marginLeft: 10 }}>
                <a onClick={() => this.showModal(item)}>编辑</a>
              </li>
              <li style={{ marginLeft: 10 }}>
                <a onClick={() => this.showDelete(item)}>删除</a>
              </li>
            </ul>
          </List.Item>)}
        />
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={() => this.edit(this.state.name)}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          {getModalContent(this.state)}
        </Modal>

      </div>
    );
  }
}

export default Category;
