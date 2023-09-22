import { IBoard } from '@/typings';
import { formatTodosForAi } from './formatTodosForAi';

export const fetchSuggestion = async (board: IBoard) => {
  const todos = formatTodosForAi(board);

  const response = await fetch('/api/generateSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todos }),
  });
  const GPTdata = await response.json();
  const { content } = GPTdata;

  return content;
};
