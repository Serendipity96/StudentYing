import React, { Component } from 'react';
import { Button, List, Avatar, Modal } from 'antd';

const url = 'http://localhost:8081/api/news/list?length=5&top_news_id=10&category_id=1';
const confirm = Modal.confirm;


class News extends Component {

  state = {
    list: [],
  };


  componentDidMount() {
    this.getNewsList();
  }

  getNewsList() {
    const that = this;
    fetch(url, {
      method: 'GET',
    }).then(res => res.json())
      .then((res) => {
        that.setState({
          list: res.data.list,
          isOk: true,
        });
        console.log(res);
      });
  }

  showDelete = (item) => {
    const that = this;
    confirm({
      title: '删除新闻',
      content: '确定删除此条新闻吗？',
      onOk() {
        that.deleteNews(item.id);
      },
      onCancel() {
      },
    });
  };

  deleteNews(id) {
    const { list } = this.state;
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].id === id) {
        console.log(list[i].id);
        list.splice(i, 1);
        break;
      }
    }
    this.setState({
      list: list,
    });
  }

  edit(item) {
    console.log(item.id);
    localStorage.setItem('id', item.id);
    window.location.href = '/news/add';
  }

  render() {
    const { list } = this.state;
    console.log(list);
    return (
      <div>
        <Button icon="plus" type="primary" href="/news/add">
          新增
        </Button>
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <ul style={{ display: 'flex' }}>
                <li style={{ marginLeft: 10 }}>
                  <a onClick={() => this.edit(item)}>编辑</a>
                </li>
                <li style={{ marginLeft: 10 }}>
                  <a onClick={() => this.showDelete(item)}>删除</a>
                </li>
              </ul>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default News;

