// components/AddTaskModal.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import taskStore from '../Data/TasksStore';
import { IMyTask } from '../Models/IMyTask';
import emailStore from '../Data/EmailStore';

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
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: lightblue;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
    color: white;
  }
`;

const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: IMyTask = {
            createdAt: new Date(),
            description,
            dueDate: new Date(dueDate),
            email: emailStore.email!,
            id: 0,
            isCompleted: false,
            title,
        };
        await taskStore.addTask(newTask);
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
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label>Due Date</label>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <Button type="submit">Add Task</Button>
                    <Button type="button" onClick={onClose}>Cancel</Button>
                </form>
            </ModalContent>
        </ModalOverlay>
    );
};

export default AddTaskModal;
