import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyDiets, updateDiet } from "../../../redux/actions";
import styles from "./mydiets.module.css";

const Mydiets = () => {
  const dispatch = useDispatch();

  const myDiets = useSelector((state) => state.myDiets);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    if (userId) {
      dispatch(getMyDiets(userId));
    }
  }, [dispatch, userId]);

  const [dietToEdit, setDietToEdit] = useState(null);
  const [name, setName] = useState("");

  const handleEditClick = (dietId, currentName) => {
    setDietToEdit(dietId);
    setName(currentName);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSaveClick = async (dietId) => {
    // Dispatch action to update diet name
    await dispatch(updateDiet(userId, dietId, name));

    // Clear editing state
    setDietToEdit(null);
    setName("");
  };

  return (
    <div className={styles.mydiets_img}>
      <div className={styles.mydiets}>
        <div className={styles.mydiets_center}>
          <h1 className={styles.mydiets_h2}>My diets</h1>
          {/* <p>User ID: {userId}</p> */}
          {myDiets &&
            myDiets.map((diet) => (
              <div key={diet.id} className={styles.mydiet_items}>
                {/* <p>ID: {diet.id}</p> */}
                {!(dietToEdit === diet.id) ? (
                  <div className={styles.mydiets_item}>
                    <p className={styles.mydiet_name}>Name: {diet.name}</p>
                    {/* <p>Created By: {diet.createdBy}</p> */}

                    <div className={styles.mydiets_btn}>
                      <button
                        onClick={() => handleEditClick(diet.id, diet.name)}
                        className={styles.mydiets_btn}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.mydiets_item}>
                      <input
                        type="text"
                        value={name}
                        placeholder={diet.name}
                        onChange={handleNameChange}
                        className={styles.mydiet_input}
                      />
                      <div className={styles.mydiets_btn}>
                        <button
                          onClick={() => handleSaveClick(diet.id)}
                          className={styles.mydiets_btn}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Mydiets;
