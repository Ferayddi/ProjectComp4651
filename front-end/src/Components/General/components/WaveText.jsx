
// import './WaveText.css'; // Make sure the CSS is imported

const WaveText = ({ text }) => {
  // Split the text into an array of characters
  const letters = text.split('').map((char, index) => (
    <span key={index} style={{ '--i': index }} className="wave">
      {char}
    </span>
  ));

  return (
    <div>
      {letters}
    </div>
  );
};

export default WaveText;