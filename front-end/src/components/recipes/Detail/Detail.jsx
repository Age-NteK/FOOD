/*
! COMPONENTE DE DETALLE DE RECETA

* Importaciones
? Se importa el hook useDetail, que fue definido previamente, para manejar los detalles de la receta.
? Se importan estilos de módulo CSS locales.
*/

import useDetail from "../../../hooks/useDetail";
import styles from "./detail.module.css";

/*
! Definición del componente de detalle de receta 
? Obtener detalles de la receta utilizando el hook personalizado useDetail
? Si no hay detalles de receta disponibles, muestra un mensaje de carga
? cleanSummary Función para limpiar el resumen de la receta de etiquetas HTML */

const Detail = () => {
  const recipeDetail = useDetail();
  console.log(recipeDetail);

  if (!recipeDetail) {
    return <div>Loading...</div>;
  }

  const cleanSummary = (summary) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = summary;
    return tempDiv.innerText;
  };

  /*
  * Renderización del componente de detalle de receta
  ? Crea la interfaz de usuario para mostrar los detalles de la receta.
  ? Muestra el título, imagen, puntuación de salud, descripción y pasos de la receta.
  */

  return (
    <div className={styles.detail_container}>
      <div className={styles.detail_description}>
        <h2 className={styles.detail_title}>{recipeDetail.title}</h2>
        <div className={styles.detail_img}>
          <h3 className={styles.detail_descr_title}>
            HealthScore {recipeDetail.healthScore}
          </h3>
          <img src={recipeDetail.image} alt={recipeDetail.title} />
        </div>
        <div className={styles.detail_text}>
          <h3 className={styles.detail_descr_title}>Description</h3>
          <p className={styles.detail_summary}>
            {cleanSummary(recipeDetail.summary)}
          </p>
          <h3 className={styles.detail_descr_title}>Steps</h3>
          {recipeDetail.steps && recipeDetail.steps.length > 0 ? (
            <ul>
              {recipeDetail.steps.map((step, index) => (
                <li key={index} className={styles.detail_step}>
                  {index + 1} {step.step}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.detail_step}>
              There are no steps available for this recipe at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/*
! Exporto componente Detail */
export default Detail;



/*
const renderVeganValue = (value) => {
  return value ? "Vegan" : "Non Vegan";
};

const renderVegetarianValue = (value) => {
  return value ? "Vegetarian" : "Non Vegetarian";
};

const renderGlutenFreeValue = (value) => {
  return value ? "Gluten Free" : "Non Gluten Free";
};

const renderVeryPopularValue = (value) => {
  return value ? "Very Popular" : "Not Very Popular";
};

const renderDairyFreeValue = (value) => {
  return value ? "Dairy Free" : "Non Dairy Free";
};


<div className={styles.detail_diets}>
  <h4>Diets</h4>
  <p>Vegan: {renderVeganValue(recipeDetail?.vegan)}</p>
  <p>Vegetarian: {renderVegetarianValue(recipeDetail?.vegetarian)}</p>
  <p>Gluten Free: {renderGlutenFreeValue(recipeDetail?.glutenFree)}</p>
  <p>Very Popular: {renderVeryPopularValue(recipeDetail?.veryPopular)}</p>
  <p>Dairy Free: {renderDairyFreeValue(recipeDetail?.dairyFree)}</p>
</div> 

*/
