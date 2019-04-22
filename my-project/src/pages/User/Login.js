import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, message, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import { setAuthority } from '@/utils/authority';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    name: '',
    pwd: '',
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
          message.warning(formatMessage({ id: 'app.login.verification-code-warning' }));
        }
      });
    });

  handleSubmit = (err, values) => {
    console.log(values)
    const that = this
    const url = 'https:zrf.leop.pro/api/author/login?name='+values.userName+'&password='+values.password
    fetch(url, {
      method:'GET'
    }).then((res)=> res.json())
      .then(res => {
      console.log(res)
      if(res.status === 200){
        setAuthority('admin');
        window.location.href = '/news/manage';
      }else{
        const { type } = that.state;
        if (!err) {
          const { dispatch } = that.props;
          dispatch({
            type: 'login/login',
            payload: {
              ...values,
              type,
            },
          });
        }
        that.renderMessage(200)
      }
    })
  };

  getUserName(e) {
    this.setState({ name: e.target.name });
  }

  getPwd(e) {
    this.setState({ pwd: e.target.name });
  }

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message='用户名/密码错误' type="error" showIcon/>
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
            login.type === 'account' &&
            !submitting &&
            this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <UserName
              onChange={this.getUserName.bind(this)}
              name="userName"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}: admin or user`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              onChange={this.getPwd.bind(this)}
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.password' })}: admin`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab>
          <Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            {login.status === 'error' &&
            login.type === 'mobile' &&
            !submitting &&
            this.renderMessage(
              formatMessage({ id: 'app.login.message-invalid-verification-code' }),
            )}
            <Mobile
              name="mobile"
              placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.phone-number.required' }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({ id: 'form.get-captcha' })}
              getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.verification-code.required' }),
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me"/>
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password"/>
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login"/>
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="app.login.sign-in-with"/>
            <Icon type="alipay-circle" className={styles.icon} theme="outlined"/>
            <Icon type="taobao-circle" className={styles.icon} theme="outlined"/>
            <Icon type="weibo-circle" className={styles.icon} theme="outlined"/>
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup"/>
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
