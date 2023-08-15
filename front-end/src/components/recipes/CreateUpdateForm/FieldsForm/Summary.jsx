import styles from "./summary.module.css";

const Summary = ({ name, value, onChange }) => {
  return (
    <div className={styles.summary}>
      <textarea 
      name={name} 
      // value={value} 
      placeholder="New Summary"
      onChange={onChange}
      />
    </div>
  );
};

export default Summary;
