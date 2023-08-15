import { useState, useEffect } from 'react';
import styles from "./health.module.css"

const HealthScoreSelect = ({ onChange }) => {
  const [healthScore, setHealthScore] = useState(1);

  useEffect(() => {
    const rangeInput = document.getElementById('healthScoreRange');
    const valueDisplay = document.getElementById('healthScoreValue');
    const position =
      (rangeInput.clientWidth * healthScore) / 100 -
      valueDisplay.clientWidth / 2;
    valueDisplay.style.left = `${position}px`;
    // Capture the health score selection and add it to the form data
    onChange({
      target: {
        name: 'healthScore',
        value: parseInt(healthScore, 10),
      },
    });
  }, [healthScore]);

  return (
    <div className={styles.health}>
      <label className={styles.health_label}>Health</label>
      <input
        type="range"
        id="healthScoreRange"
        min="1"
        max="100"
        value={healthScore}
        className={styles.health_range}
        onChange={(event) => setHealthScore(event.target.value)}
      />
      <span id="healthScoreValue" className={styles.health_number}>
        {healthScore}
      </span>
    </div>
  );
};

export default HealthScoreSelect;
