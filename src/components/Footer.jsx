import Logo from './Logo'

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-8"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Logo size={32} />
          <span className="font-orbitron font-black text-sm tracking-[4px] text-accent">SANTIAGO</span>
        </div>

        <p className="text-white/25 text-xs tracking-wide text-center">
          © {new Date().getFullYear()} Santiago Ferlatti · Rosario, Argentina
        </p>
      </div>
    </footer>
  )
}
