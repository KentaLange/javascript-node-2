import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    // Validation
    if (!trimmed) {
      return; // Name required
    }

    const exists = people.some(p => p.name.toLowerCase() === trimmed.toLowerCase());//checks for same name
    if (exists) {
      return; // Name must be unique
    }

    // Create new profile
    const newId = Math.max(...people.map(p => p.id), 0) + 1;
    setPeople([...people, { id: newId, name: trimmed, likes: 0 }]);
    setName('');
  };

  const trimmed = name.trim();
  const isNameEmpty = !trimmed;
  const isNameExists = trimmed && people.some(p => p.name.toLowerCase() === trimmed.toLowerCase());
  const isInvalid = isNameEmpty || isNameExists;

  const increaseLike = (id) => {
    setPeople(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
      <Row xs={1} md={2} lg={3}>
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} onLike={() => increaseLike(p.id)} />
          </Col>
        ))}
      </Row>
      <h1 className="mb-4 text-center">Add Profile</h1>
      <form onSubnmit={handleSubmit}>
        Name: <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button type="add" disabled={isInvalid}>Add </button>
        {isNameExists && <p>Name already exists.</p>}
        {isNameEmpty && <p>No empty names allowed.</p>}
        
      </form>
    </Container>
  );
}