import React, { useState } from 'react';
import styled from 'styled-components';
import { IMyTask } from '../Models/IMyTask';
import taskStore from '../Data/TasksStore';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white ;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  max-height: 400px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  margin: 10px;
  background-color: lightblue;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
    color: white;
  }
`;

const TaskEditModal = ({ task, onClose }: { task: IMyTask, onClose: () => void }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate) : null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, dueDate:new Date(task.dueDate)};
    await taskStore.updateTask(updatedTask);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Description</label>
            <textarea style={{maxWidth: '100%',minWidth: '100%',maxHeight: '220px',minHeight: '100px'}} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="datetime-local"
              name="dueDate"
              value={dueDate ? new Date(dueDate).toISOString().substring(0, 16) : ''}
              onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : null)}
            />
          </div>
          <Button type="submit">Save</Button>
          <Button type="button" onClick={onClose}>Cancel</Button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TaskEditModal;
