import React, { useState, useRef, useEffect } from 'react';
import './ChipInput.css';

interface Chip {
  name: string;
  email: string;
  id: number;
  color: string;
}

interface ChipInputProps {
  initialItems: Chip[];
}

const ChipInput: React.FC<ChipInputProps> = ({ initialItems }) => {
  const [chips, setChips] = useState<Chip[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Chip[]>(initialItems);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue) {
      setSuggestions(
        initialItems.filter(
          item =>
            (item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.email.toLowerCase().includes(inputValue.toLowerCase())) &&
            !chips.some(chip => chip.id === item.id)
        )
      );
    } else {
      setSuggestions(initialItems.filter(item => !chips.some(chip => chip.id === item.id)));
    }
  }, [inputValue, chips, initialItems]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addChip = (chip: Chip) => {
    setChips([...chips, chip]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const removeChip = (chipId: number) => {
    setChips(chips.filter(chip => chip.id !== chipId));
    inputRef.current?.focus();
  };

  return (
    <div className="chip-input-wrapper">
      <h2 className="heading">Pick Users</h2>
      <div className="chip-input-container" onClick={() => inputRef.current?.focus()}>
        {chips.map(chip => (
          <div key={chip.id} className="chip">
            <span className="chip-icon" style={{ backgroundColor: chip.color }} />
            <span className="chip-name">{chip.name}</span>
            <span className="chip-remove" onClick={() => removeChip(chip.id)}>×</span>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="chip-input-field"
          placeholder="Add new user..."
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="suggestion-item" onClick={() => addChip(suggestion)}>
<span className="suggestion-icon" style={{ backgroundColor: suggestion.color }} />
<div className="suggestion-text">
<span className="suggestion-name">{suggestion.name}</span>
<span className="suggestion-email">{suggestion.email}</span>
</div>
</li>
))}
</ul>
)}
</div>
);
};

export default ChipInput;