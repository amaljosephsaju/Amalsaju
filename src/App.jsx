import { useState } from 'react';
import './App.css';

function App() {
  const [userinput, setuserinput] = useState('');
  const [todo, settodo] = useState([]);
  const [category, setcategory] = useState('personal');
  const [priority, setPriority] = useState('Medium');
  const [duedate, setduedate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const OnInputKeydown = e => {
    if (e.key == 'Enter') {
      addtodo();
    }
  };
  const OnInputChange = e => {
    setuserinput(e.target.value);
  };

  const onCategoryChange = e => {
    setcategory(e.target.value);
  };

  const onPriorityChange = e => {
    setPriority(e.target.value);
  };
  const onDuedateChange = e => {
    setduedate(e.target.value);
  };

  const addtodo = () => {
    if (userinput) {
      const newtodo = {
        text: userinput,
        category: category,
        priority: priority,
        duedate: duedate,
      };
      settodo([...todo, newtodo]);
      setuserinput('');
      closeModal();
    }
  };

  const onDeleteTask = index => {
    const todocopy = [...todo];
    todocopy.splice(index, 1);
    settodo(todocopy);
  };

  return (
    <div className="todo-app">
      <div
        style={{ display: isModalOpen ? 'block' : 'none' }}
        onClick={closeModal}
        className="layer"
      ></div>
      <div className="filter-todo">
        <div className="category-sec">
          Category
          <select value="Category">
            <option value="All">All</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div>
        <div className="priority-sec">
          Priority
          <select value="Priority">
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <div
        style={{ display: isModalOpen ? 'block' : 'none' }}
        className="edit-box"
      >
        <div className="modal-text">
          <p>TODO</p>
          <input
            type="text"
            onKeyDown={OnInputKeydown}
            value={userinput}
            onChange={OnInputChange}
          />
        </div>
        <div className="modal-category">
          <label>Category:</label>
          <select value={category} onChange={onCategoryChange}>
            <option>Personal</option>
            <option>Work</option>
          </select>
        </div>
        <div className="modal-priority">
          <label>Priority:</label>
          <select value={priority} onChange={onPriorityChange}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="modal-date">
          <label>Due date:</label>
          <input type="date" onChange={onDuedateChange} />
        </div>
        <div className="todo-btn">
          <button onClick={addtodo}>ADD TODO</button>
        </div>
      </div>
      <div className="header">
        <h1>To-Do-App</h1>
      </div>
      <button className="btn" onClick={openModal}>
        ADD TASK
      </button>
      <div className="task-container">
        <h1>TASK</h1>
        <div className="todo-list">
          {todo.map((item, index) => (
            <div
              key={index}
              className={`todo-item ${
                item.priority === 'High'
                  ? 'high-priority'
                  : item.priority === 'Medium'
                  ? 'medium-priority'
                  : 'low-priority'
              }`}
            >
              <input type="checkbox" />
              <p>{item.text}</p>
              <p>Category: {item.category}</p>
              <p>Priority: {item.priority}</p>
              <p>duedate: {item.duedate}</p>
              <i
                onClick={() => {
                  onDeleteTask(index);
                }}
                class="fa-solid fa-trash-can"
              ></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
