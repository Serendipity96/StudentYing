import React, { Component } from 'react';
import { List, Input, Button, Modal, Form, DatePicker, Select } from 'antd';
import styles from './List/BasicList.less';
import moment from './List/BasicList';

const confirm = Modal.confirm;
const FormItem = Form.Item;

const data = [
  '宠物',
  '时尚',
  '汽车',
  '热点',
  '北京',
];

class Category extends Component {
  state = { visible: false };

  showDelete = () => {
    confirm({
      title: '删除标签',
      content: '确定删除此标签吗？',
      onOk() {
      },
      onCancel() {
      },
    });
  };


  showEditor = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {

    const getModalContent = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="类别名称"  style={{display:'flex'}}>
            <Input placeholder="类别" />
          </FormItem>
        </Form>
      );
    };
    return (
      <div>
        <div style={{ display: 'flex', marginBottom: '1em' }}>
          <Input placeholder="新增类别" allowClear style={{ width: 120 }}/>
          <Button type="primary" href="/news/manage" style={{ marginLeft: 10 }}>新增</Button>
        </div>
        <List
          size="large"
          dataSource={data}
          renderItem={item => (<List.Item style={{ width: 200 }}>
            <div style={{ marginLeft: 11 }}>{item}</div>
            <ul style={{ display: 'flex', marginBottom: 0, marginLeft: 40 }}>
              <li style={{ marginLeft: 10 }}>
                <a onClick={this.showEditor}>编辑</a>
              </li>
              <li style={{ marginLeft: 10 }}>
                <a onClick={this.showDelete}>删除</a>
              </li>
            </ul>
          </List.Item>)}
        />
        <Modal
          title="编辑类别"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {getModalContent()}
        </Modal>
      </div>
    );
  }
}

export default Category;
