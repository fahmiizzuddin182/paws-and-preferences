import Card from "./Card";

function CardStack({ cats, currentIndex, onSwipe }) {
  if (!cats || cats.length === 0) return null;
  if (currentIndex >= cats.length) return null;

  return (
    <div className="relative w-96 h-155 max-[376px]:h-125">
      {/* Back card (next) */}
      {cats[currentIndex + 1] && (
        <div className="absolute inset-0 scale-95">
          <img
            src={cats[currentIndex + 1].url}
            alt="Next cat"
            className="w-full h-full object-cover rounded-[3rem] shadow-md blur-xs"
          />
        </div>
      )}

      {/* Front card */}
      <div className="absolute inset-0">
        <Card
          key={currentIndex}
          cats={cats}
          currentIndex={currentIndex}
          onSwipe={onSwipe}
        />
      </div>
    </div>
  );
}

export default CardStack;
