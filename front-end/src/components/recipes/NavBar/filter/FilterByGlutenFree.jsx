import { useDispatch } from "react-redux";
import { filterByGlutenFree, reset } from "../../../../redux/actions";

const FilterByGlutenFree = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    const select = e.target.value;
    if (select === "isGlutenFree" || select === "nonGlutenFree") {
    dispatch(filterByGlutenFree(select));
  } else if (select === "Reset") {
    dispatch(reset());
  }
  };

  return (
    <div>
      <select name="glutenFree" id="glutenFree" onChange={handleSelect}>
        <option value="Reset">Filter By GlutenFree</option>
        <option value="isGlutenFree">Glutten Free</option>
        <option value="nonGlutenFree">Non-Gluten Free</option>
      </select>
    </div>
  );
};

export default FilterByGlutenFree;