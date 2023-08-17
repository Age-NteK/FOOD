import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addFavorite,
  deleteRecipe,
  getAllFavorites,
  deleteFavorite,
} from "../../../redux/actions";
import styles from "./Card.module.css";

/*
! ¡UN COMPONENTE DE CLASE ES UNA FORMA DE DEFINIR COMPONENTES EN REACT Y UTILIZA MÉTODOS DE CICLO DE VIDA PARA GESTIONAR EL COMPORTAMIENTO DEL COMPONENTE

? mapStateToProps es una función que se utiliza para mapear el estado de la tienda a las propiedades del componente. Toma el estado de Redux como argumento y devuelve un objeto que representa las propiedades que deseas pasar al componente.
? mapDispatchToProps es una función que se utiliza para mapear las acciones de Redux a las propiedades del componente. Toma la función dispatch como argumento y devuelve un objeto que contiene las acciones que deseas disponer como propiedades.
? Se utiliza el constructor para inicializar el estado y definir props. 
? La llamada super(props) se utiliza para llamar al constructor de la clase padre (es decir, Component) y pasar las props al constructor. */

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
      isDeleted: false,
    };
  }

  handleDeleteRecipe = () => {
    const { id, deleteRecipe, getAllFavorites } = this.props;
    deleteRecipe(id);
    this.setState({ isDeleted: true });
  };

  componentDidUpdate(prevProps, prevState) {
    const { isDeleted } = this.state;
    const { dispatch, getAllFavorites } = this.props;

    if (isDeleted && prevState.isDeleted !== isDeleted) {
      dispatch(getAllFavorites());
      console.log(`Esta eliminada ${isDeleted}`);
    }
  }

  handleAddFavorite = async () => {
    const { isFavorite } = this.state;
    const { id, userId, deleteFavorite, addFavorite } = this.props;

    if (isFavorite) {
      await deleteFavorite(id, userId);
      this.setState({ isFavorite: false });
    } else {
      await addFavorite(id, userId);
      this.setState({ isFavorite: true });
    }
  }

  componentDidMount() {
    const { id, allFavorites } = this.props;
    const isFavorite = allFavorites.some((favorite) => favorite.RecipeId === id);
    this.setState({ isFavorite });
  }

  render() {
    const { id, title, image, pricePerServing } = this.props;
    const { isFavorite } = this.state;

    return (
      <div key={id} className={styles.card_container}>
        <img src={image} alt={title} className={styles.card_img} />

        <div className={styles.text_container}>
          <button className={styles.btn_fav} onClick={this.handleAddFavorite}>
            {isFavorite ? "❤️" : "🤍"}
          </button>
          <button className={styles.btn_del} onClick={this.handleDeleteRecipe}>
            X
          </button>
          <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
            <h2 className={styles.card_title}>{title}</h2>
            <h2 className={styles.text_price}>$ {pricePerServing}</h2>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.userId,
  allFavorites: state.allFavorites,
});

const mapDispatchToProps = {
  addFavorite,
  deleteRecipe,
  getAllFavorites,
  deleteFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);