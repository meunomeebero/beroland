export function Span({ children, color }) {
  return (
    <span
      style={{
        background: color,
        margin: '0 0.2rem',
      }}
    >
      {children}
    </span>
  )
}
