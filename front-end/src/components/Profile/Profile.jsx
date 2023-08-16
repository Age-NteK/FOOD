/*
! COMPONENTE DISEÑADO PARA MOSTRAR Y PERMITIR EDICIÓN DEL PERFIL DEL USER
*/

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  updateUser,
  clean,
  deleteUser,
} from "../../redux/actions";
import styles from "./profile.module.css";

/*
* Definición del componente Profile
? Se declara el estado local formData utilizando el hook useState. Este estado almacena los datos del formulario de perfil. 
? Se utiliza el hook useEffect para cargar el perfil del usuario y restablecer el estado del formulario cuando se monta el componente.
? HandleChange actualiza el estado formData en función de los cambios en los campos del formulario.
? HndleSubmit que se activa cuando se envía el formulario. Construye un objeto updatedData con los valores del formulario actualizados y luego llama a la acción updateUser para actualizar el perfil del usuario en el servidor.
? Renderiza el formulario de perfil dentro de un elemento form. 
? Los campos del formulario (User Name, Email, Password, First Name, Last Name y Phone Number) están representados como etiquetas <label> con campos de entrada (<input>) correspondientes.
? Renderiza un botón "Update Profile" que permite al usuario enviar los cambios en el formulario.
? Renderización Condicional del Formulario: Utiliza una verificación condicional para asegurarse de que se muestre el formulario solo si userProfile tiene propiedades (es decir, si el perfil del usuario está cargado). */

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.userProfile);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
      dispatch(clean());
    }
  }, []);

  const [formData, setFormData] = useState({
    username: userProfile.username,
    email: userProfile.email,
    password: userProfile.password,
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    phoneNumber: userProfile.phoneNumber,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Construir el objeto updatedData con los valores del formulario actualizados
    const updatedData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
    };

    console.log(updatedData);

    try {
      // Llamar a la acción updateUser con el ID y los datos actualizados
      await dispatch(updateUser(userId, updatedData));

      console.log(`User ${formData.username} updated successfully`);
    } catch (error) {
      console.log("Error al actualizar el usuario:", error.message);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    const confirmation = window.prompt(
      "Are you sure you want to delete your account? This action is irreversible. Type 'yes' to confirm."
    );

    if (confirmation === "yes") {
      try {
        // Success
        await dispatch(deleteUser(userId));
        navigate("/");
      } catch (error) {
        // Error
        console.error("Error deleting user:", error);
      }
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className={styles.profile_img}>
      <div className={styles.profile_container}>
        <div className={styles.profile_center}>
          {Object.keys(userProfile).length > 0 && (
            <form
              className={styles.profile_description}
              onSubmit={handleSubmit}
            >
              <h2 className={styles.profile_title}>My Profile</h2>
              <label className={styles.profile_label}>
                User Name
                <input
                  className={styles.profile_input}
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={userProfile?.username}
                />
              </label>
              <label className={styles.profile_label}>
                Email
                <input
                  className={styles.profile_input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={`${userProfile?.email}`}
                />
              </label>
              <label className={styles.profile_label}>
                Password
                <input
                  className={styles.profile_input}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={`${userProfile?.password}`}
                />
              </label>
              <label className={styles.profile_label}>
                First Name
                <input
                  className={styles.profile_input}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={`${userProfile?.firstName}`}
                />
              </label>
              <label className={styles.profile_label}>
                Last Name
                <input
                  className={styles.profile_input}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={`${userProfile?.lastName}`}
                />
              </label>
              <label className={styles.profile_label}>
                Phone Number
                <input
                  className={styles.profile_input}
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder={`${userProfile?.phoneNumber}`}
                />
              </label>

              <div>
                <button className={styles.profile_btn} type="submit">
                  Update Profile
                </button>
                <button
                  className={styles.profile_btn}
                  type="submit"
                  onClick={handleDeleteUser}
                >
                  Delete my account
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
