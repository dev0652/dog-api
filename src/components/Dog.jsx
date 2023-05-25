export const Dog = ({ dog: { url, breeds } }) => {
  const { name, bred_for, temperament } = breeds[0];

  return (
    <div>
      <img
        style={{ display: 'flex', gap: 16 }}
        src={url}
        width="480"
        alt="dog"
      />
      <p>Name: {name}</p>
      <p>Bred for: {bred_for}</p>
      <p>Temperament: {temperament}</p>
    </div>
  );
};
