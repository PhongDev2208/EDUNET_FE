import React from 'react';
import { useParams } from 'react-router-dom';

const Practics: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Quiz Practice - {id}</h1>
      <p>Quiz practice interface will be here.</p>
    </div>
  );
};

export default Practics;
