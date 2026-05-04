import 'react';

const AnimalCard = ({ animal }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{animal.name} ({animal.species})</h3>
      <p style={{ margin: 0 }}><strong>Health:</strong> {animal.health}</p>
      {animal['feeding schedule'] && (
        <p style={{ margin: 0 }}>
          <strong>Feeding:</strong> {animal['feeding schedule'].time} — {animal['feeding schedule'].notes}
        </p>
      )}
      <p style={{ margin: 0 }}>
        <strong>Location:</strong> {animal.location.latitude}, {animal.location.longitude}
      </p>
    </div>
  );
};

export default AnimalCard;