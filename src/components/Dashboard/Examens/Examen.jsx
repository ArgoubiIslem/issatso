import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { MOCK_EVENTS } from './event';
const localizer = momentLocalizer(moment);
function Examen() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [cours, setCours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [titre, setTitre] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [document, setDocument] = useState('');

  // Fonction pour ouvrir la modale
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  // Fonction pour fermer la modale
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  useEffect(() => {
    axios
      .get('http://localhost:8083/cours')
      .then((res) => setCours(res.data))
      .catch((err) => console.log(err));
  }, []);

  //partie js
  const handleModeSwitch = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  /*useEffect(() => {
    
  });
  useEffect(() => {
    var modeSwitch = document.querySelector('.mode-switch');
    modeSwitch.addEventListener('click', function () {
      document.documentElement.classList.toggle('light');
      modeSwitch.classList.toggle('active');
    });
    document.querySelector('.jsFilter').addEventListener('click', function () {
      document.querySelector('.filter-menu').classList.toggle('active');
    });

    document.querySelector('.grid').addEventListener('click', function () {
      document.querySelector('.list').classList.remove('active');
      document.querySelector('.grid').classList.add('active');
      document
        .querySelector('.products-area-wrapper')
        .classList.add('gridView');
      document
        .querySelector('.products-area-wrapper')
        .classList.remove('tableView');
    });

    document.querySelector('.list').addEventListener('click', function () {
      document.querySelector('.list').classList.add('active');
      document.querySelector('.grid').classList.remove('active');
      document
        .querySelector('.products-area-wrapper')
        .classList.remove('gridView');
      document
        .querySelector('.products-area-wrapper')
        .classList.add('tableView');
    });
  }, []);*/
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8083/create', {
        titre,
        code,
        description,
        document,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false); // Close modal after successful submission
        // Optionally update state or fetch data again
      })
      .catch((err) => console.log(err));
  };
  const events = MOCK_EVENTS.map((event) => {
    // new Date(Y, M, D, H, MIN)
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: event.color,
    };
  });
  return (
    <div>
      <div className="app-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="app-icon">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M507.606 371.054a187.217 187.217 0 00-23.051-19.606c-17.316 19.999-37.648 36.808-60.572 50.041-35.508 20.505-75.893 31.452-116.875 31.711 21.762 8.776 45.224 13.38 69.396 13.38 49.524 0 96.084-19.286 131.103-54.305a15 15 0 004.394-10.606 15.028 15.028 0 00-4.395-10.615zM27.445 351.448a187.392 187.392 0 00-23.051 19.606C1.581 373.868 0 377.691 0 381.669s1.581 7.793 4.394 10.606c35.019 35.019 81.579 54.305 131.103 54.305 24.172 0 47.634-4.604 69.396-13.38-40.985-.259-81.367-11.206-116.879-31.713-22.922-13.231-43.254-30.04-60.569-50.039zM103.015 375.508c24.937 14.4 53.928 24.056 84.837 26.854-53.409-29.561-82.274-70.602-95.861-94.135-14.942-25.878-25.041-53.917-30.063-83.421-14.921.64-29.775 2.868-44.227 6.709-6.6 1.576-11.507 7.517-11.507 14.599 0 1.312.172 2.618.512 3.885 15.32 57.142 52.726 100.35 96.309 125.509zM324.148 402.362c30.908-2.799 59.9-12.454 84.837-26.854 43.583-25.159 80.989-68.367 96.31-125.508.34-1.267.512-2.573.512-3.885 0-7.082-4.907-13.023-11.507-14.599-14.452-3.841-29.306-6.07-44.227-6.709-5.022 29.504-15.121 57.543-30.063 83.421-13.588 23.533-42.419 64.554-95.862 94.134zM187.301 366.948c-15.157-24.483-38.696-71.48-38.696-135.903 0-32.646 6.043-64.401 17.945-94.529-16.394-9.351-33.972-16.623-52.273-21.525-8.004-2.142-16.225 2.604-18.37 10.605-16.372 61.078-4.825 121.063 22.064 167.631 16.325 28.275 39.769 54.111 69.33 73.721zM324.684 366.957c29.568-19.611 53.017-45.451 69.344-73.73 26.889-46.569 38.436-106.553 22.064-167.631-2.145-8.001-10.366-12.748-18.37-10.605-18.304 4.902-35.883 12.176-52.279 21.529 11.9 30.126 17.943 61.88 17.943 94.525.001 64.478-23.58 111.488-38.702 135.912zM266.606 69.813c-2.813-2.813-6.637-4.394-10.615-4.394a15 15 0 00-10.606 4.394c-39.289 39.289-66.78 96.005-66.78 161.231 0 65.256 27.522 121.974 66.78 161.231 2.813 2.813 6.637 4.394 10.615 4.394s7.793-1.581 10.606-4.394c39.248-39.247 66.78-95.96 66.78-161.231.001-65.256-27.511-121.964-66.78-161.231z"
                />
              </svg>
            </div>
          </div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Accueil</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6" />
                  <path d="M4 6l8 4 8-4" />
                </svg>

                <span>Cours</span>
              </a>
            </li>
            <li className="sidebar-list-item active">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 3H3v18h18V3zM10 17h4m-2-4h4M6 9h12M6 12h6" />
                </svg>

                <span>Examens</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="8" y1="12" x2="12" y2="16" />
                  <line x1="12" y1="16" x2="16" y2="8" />
                </svg>

                <span>notes</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bell"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span>Notifications</span>
              </a>
            </li>
          </ul>
          <div className="account-info">
            <div className="account-info-picture">
              <img
                src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHx3b21hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="Account"
              />
            </div>
            <div className="account-info-name">Monica G.</div>
            <button className="account-info-more">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-horizontal"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </div>

        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Cours</h1>
            <button
              className={`mode-switch ${isLightMode ? 'active' : ''}`}
              title="Switch Theme"
              onClick={handleModeSwitch}
            >
              <svg
                className="moon"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            <button className="app-content-headerButton" onClick={openModal}>
              Ajouter Examens
            </button>
          </div>
          <div className="app-content-actions">
            <input className="search-bar" placeholder="Search..." type="text" />
            <div className="app-content-actions-wrapper">
              <div className="filter-button-wrapper">
                <button className="action-button filter jsFilter">
                  <span>Filter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-filter"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </button>
                <div className="filter-menu">
                  <label>Category</label>
                  <select>
                    <option>All Categories</option>
                    <option>Furniture</option> <option>Decoration</option>
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                  </select>
                  <label>Status</label>
                  <select>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                  <div className="filter-menu-buttons">
                    <button className="filter-button reset">Reset</button>
                    <button className="filter-button apply">Apply</button>
                  </div>
                </div>
              </div>
              <button className="action-button list active" title="List View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-list"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
              <button className="action-button grid" title="Grid View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-grid"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
            </div>
          </div>
          <Calendar
            localizer={localizer}
            startAccessor={'start'}
            events={events}
            endAccessor={'end'}
            style={{
              height: '1000px',
            }}
            eventPropGetter={(event) => {
              return {
                style: {
                  backgroundColor: event.color,
                },
              };
            }}
            onSelectEvent={(event) => alert(event.title)}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            {/* Contenu de votre modale (formulaire, etc.) */}
            <div className="modal-content">
              <h2 className="titre">Ajouter un nouveau Examen</h2>
              <form className="form" onSubmit={handleSubmit}>
                <br></br>
                <label className="titre">Titre:</label>
                <input
                  type="text"
                  placeholder="saisir titre"
                  onChange={(e) => setTitre(e.target.value)}
                />
                <br></br>
                <label className="titre">Description:</label>
                <textarea
                  type="text"
                  placeholder="saisir description"
                  onChange={(e) => setDescription(e.target.value)}
                />

                <br></br>
                <br></br>
                <button type="submit">Enregistrer</button>
              </form>
            </div>
            {/* Bouton pour fermer la modal */}
            <button className="modal-close" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Examen;
