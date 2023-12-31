import { useState } from 'react';
import styles from './InputForm.module.css';
import Result from './Result';

function InputForm() {
  const [data, setData] = useState([]);
  const userInput = {};

  const currentSavingHandler = (e) =>
    (userInput.currentSaving = e.target.value);
  const yearlySavingHandler = (e) => (userInput.yearlySaving = e.target.value);
  const expInterestHandler = (e) => (userInput.expInterest = e.target.value);
  const durationHandler = (e) => (userInput.duration = e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    const yearlyData = []; // per-year results

    let currentSavings = +userInput.currentSaving;
    const yearlyContribution = +userInput.yearlySaving;
    const expectedReturn = +userInput.expInterest / 100;
    const duration = +userInput.duration;

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      const totalInterest = yearlyData[yearlyData.length - 1]
        ? yearlyData[yearlyData.length - 1].totalInterest + yearlyInterest
        : yearlyInterest;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        totalSaving: +currentSavings.toFixed(2),
        yearlyInterest: +yearlyInterest.toFixed(2),
        totalInterest: +totalInterest.toFixed(2),
        investedCapital: +(currentSavings - totalInterest).toFixed(2),
      });
    }
    setData(yearlyData);
  };

  const onReset = () => {
    setData([]);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles['input-group']}>
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input
              type="number"
              id="current-savings"
              onChange={currentSavingHandler}
            />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input
              type="number"
              id="yearly-contribution"
              onChange={yearlySavingHandler}
            />
          </p>
        </div>
        <div className={styles['input-group']}>
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input
              type="number"
              id="expected-return"
              onChange={expInterestHandler}
            />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input type="number" id="duration" onChange={durationHandler} />
          </p>
        </div>
        <p className={styles.actions}>
          <button type="reset" className={styles.buttonAlt} onClick={onReset}>
            Reset
          </button>
          <button type="submit" className={styles.button}>
            Calculate
          </button>
        </p>
      </form>
      <Result data={data} />
    </div>
  );
}

export default InputForm;
