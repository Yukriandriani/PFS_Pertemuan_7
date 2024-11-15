import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Container, Button } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    console.log('Task added:', task); // Debugging
    setShowTaskForm(false); // Tutup form setelah menambah task
  };

  const updateTask = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    setCurrentTask(null);
    setShowTaskForm(false); // Tutup form setelah memperbarui task
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (task) => {
    setCurrentTask(task);
    setShowTaskForm(true); // Buka form untuk mengedit task
  };

  const handleShowTaskForm = () => {
    setCurrentTask(null); // Reset task yang sedang diedit
    setShowTaskForm(true); // Buka form untuk menambah task baru
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false); // Tutup form tanpa menambahkan/memperbarui task
    setCurrentTask(null);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Task List</h1>
      <Button variant="primary" onClick={handleShowTaskForm} className="mb-3">
        + Add Task
      </Button>
      <TaskForm
        show={showTaskForm}
        handleClose={handleCloseTaskForm}
        addTask={addTask}
        updateTask={updateTask}
        currentTask={currentTask}
      />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </Container>
  );
}

export default App;
