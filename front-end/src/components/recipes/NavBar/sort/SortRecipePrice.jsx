import { useDispatch } from "react-redux";
import { sortRecipeByPrice, reset } from "../../../../redux/actions";

const SortRecipePrice = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    const select = e.target.value;
    if (select === "Asc") {
      dispatch(sortRecipeByPrice("Asc"));
    } else if (select === "Desc") {
      dispatch(sortRecipeByPrice("Desc"));
    } else if (select === "Reset") {
      dispatch(reset());
    }
  };

  return (
    <div>
      <select name="price" id="price" onChange={handleSelect}>
        <option value="Reset">Sort By Price</option>
        <option value="Asc">Minor To Major</option>
        <option value="Desc">Major To Minor</option>
      </select>
    </div>
  );
};

export default SortRecipePrice;
