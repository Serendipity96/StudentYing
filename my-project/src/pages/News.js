import React, { Component } from 'react';
import { Button, List, Avatar } from 'antd';


const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

class News extends Component {

  render() {
    return (
      <div>
        <Button icon="plus" type="primary" href="/news/add">
          新增
        </Button>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <ul style={{ display: 'flex' }}>
                <li style={{ marginLeft: 10 }}>
                  <a>编辑</a>
                </li>
                <li style={{ marginLeft: 10 }}>
                  <a>删除</a>
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

