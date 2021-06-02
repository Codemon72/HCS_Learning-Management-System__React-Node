import { useState, useContext } from "react";
import { CourseContext } from '../contexts/CourseContext';

const AddSessions = () => {
  console.log("AddSessions rendered");

  const { courseEvents } = useContext(CourseContext);

  const initialFormState = [
    {
      course_event_id: "",
      session_start: "",
      session_end: ""
    }
  ];

  const [courseEventID, setcourseEventID] = useState('');
  const [formState, setFormState] = useState(initialFormState);

  const handleCourseChoice = (event) => {
    const { value } = event.target;
    setcourseEventID(value);
  }

  const handleSessionInputChange = (event, i) => {
    let temp = [...formState];
    const { name, value } = event.target;
    console.log(i);
    temp[i][name] = value;
    temp[i].course_event_id = courseEventID;
    setFormState(temp);
    console.log(temp);
  };

  const addSessionForm = (e) => {
    e.preventDefault();
    let temp = [...formState];
    temp.push({course_event_id: '', session_start: '', session_end: ''});
    console.log(temp);
    setFormState(temp);
  };

  return (
  <div className="dashboard__session">
    <h3>Add Sessions</h3>
    <br />
    <div className="input-group vertical">
      <label htmlFor="course_event_id">Choose Course</label>
      <select 
        name="course_event_id"
        value={courseEvents.course_event_id}
        onChange={handleCourseChoice}
        className="input-field">
        {courseEvents.map((course_event) => {
          return(
            <option value={course_event.course_event_id}>
              {course_event.Course_Module.name} | {course_event.course_start_date} - {course_event.course_end_date}
            </option>
          )
        })}
      </select>
    </div>
    <br />
    <form action="">
    {formState.map((session, i) => {
        return (
          <div key={i}>
            <h4>{i + 1}. Session</h4>
            <div className="input-group">
              <label htmlFor="session_start">Start</label>
              <input 
                type="datetime-local" 
                name="session_start" 
                className="input-field"
                onChange={e => handleSessionInputChange(e, i)}
                value={session.session_start}/>
            </div>
            <div className="input-group">
              <label htmlFor="session_end">End</label>
              <input 
                type="datetime-local" 
                name="session_end" 
                className="input-field"
                onChange={e => handleSessionInputChange(e, i)}
                value={session.session_end}/>
            </div>
          </div>
          )
      })}
      <button className="dashboard__session" onClick={addSessionForm}>+</button>
      <br />
      <br />
      <div className="input-group">
      <input 
        type="submit" 
        className="button" 
        disabled
        />
      </div>
    </form>
  </div>
)};

export default AddSessions
