import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import vasija from '../views/imagenes/vasijas.jpg'
import Select from 'react-select';


function Registerpage() {

  const [nombre, setNombre] = useState("")
  const [longitud, setLongitud] = useState("")
  const [latitud, setLatitud] = useState("")
  const [fecha, setFecha] = useState("")
  const [descripcion, setDescripcion] = useState("")

  const [img1, setImg1] = useState("")
  const [img2, setImg2] = useState("")

  const [tipoEventosARegistrar, setTipoEventosARegistrar] = useState("")


  const [eveneto, setEvento] = useState({})


  const { registerAct } = useContext(AuthContext)

  console.log(nombre);
  console.log(longitud);
  console.log(latitud);
  console.log(fecha);
  console.log(descripcion);

  console.log(img1);
  console.log(img2)


  const handleSubmit = async e => {
    console.log("llego aqui")
    registerAct(nombre, longitud, latitud, fecha, descripcion, img1, img2, tipoEventosARegistrar)
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await fetch("http://127.0.0.1:8000/api/tipoEvento/");  // Asegúrate de usar la URL correcta
    const tipoEventoData = await response.json();
    setEvento(tipoEventoData)
    console.log(tipoEventoData);
  }, [])


  const agregarMulti = (e) => {
    let tipoDeEventos = [];
    console.log("llego nuevo elemento")
    e.map(element => {
      tipoDeEventos.push(element.value)
    })

    setTipoEventosARegistrar(tipoDeEventos.toString())
  }

  return (
    <div>
      <>
        <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                        src={vasija}
                        alt="login form"
                        className="img-fluid"
                        style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }}
                      />
                    </div>
                    <div className="col-md- col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form onSubmit={handleSubmit}>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            />
                            <span className="h2 fw-bold mb-0">
                              Bienvenido de nuevo turisteo cultural!!!

                            </span>
                          </div>
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: 1 }}
                          >
                            Sign Up
                          </h5>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              placeholder="nombre"
                              onChange={e => setNombre(e.target.value)}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              placeholder="longitud"
                              onChange={e => setLongitud(e.target.value)}

                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              placeholder="latitud"
                              onChange={e => setLatitud(e.target.value)}

                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="date"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              placeholder="Fecha"
                              onChange={e => setFecha(e.target.value)}

                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              placeholder="Descripción"
                              onChange={e => setDescripcion(e.target.value)}

                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="file"

                              id="form2Example27"
                              className="form-control form-control-lg"
                              placeholder="Imagen1"
                              onChange={e => setImg1(e.target.value)}

                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="file"
                              id="form2Example27"
                              className="form-control form-control-lg"
                              placeholder="Imagen2"
                              onChange={e => setImg2(e.target.value)}

                            />
                          </div>

                          <div className="form-outline mb-4">
                            <Select
                              onChange={agregarMulti}
                              isMulti
                              name="colors"
                              options={eveneto}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                          </div>

                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block"
                              type="submit"
                            >
                              Register
                            </button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
        <footer className="bg-light text-center text-lg-start">
          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2023 - Isabella Aguilar Calvo Copyright

          </div>
          {/* Copyright */}
        </footer>
      </>

    </div>
  )
}

export default Registerpage