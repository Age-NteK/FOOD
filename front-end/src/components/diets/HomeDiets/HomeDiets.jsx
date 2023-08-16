import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, deleteDiet } from "../../../redux/actions";
import SearchDiet from "../SearchDiet/SearchDiet";
import CreateDiet from "../CreateDiet/CreateDiet";

import styles from "./homediets.module.css";

const HomeDiets = () => {
  const dispatch = useDispatch();
  const dietsCopy = useSelector((state) => state.dietsCopy);
  const dietsName = useSelector((state) => state.dietsName);

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  console.log(dietsCopy);
  console.log(dietsName);

  let dietToShow;
  if (dietsName.length > 0) {
    dietToShow = dietsName;
  } else {
    dietToShow = dietsCopy;
  }

  return (
    <div className={styles.diets}>
      <div className={styles.diets_img}></div>
      <div className={styles.diets_center}>
        <h2>Welcome To Diets</h2>

        <SearchDiet />

        {dietToShow.length === 0 ? (
          <p>Loading...</p>
        ) : (
          dietToShow
            .filter((diet) => diet.id <= 10)
            .map((diet, index) => (
              <div key={diet.id} className={styles.diet_item}>
                <p className={styles.diet_name}>Name: {diet.name}</p>
                <div className={styles.buttons}>
                  <button onClick={() => dispatch(deleteDiet(diet.id))}>
                    X
                  </button>
                </div>
              </div>
            ))
        )}
        <CreateDiet />
      </div>
    </div>
  );
};
export default HomeDiets;
