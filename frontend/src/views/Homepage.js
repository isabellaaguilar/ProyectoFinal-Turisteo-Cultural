import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import pais from '../views/imagenes/costaricamorado.png';
import './home.css'; // Importa tus estilos CSS aquí

const Activity = ({ activity, onClick }) => (
  <div className="activity">
    <h2>{activity.nombre}</h2>
    <p>{activity.descripcion}</p>
    <button className="btn btn-secondary" onClick={onClick}>
      View details »
    </button>
  </div>
);

const ActivityModal = ({ activity, onClose }) => (
  <Modal
    isOpen={activity !== null}
    onRequestClose={onClose}
    overlayClassName="modal-overlay"
  >
    {activity && (
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="modal-title">{activity.nombre}</h2>
        <p className="modal-description">{activity.descripcion}</p>
        <div className="modal-details">
          <p><strong>Fecha:</strong> {activity.fecha}</p>
          <p><strong>Latitud:</strong> {activity.latitud}</p>
          <p><strong>Longitud:</strong> {activity.longitud}</p>
          <p><strong>Tipo de evento:</strong> {activity.tipo_evento}</p>
        </div>
      </div>
    )}
  </Modal>
);

const Homepage = () => {
  const [actividades, setActividades] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        const response = await fetch("http://127.0.0.1:8000/api/actividades/");
        const actividadesData = await response.json();
        setActividades(actividadesData);
      } catch (error)
      {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleModalOpen = (activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
  };

  return (
    <div>
      <main role="madin" style={{ marginTop: 0 }}>
        <div className="jumbotron" style={{ height: 500 }}>
          <div className="container">
            <h1 className="display-3">Turisteo Cultural</h1>
            <p>
              Pase por las diferentes actividades culturales planeadas por este mes
            </p>
            <img style={{ height: "150px", padding: "1px", width: "200px" }} src={pais} alt="" />
            <p>
              <a className="btn btn-primary btn-lg" href="#" role="button">
                Learn more »
              </a>
            </p>
          </div>
          {/* Resto de tu contenido */}
        </div>
        <div className="container">
          <div className="row">
            {actividades.map((activity, index) => (
              <div className="col-md-4" key={index}>
                <Activity activity={activity} onClick={() => handleModalOpen(activity)} />
              </div>
            ))}
          </div>
          <hr />
        </div>
      </main>
      <footer className="container">
        <p>© Company 2017-2018</p>
      </footer>
      <ActivityModal activity={selectedActivity} onClose={handleCloseModal} />
    </div>
  )
}

export default Homepage;
