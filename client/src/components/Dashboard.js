import { useState, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';

const Dashboard = () => {

  console.log('Dashboard rendered');

  const { fetchCourseData } = useContext(CourseContext);

  const [formState, setFormState] = useState({
    name: 'null',
    start_date: '',
    end_date: '',
    hours: '',
    teacher_id: 'null'
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value
    });
  };       

  const addCourseToDB = () => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formState)
    };

    fetch('http://localhost:4000/api/courses/add', options)
      .then(response => response.json())
      .then(data => {console.log(data)})
      .catch(error => console.log('error adding course: ' + error));
  }

  const handleAddCourse = (e) => {
    e.preventDefault();
    addCourseToDB();
    console.log(formState);
    setFormState({
      name: 'null',
      start_date: '',
      end_date: '',
      hours: '',
      teacher_id: 'null'
    });
    // refresh Display
    fetchCourseData();
  }

  return (
    <div className="dashboard">

      <h3>Dashboard</h3><br/><br/>

      <form onSubmit={handleAddCourse}>
      <div className="input-group">
        <label htmlFor="name">Course Name</label>
        <select 
          className="input-field"
          name="name" 
          value={formState.name}
          onChange={handleInputChange} >
          <option value="null" disabled hidden>Please select</option>
          <option value="HTML & CSS">HTML & CSS</option>
          <option value="Learn To Code">Learn To Code</option>
          <option value="JavaScript For Web">JavaScript For Web</option>
          <option value="React.js">React.js</option>
          <option value="Node.js">Node.js</option>
          <option value="Vue.js">Vue.js</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="start_date">Start Date</label>
        <input 
          className="input-field"
          type="date"
          name="start_date"
          value={formState.start_date}
          onChange={handleInputChange}
          />
      </div>
      <div className="input-group">
        <label htmlFor="end_date">End Date</label>
        <input 
          className="input-field"
          type="date"
          name="end_date"
          value={formState.end_date}
          onChange={handleInputChange}
          />
      </div>
      <div className="input-group">
        <label htmlFor="hours">Hours Total</label>
        <input 
          className="input-field"
          type="number" 
          name="hours" 
          placeholder="number" 
          maxLength="100"
          value={formState.hours}
          onChange={handleInputChange} 
          />
      </div>
      <div className="input-group">
        <label htmlFor="teacher_id">Teacher</label>
        <select 
        type="number"
        name="teacher_id" 
        className="input-field"
        value={formState.teacher_id}
        onChange={handleInputChange}
        required
        >
          <option value="" disabled hidden>Please select</option>
          <option value="null">not determined yet</option>
          <option value="2">Alexander Löhn</option>
          <option value="5">Ansgar Mertens</option>
          <option value="11">Benjamin Rabe</option>
          <option value="7">Christoph Eicke</option>
          <option value="1">Helder Pereira</option>
          <option value="4">Jonas Reitmann</option>
          <option value="8">Teresa Holfeld</option>
          <option value="9">Thomas Hedeler</option>
          <option value="10">Mary Vokicic</option>
          <option value="3">Paul Anton</option>
          <option value="6">Paul Mölders</option>
        </select>
      </div>
      
      <div className="input-group">
      <input type="submit" />
      </div>

    </form>
    {/* ToDo */}
    {/* <button onClick={() => console.log('--- Break ---')}>Log Break</button> */}
    </div>
  )
}

export default Dashboard