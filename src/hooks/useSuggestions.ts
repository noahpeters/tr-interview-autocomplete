import { useEffect, useState } from 'react';

export function useSuggestions(input: string): string[] {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const response = fetch(
      `https://autocomplete-lyart.vercel.app/api/words?query=${input}&limit=10`,
    )
      .then(async (res) => {
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setSuggestions(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching suggestions:', err);
      });

    return () => {
      // TODO: cancel fetch request if still pending
    };
  }, [input]);

  return suggestions;
}
