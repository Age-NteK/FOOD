/*
! APP CONFIGURA LA ESTRUCTURA DE ENRUTAMIENTO Y NAVEGACIÓN DE LA APLICACIÓN UTILIZANDO REACT ROUTER
! Y TAMBIÉN MANEJA EL ACCESO UTILIZANDO REDUX

* Importaciones
? Se importa diferentes módulos y componentes necesarios para la aplicación
? Se importa Routes: Se utiliza para definir las rutas y sus correspondientes componentes en tu aplicación. Agrupa múltiples rutas dentro de sí mismo.
? Se importa Route: Ruta específica dentro de Routes. Se utiliza para definir una correspondencia entre una URL y el componente que debe renderizarse cuando la URL coincide con el path especificado.
? Se importa useLocation: Hook que devuelve el objeto de ubicación actual. Contiene información sobre la URL actual.
? Se importa useNavigate: Hook que permite navegar de manera programática a diferentes rutas en la aplicación. Es especialmente útil para activar la navegación desde funciones y eventos.
? Se importa useSelector: Hook que permite acceder al estado global almacenado en tu store de Redux. Puedes usarlo para seleccionar datos específicos del estado y suscribirte a los cambios en esos datos. Ayuda a que los componentes se vuelvan "conscientes del estado" y se actualicen automáticamente cuando el estado cambie.
? Se importa useEffect: Hook se utiliza para realizar efectos secundarios en tus componentes.Se ejecuta después de que el componente se haya renderizado y siempre que alguna de sus dependencias (pasadas como segundo argumento) cambie. */

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/recipes/Home/Home";
import Detail from "./components/recipes/Detail/Detail";
import HomeDiets from "./components/diets/HomeDiets/HomeDiets";
import DetailDiet from "./components/diets/DetailDiet/DetailDiet";
import TopSearchBar from "./components/TopSearchBar/TopSearchBar";
import Profile from "./components/Profile/Profile";
import MyRecipes from "./components/recipes/MyRecipes/MyRecipes";
import MyFavorites from "./components/recipes/MyFavorites/MyFavorites";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";
import MyDiets from "./components/diets/MyDiets/MyDiets";
import CreateRecipe from "./components/recipes/CreateUpdateForm/CreateRecipe";
import UpdateRecipe from "./components/recipes/UpdateRecipe/UpdateRecipe";

/*
! Definición del componente de App
*/

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const access = useSelector((state) => state.access);

  /*
  * Se está utilizando el hook useEffect para ejecutar código cuando cambia el valor de access
  ?  Si access es false, significa que el usuario no tiene acceso, por lo que la aplicación navegará a la página de inicio de sesión ("/")
  ?  Si access es true, la aplicación navegará a la página de inicio ("/home")
*/

  useEffect(() => {
    if (!access) {
      navigate("/");
    }
    if (access) {
      navigate("/home");
    }
  }, [access]);

  /*
  * Aquí se está construyendo la estructura de la aplicación
  ? Se verifica la ubicación actual (location.pathname) y si no es la página de inicio ("/") ni la página de registro ("/register"), se renderiza el componente TopSearchBar
  ? Luego, se define la estructura de enrutamiento utilizando el componente Routes
  ? Y se definen varias rutas utilizando el componente Route
  ? Cada ruta tiene un path que corresponde a una URL y un element que corresponde al componente que se renderizará cuando la ruta coincida
  */

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/register" && (
        <TopSearchBar />
      )}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create/:id" element={<CreateRecipe />} />
        <Route path="/update/:id" element={<UpdateRecipe />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
        <Route path="/homediets" element={<HomeDiets />} />
        <Route path="/detaildiet/:id" element={<DetailDiet />} />
        <Route path="/mydiets" element={<MyDiets />} />
        <Route path="/favorites" element={<MyFavorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </>
  );
}

/*
! Exporto componente App */

export default App;
