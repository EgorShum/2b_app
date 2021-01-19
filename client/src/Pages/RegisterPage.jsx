import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Form, Input, Button, message,
} from 'antd';

import { setTokenHeader } from '../api/index';
import { AuthContext } from '../contexts/AuthContext';
import * as userAPI from '../api/user';

const RegisterPage = () => {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  return (
    <Form
      onFinish={(fields) => {
        userAPI.register(fields)
          .then(({ data }) => {
            const { authToken, info } = data;
            setTokenHeader(authToken);
            setUser(info);
            return history.push('/pizzas/create');
          })
          .catch((err) => {
            if (err.response?.data?.password) {
              message.error(err.response.data.password);
            }
          });
      }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Поле обязятельное' },
          { type: 'email', message: 'Неверный формат' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Поле обязятельное' },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
        <div>
          <Link to="/login">У меня есть аккаунт!</Link>
        </div>

      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
