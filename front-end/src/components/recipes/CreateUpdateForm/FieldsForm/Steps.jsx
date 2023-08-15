import styles from "./steps.module.css";

const Steps = ({ value, handleStepChange, addStep, removeStep }) => {
  return (
    <div className={styles.steps}>
      <div>
        { value?.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              value={step.step}
              placeholder={`Step ${index + 1}`}
              onChange={(e) => handleStepChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div>
        <button type="button" onClick={addStep}>
          Add Step
        </button>
        <button type="button" onClick={removeStep}>
          Delete Step
        </button>
      </div>
    </div>
  );
};

export default Steps;
