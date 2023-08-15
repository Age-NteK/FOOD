import styles from "./image.module.css";

const Image = ({onChange, value}) => {
  return (
    <div className={styles.create_img}>
        <input
          type="text"
          name="image"
          onChange={onChange}
          placeholder="New Image URL"
          // value={value}
        />
    </div>
  )
}
export default Image;
