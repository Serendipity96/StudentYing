import React, { Component } from 'react';
import { Input, Select, Upload, message, Button, Icon } from 'antd';

const { TextArea } = Input;
const Option = Select.Option;

class NewsAdd extends Component {

  handleChange() {

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

    return (
      <div>
        <Input placeholder="新闻标题" allowClear/>
        <Select defaultValue="lucy" style={{ width: 120, marginBottom: 10, marginTop: 10 }}
                onChange={this.handleChange}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
        <TextArea placeholder="新闻正文" autosize={{ minRows: 12, maxRows: 20 }}/>
        <div style={{ marginTop: 20,display:'flex'}}>
          <Upload {...props} style={{marginRight:20}}>
            <Button>
              <Icon type="upload"/> 上传图片
            </Button>
          </Upload>
          <Upload {...props} style={{marginRight:20}}>
            <Button>
              <Icon type="upload"/> 上传音乐
            </Button>
          </Upload>
          <Upload {...props} style={{marginRight:20}}>
            <Button>
              <Icon type="upload"/> 上传视频
            </Button>
          </Upload>
          <Button type="primary" href="/news/manage">提交</Button>
        </div>
      </div>
    );
  }
}

export default NewsAdd;
