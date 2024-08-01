import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from "../Models/IUser";
import styled from 'styled-components';


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
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
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

export default function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>({ email: '', password: '',tasks:[]});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e : React.FormEvent) => {
      e.preventDefault();

      
        try {
          const response = await fetch('https://localhost:7207/api/Auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
    
          if (response.ok) {
            console.log('Register successful');
            navigate('/Login');

          } else {
            console.error('Register failed:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    
    return (
        <Container onSubmit={handleSubmit}>
            <Title>Register</Title>
            <div >
                <div>
                    <Input
                        placeholder='Email'
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />              
                    <Input
                        placeholder='Password'
                        type="text"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit">Sign up</Button>
                <Link to="/Login">Login</Link>
            </div>
        </Container>
    );
}
