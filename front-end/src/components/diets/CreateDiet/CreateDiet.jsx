import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDiet } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import styles from "./creatediet.module.css";

const CreateDiet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  const userId = useSelector((state) => state.userId);
  const userIdAsNumber = Number(userId);

  const [formData, setFormData] = useState({
    name: "",
    userId: userIdAsNumber,
  });
  console.log(`ID de User: ${userId}`);



  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createDiet(formData));
    navigate("/mydiets");
  };

  return (
    <div className={styles.creatediet_container}>
      <input
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Create Your Own Diet"
      />
      <button onClick={handleSubmit} className={styles.button_container}>
        Create
      </button>
    </div>
  );
};

export default CreateDiet;
