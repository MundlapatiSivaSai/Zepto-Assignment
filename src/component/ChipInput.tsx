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

const HighlightMatch = ({ name, searchValue }: { name: string; searchValue: string }) => {
  if (!searchValue) return <>{name}</>;
  const regex = new RegExp(searchValue, 'gi');
  const parts = name.split(regex);
  const matches = name.match(regex);
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="highlight">{matches![index]}</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const ChipInput: React.FC<ChipInputProps> = ({ initialItems }) => {
  const [chips, setChips] = useState<Chip[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Chip[]>(initialItems);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const [suggestionListPosition, setSuggestionListPosition] = useState({ top: 0, left: 0 });

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

  useEffect(() => {
    const updateSuggestionPosition = () => {
      if (suggestionsRef.current && inputRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        setSuggestionListPosition({
          top: inputRect.bottom,
          left: inputRect.left,
        });
      }
    };

    window.addEventListener('resize', updateSuggestionPosition);
    updateSuggestionPosition();

    return () => {
      window.removeEventListener('resize', updateSuggestionPosition);
    };
  }, [chips]); 

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
        <ul
          className="suggestions-list"
          ref={suggestionsRef}
          style={{ top: suggestionListPosition.top, left: suggestionListPosition.left }}
        >
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="suggestion-item" onClick={() => addChip(suggestion)}>
              <span className="suggestion-icon" style={{ backgroundColor: suggestion.color }} />
              <div className="suggestion-text">
                <span className="suggestion-name">
                  <HighlightMatch name={suggestion.name} searchValue={inputValue} />
                </span>
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
