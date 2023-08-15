import { useDispatch } from "react-redux";
import { filterByPopular, reset } from "../../../../redux/actions";

const FilterByPopular = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    const select = e.target.value;
    if (select === "isPopular" || select === "nonPopular") {
      dispatch(filterByPopular(select));
    } else if (select === "Reset") {
      dispatch(reset());
    }
  };

  return (
    <div>
      <select name="popular" id="popular" onChange={handleSelect}>
        <option value="Reset">Filter By Popular</option>
        <option value="isPopular">Popular</option>
        <option value="nonPopular">Exotic</option>
      </select>
    </div>
  );
};

export default FilterByPopular;
