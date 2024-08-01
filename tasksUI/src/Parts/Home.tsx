// components/Home.tsx
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailStore from '../Data/EmailStore';
import SearchBar from './SearchBar';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';
import styled from 'styled-components';

const AddButton = styled.button`
  margin: 20px;
  padding: 10px 15px;
  background-color: none;
  border: none;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
    color: white;
  }
`;

const Home = observer(() => {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!emailStore.email) {
      navigate('/login');
    }
  }, [emailStore.email, navigate]);

  if (!emailStore.email) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="HomePage">
      <SearchBar setSearchBarValue={setSearchBarValue} />
      
      <AddButton onClick={() => setShowAddTaskModal(true)}>+</AddButton>
      <TaskList searchBarValue={searchBarValue} />
      {showAddTaskModal && <AddTaskModal onClose={() => setShowAddTaskModal(false)} />}
    </div>
  );
});

export default Home;
