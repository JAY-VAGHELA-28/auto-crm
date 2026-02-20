import "../../styles/cards.css";

export default function StatCard({ title, value, color }) {
  return (
    <div className="statCard" style={{ borderTop: `4px solid ${color}` }}>
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}