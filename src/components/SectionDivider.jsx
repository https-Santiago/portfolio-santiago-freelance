export default function SectionDivider() {
  return (
    <div className="relative h-12 bg-base-soft overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage:
            'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}
