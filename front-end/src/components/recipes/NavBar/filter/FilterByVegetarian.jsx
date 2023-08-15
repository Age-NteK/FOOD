import { useDispatch } from "react-redux";
import { filterByVegetarian, reset } from "../../../../redux/actions";

const FilterByVegetarian = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    const select = e.target.value;
    if (select === "isVegetarian" || select === "nonVegetarian") {
      dispatch(filterByVegetarian(select));
    } else if (select === "Reset") {
      dispatch(reset());
    }
  };

  return (
    <div>
      <select name="vegetarian" id="vegetarian" onChange={handleSelect}>
        <option value="Reset">Filter By Vegetarian</option>
        <option value="isVegetarian">Vegetarian</option>
        <option value="nonVegetarian">Non-Vegetarian</option>
      </select>
    </div>
  );
};

export default FilterByVegetarian;
