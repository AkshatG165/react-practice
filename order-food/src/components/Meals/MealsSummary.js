import classes from './MealsSummary.module.css';
import Card from '../UI/Card/Card';

function MealsSummary() {
  return (
    <Card className={classes['summary']}>
      <h1>Delicious Food, Delivered to you</h1>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </Card>
  );
}

export default MealsSummary;
