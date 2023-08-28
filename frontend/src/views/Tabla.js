import React, { useEffect, useState } from 'react';

import "./tabla.css"

function Tabla({ actividades }) {
  return (<div>
    <table className="tabla-estilizada">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Longitud</th>
          <th>Latitud</th>
          <th>Fecha</th>
          <th>Descripción</th>
          <th>Tipo de eventos</th>
        </tr>
      </thead>
      <tbody>
        {actividades.map((actividad, index) => (
          <tr key={index}>
            <td>{actividad.nombre}</td>
            <td>{actividad.longitud}</td>
            <td>{actividad.latitud}</td>
            <td>{actividad.fecha}</td>
            <td>{actividad.descripcion}</td>
            <td>{actividad.tipo_evento}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>)

}


const TablaWrapper = () => {

  const [actividades, setActividades] = useState([]);

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
  }, []); // Sin dependencias aquí

  return <Tabla actividades={actividades} />;
}

export default TablaWrapper;
