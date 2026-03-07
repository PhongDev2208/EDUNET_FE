import React from 'react';
import { useParams } from 'react-router-dom';

const Answer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Quiz Answers - {id}</h1>
      <p>List of answers/attempts will be here.</p>
    </div>
  );
};

export default Answer;
