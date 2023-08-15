import { useDispatch } from "react-redux";
import { filterByVegan, reset } from "../../../../redux/actions";

const FilterByVegan = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    const select = e.target.value;
    if (select === "isVegan" || select === "notVegan") {
      dispatch(filterByVegan(select));
    } else if (select === "Reset") {
      dispatch(reset());
    }
  };

  return (
    <div>
      <select name="vegan" id="vegan" onChange={handleSelect}>
        <option value="Reset">Filter By Vegan</option>
        <option value="isVegan">Vegan</option>
        <option value="notVegan">Non-Vegan</option>
      </select>
    </div>
  );
};

export default FilterByVegan;
