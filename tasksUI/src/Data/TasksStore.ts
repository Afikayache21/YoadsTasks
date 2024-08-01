// src/Data/TasksStore.ts
import { makeAutoObservable } from 'mobx';
import { IMyTask } from '../Models/IMyTask';

class TaskStore {
  tasks: IMyTask[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(tasks: IMyTask[]) {
    this.tasks = tasks;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  async fetchTasks(email: string) {
    this.setLoading(true);
    try {
      const response = await fetch(`https://localhost:7207/api/Task/${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.value) {
          this.setTasks(data.value);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } else {
        console.error('Failed to fetch tasks:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteTask(taskId: number) {
    this.setLoading(true);
    try {
      const response = await fetch(`https://localhost:7207/api/Task/${taskId}`,
        {
          method: 'DELETE'
        });
      if (response.ok) {
        this.setTasks(this.tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      this.setLoading(false);
    }
  }

  async updateTask(updatedTask: IMyTask) {
  
    // cuase to a re render
    // this.setLoading(true);
    try {
      const response = await fetch(`https://localhost:7207/api/Task/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        this.setTasks(this.tasks.map(task => task.id == updatedTask.id ? updatedTask : task));
      } else {
        console.error('Failed to update task:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      this.setLoading(false);
    }
  }

  async addTask(newTask: IMyTask) {
    this.setLoading(true);
    try {
      const response = await fetch(`https://localhost:7207/api/Task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        this.setTasks([...this.tasks, newTask]);
      } else {
        console.error('Failed to add task:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      this.setLoading(false);
    }
  }
}

const taskStore = new TaskStore();
export default taskStore;
