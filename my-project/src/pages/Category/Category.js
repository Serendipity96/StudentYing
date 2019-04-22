import React, { Component } from 'react';
import { List, Input, Button, Modal, Form } from 'antd';

const categoryListUrl = 'https://zrf.leop.pro/api/category/list';
const categoryDeleteUrl = 'https://zrf.leop.pro/api/category/delete?id=';
const categoryInsertUrl = 'https://zrf.leop.pro/api/category/insert?name=';

const confirm = Modal.confirm;

class Category extends Component {

  state = {
    visible: false,
    inputVal: '',
    categoryList: [
      { id: '0', name: '宠物' },
      { id: '1', name: '时尚' },
    ],
  };

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList() {
    const that = this;
    fetch(categoryListUrl, {
      method: 'GET',
    }).then(res => res.json())
      .then((res) => {
        that.setState({ categoryList: res.data });
      });
  }

  showDelete = (item) => {
    const that = this;
    confirm({
      title: '删除标签',
      content: '确定删除此标签吗？',
      onOk() {
        // that.props.deleteCate(item.id);
        that.deleteCategory(item.id);
      },
      onCancel() {
      },
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  edit = (name) => {
    console.log(1);
    this.props.editCate(name);
    console.log(2);
    this.setState({
      visible: false,
    });
  };


  deleteCategory(id) {
    const { categoryList } = this.state;
    for (let i = 0; i < categoryList.length; i += 1) {
      if (categoryList[i].id === id) {
        categoryList.splice(i, 1);
        break;
      }
    }
    this.setState({ categoryList: categoryList });
    const url = categoryDeleteUrl + id;

    fetch(url, {
      method: 'GET',
      data: id,
    });
  }

  changeInput(e) {
    console.log(e.target.value);
    this.setState({
      inputVal: e.target.value,
    });
  }

  submitVal() {
    const { inputVal, editId } = this.state;
    const insertUrl = categoryInsertUrl + inputVal;
    const editUrl = categoryInsertUrl + inputVal + '&id=' + editId;
    const that = this
    if (!editId) {
      fetch(insertUrl, {
        method: 'GET',
      }).then(()=>{
        that.getCategoryList();
      })
    } else {
      fetch(editUrl, {
        method: 'GET',
      }).then(()=>{
        that.getCategoryList();
      })
    }
    this.setState({ inputVal: '' });

  }

  editInputVal(item) {
    this.setState({ inputVal: item.name, editId: item.id });
  }

  render() {

    const list = this.state.categoryList;
    const inputVal = this.state.inputVal;
    return (
      <div>
        <div style={{ display: 'flex', marginBottom: '1em' }}>
          <Input value={inputVal} placeholder="新增类别" allowClear style={{ width: 120 }}
                 onChange={this.changeInput.bind(this)}/>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={this.submitVal.bind(this)}>提交</Button>
        </div>
        <List
          size="large"
          dataSource={list}
          renderItem={item => (<List.Item key={item.id} style={{ width: 200 }}>
            <div style={{ marginLeft: 11 }}>{item.name}</div>
            <ul style={{ display: 'flex', marginBottom: 0, marginLeft: 40 }}>
              <li style={{ marginLeft: 10 }}>
                <a onClick={() => this.editInputVal(item)}>编辑</a>
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
        </Modal>

      </div>
    );
  }
}

export default Category;
