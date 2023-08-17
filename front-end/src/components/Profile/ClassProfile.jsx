import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUserProfile,
  updateUser,
  clean,
  deleteUser,
} from "../../redux/actions";
import styles from "./profile.module.css";


/*
! ¡UN COMPONENTE DE CLASE ES UNA FORMA DE DEFINIR COMPONENTES EN REACT Y UTILIZA MÉTODOS DE CICLO DE VIDA PARA GESTIONAR EL COMPORTAMIENTO DEL COMPONENTE

? mapStateToProps es una función que se utiliza para mapear el estado de la tienda a las propiedades del componente. Toma el estado de Redux como argumento y devuelve un objeto que representa las propiedades que deseas pasar al componente.
? mapDispatchToProps es una función que se utiliza para mapear las acciones de Redux a las propiedades del componente. Toma la función dispatch como argumento y devuelve un objeto que contiene las acciones que deseas disponer como propiedades.
? Se utiliza el constructor para inicializar el estado y definir props. 
? La llamada super(props) se utiliza para llamar al constructor de la clase padre (es decir, Component) y pasar las props al constructor. */

class Profile extends Component {
  constructor(props) {
    super(props);

    const { userProfile } = this.props;

    this.state = {
      formData: {
        username: userProfile.username,
        email: userProfile.email,
        password: userProfile.password,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        phoneNumber: userProfile.phoneNumber,
      },
    };
  }

  componentDidMount() {
    const { userId, getUserProfile, clean } = this.props;

    if (userId) {
      getUserProfile(userId);
      clean();
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { formData } = this.state;
    const { userId, updateUser } = this.props;

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
      await updateUser(userId, updatedData);
      console.log(`User ${formData.username} updated successfully`);
    } catch (error) {
      console.log("Error updating user:", error.message);
    }
  };

  handleDeleteUser = async (e) => {
    e.preventDefault();

    const { userId, deleteUser, navigate } = this.props;

    const confirmation = window.prompt(
      "Are you sure you want to delete your account? This action is irreversible. Type 'yes' to confirm."
    );

    if (confirmation === "yes") {
      try {
        await deleteUser(userId);
        navigate("/");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      navigate("/profile");
    }
  };

  render() {
    const { userProfile } = this.props;
    const { formData } = this.state;

    return (
      <div className={styles.profile_img}>
        <div className={styles.profile_container}>
          <div className={styles.profile_center}>
            {Object.keys(userProfile).length > 0 && (
              <form
                className={styles.profile_description}
                onSubmit={this.handleSubmit}
              >
                <h2 className={styles.profile_title}>My Profile</h2>
                <label className={styles.profile_label}>
                  User Name
                  <input
                    className={styles.profile_input}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={this.handleChange}
                    placeholder={userProfile.username}
                  />
                </label>
                <label className={styles.profile_label}>
                Email
                <input
                  className={styles.profile_input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                    onClick={this.handleDeleteUser}
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
  }
}

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
  userId: state.userId,
});

const mapDispatchToProps = {
  getUserProfile,
  updateUser,
  clean,
  deleteUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);