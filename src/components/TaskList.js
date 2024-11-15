import React from 'react';
import { ListGroup, Button, Badge, Row, Col } from 'react-bootstrap';

function TaskList({ tasks, deleteTask, editTask }) {
  const isTimeRunningOut = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0; // Merah jika deadline kurang dari atau sama dengan 2 hari
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
      {/* Header Section */}
      <ListGroup.Item className="d-flex justify-content-between align-items-center bg-light">
        <Row className="w-100">
          <Col md={4} className="fw-bold">Task</Col>
          <Col md={2} className="fw-bold">Priority</Col>
          <Col md={2} className="fw-bold">Status</Col>
          <Col md={2} className="fw-bold text-center">deadline</Col>
          <Col md={2} className="fw-bold text-center">Actions</Col>
        </Row>
      </ListGroup.Item>

      {/* Task Items */}
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            className="d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: isTimeRunningOut(task.endDate) ? '#f8d7da' : 'white', // Merah muda jika deadline 2 hari atau kurang
              color: isTimeRunningOut(task.endDate) ? '#721c24' : 'black' // Merah tua untuk teks jika deadline 2 hari atau kurang
            }}
          >
            <Row className="w-100">
              {/* Task Name */}
              <Col md={4}>
                <h5 className="mb-0">{task.name}</h5>
              </Col>

              {/* Task Priority */}
              <Col md={2}>
                <Badge
                  bg={
                    task.priority === 'High' ? 'danger' :
                    task.priority === 'Medium' ? 'warning' : 'secondary'
                  }
                  className="me-2"
                >
                  {task.priority}
                </Badge>
              </Col>

              {/* Task Status */}
              <Col md={2}>
                <Badge bg="info">{task.status}</Badge>
              </Col>

              {/* Timeline - Start and End Date */}
              <Col md={2} className="text-center">
                <div>{task.startDate || '-'}</div>
                <div>{task.endDate || '-'}</div>
              </Col>

              {/* Action Buttons */}
              <Col md={2} className="text-center">
                <Button variant="outline-primary" onClick={() => editTask(task)} className="me-2">
                  Edit
                </Button>
                <Button variant="outline-danger" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default TaskList;
