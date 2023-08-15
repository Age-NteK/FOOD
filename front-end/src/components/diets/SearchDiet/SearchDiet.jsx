import { useDispatch } from "react-redux";
import { useState } from "react";
import { getDietByName, reset } from "../../../redux/actions";
import styles from "./searchdiet.module.css";

const SearchDiet = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
   (e.target.value)
    ? dispatch(getDietByName(e.target.value))
    : dispatch(reset());
  };

  return (
    <div>
      <input
        className={styles.searchdiet}
        type="name"
        placeholder="Search Diet"
        name="name"
        value={name}
        onChange={handleChange}
      />
   
    </div>
  );
};

export default SearchDiet;
