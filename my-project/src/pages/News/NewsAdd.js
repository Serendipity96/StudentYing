import React, { Component } from 'react';
import { Input, Select, Upload, message, Button, Icon } from 'antd';

const { TextArea } = Input;
const Option = Select.Option;
const url = 'https://zrf.leop.pro/api/news/edit';
const detailUrl = 'https://zrf.leop.pro/api/news/get';
const optionsUrl = 'https://zrf.leop.pro/api/category/list';

class NewsAdd extends Component {

  state = {
    title: '',
    content: '',
    selectOpt: 1,
    selectOptions: [{ name: '北京', id: 3 }],
  };

  componentWillMount() {
    this.getCategory();
  }

  componentDidMount() {
    this.getNewsContent();
  }

  getNewsContent() {
    let that = this;
    if (localStorage.getItem('id') !== '') {
      const id = localStorage.getItem('id');
      const paramUrl = detailUrl + '?id=' + id;
      fetch(paramUrl, {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          console.log(res.data);
          const data = res.data;
          that.setState({
            title: data.title,
            content: data.text,
            selectOpt: data.category_id,
          });
        });
      localStorage.setItem('id', '');
    }
  }

  getCategory() {
    let that = this;
    fetch(optionsUrl, {
      method: 'GET',
    }).then(res => res.json())
      .then(res => {
        that.setState({
          selectOptions: res.data,
        });
      });
  }

  changeSelect(e) {
    console.log(e);
    this.setState({selectOpt:e});
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

  changeFile(e) {
    console.log(e.file.uid);
    console.log(e);
  }

  handleSubmit(e) {
    const data = this.state;
    const params = new URLSearchParams();
    const that = this
    params.append('title', data.title);
    params.append('author_id', 1);
    params.append('category_id', data.selectOpt);
    params.append('text', data.content);
    params.append('audio_url', 3333);
    params.append('video_url', 6666);
    fetch(url, {
      method: 'POST',
      body: params,
    }).then(()=>{
      that.setState({
        title: '',
        content: '',
      });
      that.setState({selectOpt:3});
    })

  }


  render() {

    const { title, content, selectOptions,selectOpt } = this.state;

    return (
      <div>
        <Input value={title} placeholder="新闻标题" allowClear onChange={this.changeTitle.bind(this)}/>
        <Select defaultValue={selectOpt} style={{ width: 120, marginBottom: 10, marginTop: 10 }}
                onChange={(e) =>{this.changeSelect(e)}}>
          {selectOptions.map((option) =>
            (<Option key={option.id} value={option.id}>{option.name}
            </Option>),
          )}
        </Select>

        <TextArea value={content} placeholder="新闻正文" autosize={{ minRows: 12, maxRows: 20 }}
                  onChange={this.changeContent.bind(this)}/>

        <div style={{ marginTop: 20, display: 'flex' }}>
          <Upload style={{ marginRight: 20 }} onChange={this.changeFile.bind(this)}>
            <Button>
              <Icon type="upload"/> 上传图片
            </Button>
          </Upload>
          <Upload style={{ marginRight: 20 }}>
            <Button>
              <Icon type="upload"/> 上传音乐
            </Button>
          </Upload>
          <Upload style={{ marginRight: 20 }}>
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
