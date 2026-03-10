function Greeting(props) {
  let message = '';
  let emoji = '';

  if (props.timeOfDay === 'morning') {
    message = 'Good Morning';
    emoji = '🌅';
  } else if (props.timeOfDay === 'afternoon') {
    message = 'Good Afternoon';
    emoji = '☀️';
  } else if (props.timeOfDay === 'evening') {
    message = 'Good Evening';
    emoji = '🌙';
  } else {
    message = 'Hello';
    emoji = '👋';
  }

  return (
    <div className="greeting-card" style={{ backgroundColor: props.bgColor || '#ffffff' }}>
      <div className="emoji">{emoji}</div>
      <h2>{message}, {props.name}!</h2>
      <p>Hope you are having a great {props.timeOfDay}.</p>
    </div>
  );
}

export default Greeting;
