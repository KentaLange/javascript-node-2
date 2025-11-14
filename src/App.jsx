import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';

export default function App() {
  const [name, setName] = useState('');
  const [people, setPeople] = useState(profiles);
  //profiles=id,name,likes
  const handleSubmit = (e) => {
    e.preventDefault();//prevent default behavior
    const trimmed = name.trim();
    console.log(trimmed);
    
    const newId = Math.max(...people.map(p => p.id), 0) + 1;
    setPeople([...people, { id: newId, name: trimmed, likes: 0 }]);
    setName('');
  };

  const trimmed = name.trim();
  const isNameEmpty = !trimmed;
  const isNameExists = trimmed && people.some(p => p.name.toLowerCase() === trimmed.toLowerCase());
  const Invalid = isNameEmpty || isNameExists;

  const increaseLike = (id) => {
    setPeople(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      {/* Add Profile Form */}
      <div className="mb-5 p-4 bg-light rounded">
        <h2 className="mb-3">Add Profile</h2>
        <Form onSubmit={handleSubmit}>
      
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter profile name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={name.length > 0 && Invalid}
            />
            {isNameEmpty && <p>empty name</p>}
            {isNameExists && <p>name already exists</p>}
          
          <Button type="submit" disabled={Invalid}>
            Add 
          </Button>
        </Form>
      </div>

      
      <h2 className="mb-4">All Profiles</h2>
      <Row xs={1} md={2} lg={3}>
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} onLike={() => increaseLike(p.id)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}