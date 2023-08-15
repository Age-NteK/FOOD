import { useDispatch } from "react-redux";
import { sortRecipeByHealthScore, reset } from "../../../../redux/actions";

const SortRecipeHealth = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    const select = e.target.value;
    if (select === "Asc") {
      dispatch(sortRecipeByHealthScore("Asc"));
    } else if (select === "Desc") {
      dispatch(sortRecipeByHealthScore("Desc"));
    } else if (select === "Reset") {
      dispatch(reset());
    }
  };

  return (
    <div>
      <select name="score" id="score" onChange={handleSelect}>
        <option value="Reset">Sort By Health Score</option>
        <option value="Asc">Minor To Major</option>
        <option value="Desc">Major To Minor</option>
      </select>
    </div>
  );
};

export default SortRecipeHealth;
