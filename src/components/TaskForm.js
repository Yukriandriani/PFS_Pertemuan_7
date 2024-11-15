import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

function TaskForm({ show, handleClose, addTask, updateTask, currentTask }) {
  const [task, setTask] = useState({
    name: '',
    priority: 'Low',
    status: 'To Do',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({ name: '', priority: 'Low', status: 'To Do', startDate: '', endDate: '' });
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTask && task.id) {
      updateTask(task);
    } else {
      addTask(task);
    }
    handleClose(); // Tutup modal setelah submit
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentTask ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="taskName">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter task name"
              value={task.name || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row className="mt-3">
            <Col>
              <Form.Group controlId="taskPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  value={task.priority || 'Low'}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="taskStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={task.status || 'To Do'}
                  onChange={handleChange}
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={task.startDate || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={task.endDate || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            {currentTask ? 'Update Task' : 'Add Task'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskForm;
