import { useSelector } from "react-redux";
import styles from "./diets.module.css";
import { getAllDiets } from "../../../../redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//COPLETAR DIETS

const Diets = ({ onChange, value, name }) => {
  const dispatch = useDispatch();
  const dietsCopy = useSelector((state) => state.allDiets);

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  return (
    <div className={styles.diets}>
      <select multiple name={name} onChange={onChange} value={value}>
        {dietsCopy.map((diet) => (
          <option key={diet.id} value={diet.name}>
            {diet.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Diets;

//         <option value="glutenFree">Gluten free</option>
//         <option value="vegan">Vegan</option>
//         <option value="vegetarian">Vegetarian</option>
//         <option value="dairyFree">Dairy free</option>
//         <option value="whole">Whole 30</option>
//         <option value="paleolithic">Paleolithic</option>
//         <option value="pescatarian">Pescatarian</option>
//         <option value="lowFodmap">Low Fodmap</option>
//       </select>
//     </div>
//   );
// };
