/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
import pais from '../views/imagenes/costaricamorado.png'
function Homepage() {
  return (
    <div>
      <>
        <main role="madin" style={{ marginTop: 105 }}>
          {/* Main jumbotron for a primary marketing message or call to action */}
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
            <div style={{ marginTop: -250 }} class="layout-4-item-left">

              <iframe class="mapita"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62879.69512815016!2d-84.15454496280182!3d9.935543132510816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e342c50d15c5%3A0xe6746a6a9f11b882!2zU2FuIEpvc8Op!5e0!3m2!1ses!2scr!4v1686417009495!5m2!1ses!2scr"
                style={{
                  width: 500, height: 450, border: 0, marginLeft: 850, Top: 0, marginTop: -120
                }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              >



              </iframe>
            </div>


          </div>
          <div className="container">
            {/* Example row of columns */}
            <div className="row">
              <div className="col-md-4">
                <h2>Festival de la comida

                </h2>
                <p>
                  "Este 20 de abril, el festival de la comida en San Jose centro".{" "}
                </p>
                <p>
                  <a className="btn btn-secondary" href="#" role="button">
                    View details »
                  </a>
                </p>
              </div>
              <div className="col-md-4">
                <h2>Taller de pintura

                </h2>
                <p>
                  Para toda la familia.{" "}
                </p>
                <p>
                  <a className="btn btn-secondary" href="#" role="button">
                    View details »
                  </a>
                </p>
              </div>
              <div className="col-md-4">
                <h2>Concierto benefico
                  "Chepe se baña Rock"

                </h2>
                <p>
                  Done y escuche a los principales artistas del Rock nacional.
                </p>
                <p>
                  <a className="btn btn-secondary" href="#" role="button">
                    View details »
                  </a>
                </p>
              </div>
            </div>
            <hr />
          </div>{" "}
          {/* /container */}
        </main>
        <footer className="container">
          <p>© Company 2017-2018</p>
        </footer>
      </>

    </div>
  )
}

export default Homepage