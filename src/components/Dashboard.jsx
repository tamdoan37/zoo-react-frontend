import { useState, useEffect } from 'react';
import { useVisitors } from '../context/VisitorContext';
import { useAnimals } from '../hooks/useAnimals';
//import { useLocations } from '../hooks/useLocations';
import AnimalCard from './AnimalCard';

const Dashboard = () => {
  // --- GLOBAL STATE & API DATA ---
  const { visitorCount, updateVisitors } = useVisitors();
  const { animals, loading, error } = useAnimals();
  //const { locations } = useLocations();

  // --- LOCAL UI STATE ---
  const [zooStatus, setZooStatus] = useState('open');
  const [pageLoads, setPageLoads] = useState(0);
  
  // Feedback Messages
  const [storageMsg, setStorageMsg] = useState('');
  const [formStatusMsg, setFormStatusMsg] = useState('');
  const [membershipMsg, setMembershipMsg] = useState('');
  const [bookingMsg, setBookingMsg] = useState('');

  // --- FORM STATE ---
  const [localAnimal, setLocalAnimal] = useState({ species: '', habitat: '', age: '' });
  const [newAnimal, setNewAnimal] = useState({ a_name: '', a_contact: '', a_phone: '' });
  const [memberData, setMemberData] = useState({ m_name: '', m_email: '', m_type: '', m_start: '', m_emg_name: '', m_emg_phone: '' });
  const [bookingData, setBookingData] = useState({ b_name: '', b_email: '', b_phone: '', b_animal: '', b_when: '', b_group: 1 });

  // --- LIFECYCLE EFFECTS ---
useEffect(() => {
    const currentLoads = parseInt(sessionStorage.getItem('page_loads') || '0');
    setPageLoads(currentLoads + 1);
}, []);

useEffect(() => {
    // EFFECT: Only synchronize the new state to the external system (sessionStorage)
    sessionStorage.setItem('page_loads', pageLoads.toString());
  }, [pageLoads]);

  // --- COMPONENT METHODS ---
  const toggleZooStatus = () => setZooStatus(prev => prev === 'open' ? 'closed' : 'open');

  const saveLocal = () => {
    localStorage.setItem('temp_animal', JSON.stringify(localAnimal));
    setStorageMsg('Animal saved locally!');
  };

  const loadLocal = () => {
    const data = localStorage.getItem('temp_animal');
    if (data) {
      setLocalAnimal(JSON.parse(data));
      setStorageMsg(`Loaded: ${JSON.parse(data).species}`);
    }
  };

  const clearLocal = () => {
    localStorage.removeItem('temp_animal');
    setLocalAnimal({ species: '', habitat: '', age: '' });
    setStorageMsg('Storage cleared');
  };

  // Form Submission Handlers
  const handleAddAnimal = (e) => {
    e.preventDefault();
    setFormStatusMsg('Adding animal...');
    // Future API call goes here
  };

  const handleMembership = (e) => {
    e.preventDefault();
    setMembershipMsg('Registration submitted!');
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingMsg('Booking submitted!');
  };

  // --- FOR RENDERING ---
  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      <h1>NTC Zoo Management</h1>
      <p id="status" className="msg" aria-live="polite">
        {zooStatus === 'open' ? 'Zoo is Open' : 'Zoo is Closed'}
      </p>
      {/* Zoo status and visitors coutners */}
      <section>
        <div className="zoo-status-container">
          <button id="zooStatusBtn" data-status={zooStatus} onClick={toggleZooStatus}>
            {zooStatus === 'open' ? 'Open' : 'Closed'}
          </button>
        </div>

        <div className="visitor-counter-container">
          <button onClick={() => updateVisitors('decrement')}>-</button>
          <output id="visitorCount">{visitorCount}</output>
          <button onClick={() => updateVisitors('increment')}>+</button>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h2>Updates</h2>
            <button >Enable Notifications</button>

      </section>

      {/* Local Storage */}
      <section>
        <h2>Local Storage</h2>
        <div className="formCard">
          <div className="field">
            <label htmlFor="animalSpecies">Species</label>
            <input id="animalSpecies" value={localAnimal.species} onChange={(e) => setLocalAnimal({...localAnimal, species: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="animalHabitat">Habitat</label>
            <input id="animalHabitat" value={localAnimal.habitat} onChange={(e) => setLocalAnimal({...localAnimal, habitat: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="animalAge">Age</label>
            <input id="animalAge" type="number" value={localAnimal.age} onChange={(e) => setLocalAnimal({...localAnimal, age: e.target.value})} />
          </div>
          <div className="actions">
            <button onClick={saveLocal}>Save Animal</button>
            <button onClick={loadLocal}>Load Animals</button>
            <button onClick={clearLocal}>Clear Storage</button>
          </div>
        </div>
        <p className="msg">{storageMsg}</p>
      </section>

      {/* Sessison loads*/}
      <section>
        <div className="msg" style={{ marginTop: '10px', padding: '10px', background: '#eef2f7', borderRadius: '8px' }}>
          Page Loads this Session: {pageLoads}
        </div>
      </section>

      {/* animals grid */}
      <section>
        <h2>Animals</h2>
        {loading ? <p>Loading animals...</p> : error ? <p className="msg err">{error}</p> : (
          <div id="animalCards">
            {animals && animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>

      {/* Add new animal */}
      <section>
        <h2>Add New Animal</h2>
        <form className="formCard" onSubmit={handleAddAnimal}>
          <div className="field">
            <label htmlFor="a_name">Animal Name</label>
            <input id="a_name" required value={newAnimal.a_name} onChange={(e) => setNewAnimal({...newAnimal, a_name: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="a_contact">Zoo keeper Email</label>
            <input id="a_contact" type="email" required value={newAnimal.a_contact} onChange={(e) => setNewAnimal({...newAnimal, a_contact: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="a_phone">Zoo keeper Phone</label>
            <input id="a_phone" type="tel" required value={newAnimal.a_phone} onChange={(e) => setNewAnimal({...newAnimal, a_phone: e.target.value})} />
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>Add Animal</button>
        </form>
        <p className="msg">{formStatusMsg}</p>
      </section>

      {/* Membership Registration */}
      <section>
        <h2>Membership Registration</h2>
        <p className="msg">{membershipMsg}</p>
        <form className="formCard" onSubmit={handleMembership}>
          <div className="field">
            <label htmlFor="m_name">Member name *</label>
            <input id="m_name" required value={memberData.m_name} onChange={(e) => setMemberData({...memberData, m_name: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="m_email">Email *</label>
            <input id="m_email" type="email" required value={memberData.m_email} onChange={(e) => setMemberData({...memberData, m_email: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="m_type">Membership type</label>
            <select id="m_type" required value={memberData.m_type} onChange={(e) => setMemberData({...memberData, m_type: e.target.value})}>
              <option value="">Select type</option>
              <option value="Individual">Individual</option>
              <option value="Family">Family</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="m_start">Start date *</label>
            <input id="m_start" type="date" required value={memberData.m_start} onChange={(e) => setMemberData({...memberData, m_start: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="m_emg_name">Emergency contact (name)</label>
            <input id="m_emg_name" value={memberData.m_emg_name} onChange={(e) => setMemberData({...memberData, m_emg_name: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="m_emg_phone">Emergency contact (phone)</label>
            <input id="m_emg_phone" value={memberData.m_emg_phone} onChange={(e) => setMemberData({...memberData, m_emg_phone: e.target.value})} />
          </div>
          <div className="actions">
            <button type="submit">Create membership</button>
            <button type="button" onClick={() => setMemberData({ m_name: '', m_email: '', m_type: '', m_start: '', m_emg_name: '', m_emg_phone: '' })}>Reset</button>
          </div>
        </form>
      </section>

      {/* Animal Encounter Booking */}
      <section>
        <h2>Animal Encounter Booking</h2>
        <p className="msg">{bookingMsg}</p>
        <form className="formCard" onSubmit={handleBooking}>
          <div className="field">
            <label htmlFor="b_name">Visitor name *</label>
            <input id="b_name" required value={bookingData.b_name} onChange={(e) => setBookingData({...bookingData, b_name: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="b_email">Email *</label>
            <input id="b_email" type="email" required value={bookingData.b_email} onChange={(e) => setBookingData({...bookingData, b_email: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="b_phone">Phone *</label>
            <input id="b_phone" type="tel" required value={bookingData.b_phone} onChange={(e) => setBookingData({...bookingData, b_phone: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="b_animal">Selected animal *</label>
            <select id="b_animal" required value={bookingData.b_animal} onChange={(e) => setBookingData({...bookingData, b_animal: e.target.value})}>
              <option value="">Select an animal</option>
              <option value="Ellie">Ellie (Elephant)</option>
              <option value="Rajah">Rajah (Tiger)</option>
              <option value="Bao">Bao (Panda)</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="b_when">Preferred date/time *</label>
            <input id="b_when" type="datetime-local" required value={bookingData.b_when} onChange={(e) => setBookingData({...bookingData, b_when: e.target.value})} />
          </div>
          <div className="field">
            <label htmlFor="b_group">Group size (1–50) *</label>
            <input id="b_group" type="number" min="1" max="50" required value={bookingData.b_group} onChange={(e) => setBookingData({...bookingData, b_group: e.target.value})} />
          </div>
          <div className="actions">
            <button type="submit">Book encounter</button>
            <button type="button" onClick={() => setBookingData({ b_name: '', b_email: '', b_phone: '', b_animal: '', b_when: '', b_group: 1 })}>Reset</button>
          </div>
        </form>
      </section>

    </div>
  );
};

export default Dashboard;