import React from 'react'

const navItems = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'repair', icon: '🔧', label: 'Diagnosi & Riparazione' },
  { id: 'diagram', icon: '⚡', label: 'Schemi Elettrici' },
  { id: 'dtc', icon: '🔴', label: 'Scanner DTC / AI', badge: 'AI' },
  { id: 'recall', icon: '📋', label: 'Recall NHTSA Live', badge: 'LIVE' },
  { id: 'parts', icon: '🔩', label: 'Catalogo Ricambi' },
  { id: 'maintenance', icon: '🗓️', label: 'Manutenzione', badge: 'NEW' },
  { id: 'gestionale', icon: '📊', label: 'Gestionale Officina' },
]

export default function Sidebar({ page, nav, vehicle, open }) {
  if (!open) return null
  return (
    <aside style={{ width: 230, background: '#0a1520', borderRight: '1px solid #1e3a5a', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid #1e3a5a' }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: -1, fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
          AUTO<span style={{ color: '#f0a000' }}>TECH</span>
        </div>
        <div style={{ fontSize: 10, color: '#f0a000', letterSpacing: 2, marginTop: 1 }}>PRO — GESTIONALE OFFICINA</div>
        <div style={{ fontSize: 9, color: '#3a6a9a', marginTop: 3 }}>v2.0 · Web Edition · NHTSA Live</div>
      </div>

      {/* Vehicle info */}
      <div style={{ padding: '10px 14px', background: '#0d1e30', borderBottom: '1px solid #1e3a5a' }}>
        {vehicle ? (
          <>
            <div style={{ fontSize: 9, color: '#5a9adb', textTransform: 'uppercase', letterSpacing: 1 }}>{vehicle.year} — {vehicle.engine}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 2 }}>{vehicle.make} {vehicle.model}</div>
            {vehicle.km && <div style={{ fontSize: 9, color: '#4a7aaa', marginTop: 2 }}>{parseInt(vehicle.km).toLocaleString('it-IT')} km</div>}
            {vehicle.vin && <div style={{ fontSize: 9, color: '#3a5a7a', fontFamily: 'monospace', marginTop: 2 }}>VIN: {vehicle.vin}</div>}
          </>
        ) : (
          <div style={{ fontSize: 10, color: '#3a6a9a', cursor: 'pointer' }} onClick={() => nav('home')}>
            → Nessun veicolo selezionato
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {navItems.map(item => (
          <div key={item.id} onClick={() => nav(item.id)}
            style={{
              padding: '9px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9,
              background: page === item.id ? '#1a4a8a' : 'transparent',
              color: page === item.id ? '#fff' : '#7aaace',
              fontSize: 12, fontWeight: page === item.id ? 600 : 400,
              borderLeft: page === item.id ? '3px solid #f0a000' : '3px solid transparent',
              transition: 'all .15s',
            }}
            onMouseEnter={e => { if (page !== item.id) e.currentTarget.style.background = '#152a40' }}
            onMouseLeave={e => { if (page !== item.id) e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 8, background: item.badge === 'AI' ? '#1a5a3a' : '#5a2a00', color: item.badge === 'AI' ? '#4aff8a' : '#f0a000', border: `1px solid ${item.badge === 'AI' ? '#2a8a5a' : '#a06000'}` }}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #1e3a5a', fontSize: 9, color: '#2a4a6a' }}>
        Dati: NHTSA.gov · SAE J2012 · OEM<br />
        Aggiornato automaticamente
      </div>
    </aside>
  )
}
