import React from 'react';
import styles from "./price.module.css";

const Price = ({ name, value, onChange }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(inputValue);
    onChange({ target: { name, value: parsedValue } });
  };

  return (
    <div className={styles.create_price}>
      <input
        type="number"
        id="pricePerServing"
        name={name}
         value={value}
        onChange={handleChange}
        placeholder="Price  (Example: 125.02)"
      />
    </div>
  );
};

export default Price;