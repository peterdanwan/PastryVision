const Card = (children) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm`}>
      {children}
    </div>
  );
};

export default Card;