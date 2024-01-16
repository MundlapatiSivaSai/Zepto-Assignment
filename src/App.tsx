
import React from 'react';
import ChipInput from './component/ChipInput';

interface Chip {
  name: string;
  email: string;
  id: number;
  color: string;
}

const generateColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 50%)`;
  return color;
};

// Example user data
const userData: { name: string; email: string }[] = [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
  { name: 'lice', email: 'lice@example.com' },
  { name: 'Rob', email: 'Rob@example.com' },
  { name: 'Ice', email: 'ice@example.com' },
  { name: 'Tob', email: 'Tob@example.com' },
  { name: 'Ace', email: 'ace@example.com' },
  { name: 'Bose', email: 'bose@example.com' },
  
];

// Convert it to an array of Chip objects
const initialChips: Chip[] = userData.map((user, index) => ({
  name: user.name,
  email: user.email,
  id: index,
  color: generateColor(user.name)
}));

const App: React.FC = () => {
  return (
    <div className="App">
      <ChipInput initialItems={initialChips} />
    </div>
  );
};

export default App;
