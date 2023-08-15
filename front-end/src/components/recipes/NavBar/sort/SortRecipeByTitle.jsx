import { useDispatch } from "react-redux";
import { sortRecipesTitle, reset } from "../../../../redux/actions";

const SortRecipeByTittle = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    const select = e.target.value;
    if (select === "Asc") {
      dispatch(sortRecipesTitle("Asc"));
    } else if (select === "Desc") {
      dispatch(sortRecipesTitle("Desc"));
    } else if (select === "Reset") {
      dispatch(reset());
    }
  };

  return (
    <div>
      <select name="title" id="title" onChange={handleSelect}>
        <option value="Reset">Sort By Title</option>
        <option value="Asc">Sort A-Z</option>
        <option value="Desc">Sort Z-A</option>
      </select>
    </div>
  );
};

export default SortRecipeByTittle;
