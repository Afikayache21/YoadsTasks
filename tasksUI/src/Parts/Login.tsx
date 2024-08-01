// components/Login.tsx
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styled from 'styled-components';
import emailStore from '../Data/EmailStore.ts';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../Models/IUser.ts';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  Max-width: 50vh;
  background-color: #f0f4f8;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 13%;
  color: #333;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px 0px;
  padding-left: 10px;
  margin: 5px 0;  
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
    
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Login = observer(() => {
  const [user, setUser] = useState<IUser>({ email: '', password: '', tasks: [] });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://localhost:7207/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        emailStore.setEmail(user.email);
        const data = await response.json();
        console.log('Login successful, token:', data.token);
        navigate('/');
        // Handle successful login (e.g., store the token, redirect, etc.)
      } else {
        console.error('Login failed:', response.statusText);
        // Handle login failure (e.g., display an error message)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Title>Login</Title>
      <div>
        <Input
          placeholder='Email'
          type="email"
          id="email"
          name='email'
          value={user.email}
          onChange={handleChange}
        />
        <Input
          placeholder='Password'
          type="password"
          id="password"
          name='password'
          value={user.password}
          onChange={handleChange}
        />
        <Button type='submit'>Login</Button>
        <br />
        <Link to="/register">Register</Link>
      </div>
    </Container>
  );
});

export default Login;
