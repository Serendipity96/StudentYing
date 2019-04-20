import React, { Component } from 'react';
import { Input, Select, Upload, message, Button, Icon } from 'antd';

const { TextArea } = Input;
const Option = Select.Option;
const url = 'http://localhost:8081/api/news/edit';
const detailUrl = 'http://localhost:8081/api/news/get';

class NewsAdd extends Component {

  state = {
    title: '',
    content: '',
  };

  componentDidMount() {
    let that = this;
    if (localStorage.getItem('id') !== '') {
      const id = localStorage.getItem('id');
      const paramUrl = detailUrl + '?id=' + id;
      fetch(paramUrl, {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          console.log(res.data)
          const data = res.data
          that.setState({
            title: data.title,
            content: data.text,
          });
        });
      localStorage.setItem('id', '');
    }
  }


  changeSelect(value) {
    this.setState({
      cate: value,
    });
  }

  changeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  changeContent(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleSubmit(e) {
    const data = this.state;
    const params = new URLSearchParams();
    params.append('title', data.title);
    params.append('author_id', 1);
    params.append('category_id', 1);
    params.append('text', data.content);
    params.append('audio_url', 3333);
    params.append('video_url', 6666);
    fetch(url, {
      method: 'POST',
      body: params,
    });

    this.setState({
      title: '',
      content: '',
    });
  }

  render() {

    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    console.log(1);
    console.log(this.state);
    const { title, content } = this.state;

    return (
      <div>
        <Input value={title} placeholder="新闻标题" allowClear onChange={this.changeTitle.bind(this)}/>
        <Select defaultValue="0" style={{ width: 120, marginBottom: 10, marginTop: 10 }}
                onChange={this.changeSelect.bind(this)}>
          <Option value="0">热点</Option>
          <Option value="1">时尚</Option>
          <Option value="2">汽车</Option>
        </Select>

        <TextArea value={content} placeholder="新闻正文" autosize={{ minRows: 12, maxRows: 20 }}
                  onChange={this.changeContent.bind(this)}/>

        <div style={{ marginTop: 20, display: 'flex' }}>
          <Upload {...props} style={{ marginRight: 20 }}>
            <Button>
              <Icon type="upload"/> 上传图片
            </Button>
          </Upload>
          <Upload {...props} style={{ marginRight: 20 }}>
            <Button>
              <Icon type="upload"/> 上传音乐
            </Button>
          </Upload>
          <Upload {...props} style={{ marginRight: 20 }}>
            <Button>
              <Icon type="upload"/> 上传视频
            </Button>
          </Upload>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>提交</Button>
        </div>
      </div>
    );
  }
}

export default NewsAdd;
