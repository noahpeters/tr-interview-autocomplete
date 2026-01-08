import { useEffect, useRef, useState } from 'react';
import { useSuggestions } from '../hooks/useSuggestions';

type AutoCompleteProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export function AutoComplete({ defaultValue = '', onChange }: AutoCompleteProps) {
  const [input, setInput] = useState(defaultValue);
  const suggestions = useSuggestions(input);
  const [position, setPosition] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    onChange?.(input);
    if (input.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [input]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      setPosition((position ?? -1) + 1);
    } else if (e.key === 'ArrowUp') {
      setPosition((position ?? suggestions.length) - 1);
    } else if (e.key === 'Enter' && position !== null && suggestions[position]) {
      setInput(suggestions[position]);
      setPosition(null);
      setTimeout(() => setShowSuggestions(false));
    }
  }

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="text"
        placeholder="auto complete"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={ref}
      />
      {showSuggestions ? (
        <ul
          className="auto-complete-list"
          style={{
            top: ref.current ? ref.current.offsetTop + 4 : 0,
            left: ref.current ? ref.current.offsetLeft : 0,
            width: ref.current ? ref.current.offsetWidth : 'auto',
          }}
        >
          {suggestions.map((s, index) => (
            <li key={s}>{index === position ? <strong>{s}</strong> : s}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
