import React from 'react';
import { useParams } from 'react-router-dom';

const DetailAnswer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Detailed Answer Review - {id}</h1>
      <p>Detailed review of a specific quiz attempt.</p>
    </div>
  );
};

export default DetailAnswer;
