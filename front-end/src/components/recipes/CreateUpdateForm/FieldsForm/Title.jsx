import styles from "./title.module.css";

const Title = ({ name, value, onChange }) => {
  return (
    <div className={styles.create_title}>
      <input
        type="text"
        name={name}
        onChange={onChange}
        placeholder="New Title"
        // value={value}
      />
    </div>
  );
};

export default Title;
