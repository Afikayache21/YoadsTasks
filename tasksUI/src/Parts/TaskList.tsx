// Parts/TaskList.tsx

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import taskStore from '../Data/TasksStore';
import emailStore from '../Data/EmailStore';
import { IMyTask } from '../Models/IMyTask';
import TaskEditModal from './EditModal';

//#region TaskListStyledComponents

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const TaskItem = styled.div<{ $completed: boolean }>`
  background-color: ${(props) => (props.$completed ? 'lightgreen' : 'lightblue')};
  color: black;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
`;

const TaskDetails = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #e8eef3;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: darkblue;
  }
`;

const CheckButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;

  &:hover {
    color: darkgreen;
  }
`;
//#endregion

const formatDate = (dateInput: any) => {
  if (!dateInput) {
    return 'No Date Provided';
  }

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return date.toLocaleDateString();
};

const TaskList = observer(({ searchBarValue }: { searchBarValue: string }) => {
  const [openTaskIds, setOpenTaskIds] = useState<number[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<IMyTask | null>(null);

  useEffect(() => {
    if (emailStore.email) {
      taskStore.fetchTasks(emailStore.email);
    }
  }, [emailStore.email]);

  const handleClick = (taskId: number) => {
    setOpenTaskIds((prevOpenTaskIds) =>
      prevOpenTaskIds.includes(taskId)
        ? prevOpenTaskIds.filter((id) => id !== taskId)
        : [...prevOpenTaskIds, taskId]
    );
  };

  const handleDelete = async (taskId: number) => {
    await taskStore.deleteTask(taskId);
  };

  const handleEdit = (task: IMyTask) => {
    setTaskToEdit(task);
  };

  const handleToggleComplete = async (e: any, task: IMyTask) => {
    e.preventDefault();
    await taskStore.updateTask({
      ...task,
      isCompleted: !task.isCompleted,
    });
  };

  if (taskStore.loading) {
    return <div>Loading tasks...</div>;
  }

  const filteredTasks = taskStore.tasks.filter((task) =>
    task.title.toLowerCase().includes(searchBarValue.toLowerCase()) ||
    task.description.toLowerCase().includes(searchBarValue.toLowerCase())
  );

  return (
    <TaskContainer>
      {filteredTasks.length === 0 ? (
        <div>No tasks found.</div>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem key={task.id} $completed={task.isCompleted}>
            <h2>{task.title}</h2>
            {formatDate(task.dueDate)}
            <ButtonContainer>
              <IconButton onClick={() => handleEdit(task)}>✏️</IconButton>
              <IconButton onClick={() => handleDelete(task.id)}>🗑️</IconButton>
              <IconButton onClick={() => handleClick(task.id)}>⮟</IconButton>
            </ButtonContainer>
            {openTaskIds.includes(task.id) && (
              <TaskDetails>
                <p>Due Date: {formatDate(task.dueDate)}</p>
                <p>{task.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '80% 20%', gap: '10px' }}>
                  <p style={{ backgroundColor: task.isCompleted ? 'green' : 'red', borderRadius: '5px' }}>
                    Completed: {task.isCompleted ? 'Yes' : 'No'}
                  </p>
                  <CheckButton onClick={(e) => handleToggleComplete(e, task)}>
                    {task.isCompleted ? '❌' : '✅'}
                  </CheckButton>
                </div>
              </TaskDetails>
            )}
          </TaskItem>
        ))
      )}     
      {taskToEdit && <TaskEditModal task={taskToEdit} onClose={() => setTaskToEdit(null)} />}
    </TaskContainer>
  );
});

export default TaskList;
