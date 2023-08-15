/*
! ARCHIVO DE CONFIGURACIÓN DEL PUNTO DE ENTRADA DE LA APLICACIÓN

* Importaciones
? Importa la biblioteca ReactDOM para renderizar la aplicación en el DOM
? Importa el componente principal App
? Importa el componente BrowserRouter de react-router-dom para manejar el enrutamiento
? Importa el componente Provider de react-redux para proporcionar el almacenamiento global a la aplicación
? Importa el almacén (store) de Redux
*/

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

/*
? Se crea un nodo razí en el DOM para renderizar la aplicación
? Utiliza el Provider de react-redux para conectar la aplicación con el almacén global
? Y también con BrowserRouter de react-router-dom para habilitar el enrutamiento en la aplicación.
*/

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);
