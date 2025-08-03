import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, InputGroup } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add or update a task
  const handleSave = () => {
    if (!text.trim()) return;

    if (editingId) {
      // Edit existing task
      const updated = tasks.map(task =>
        task.id === editingId ? { ...task, text } : task
      );
      setTasks(updated);
      setEditingId(null);
    } else {
      // Add new task
      const newTask = { id: Date.now(), text, done: false };
      setTasks([...tasks, newTask]);
    }

    setText('');
  };

  const handleEdit = (task) => {
    setText(task.text);
    setEditingId(task.id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center text-primary mb-4">📝 ToDo List</h3>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter task..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant={editingId ? 'warning' : 'primary'}
              onClick={handleSave}
            >
              {editingId ? 'Update' : 'Add'}
            </Button>
          </InputGroup>

          <ListGroup>
            {tasks.map(task => (
              <ListGroup.Item
                key={task.id}
                className="d-flex justify-content-between mb-1 align-items-center"
              >
                <span>{task.text}</span>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleEdit(task)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    ❌
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
