import styles from "./popular.module.css"


const Popular = ({ onChange, value, name, chacked }) => {
  return (
    <div className={styles.popular}>
      <label>Popular</label>
      <input
        type="checkbox"
        name={name}
        checked={value} 
        onChange={onChange}
      />
    </div>
  );
};

export default Popular;