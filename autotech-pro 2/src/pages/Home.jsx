import React from 'react'

const cards = [
  { id: 'repair', icon: '🔧', title: 'Diagnosi & Riparazione', desc: 'Procedure OEM passo-passo con esplosi 3D interattivi dei componenti', color: '#1a4a8a' },
  { id: 'diagram', icon: '⚡', title: 'Schemi Elettrici', desc: 'Diagrammi interattivi a colori, localizzazione connettori e componenti', color: '#1a4a2a' },
  { id: 'dtc', icon: '🤖', title: 'Scanner DTC + AI', desc: '71+ codici OBD-II reali SAE J2012 con diagnosi assistita da Claude AI', color: '#3a1a5a' },
  { id: 'recall', icon: '📋', title: 'Recall NHTSA Live', desc: '15+ recall reali 2024-2026 sempre aggiornati da NHTSA.gov API', color: '#5a2a00' },
  { id: 'parts', icon: '🔩', title: 'Catalogo Ricambi', desc: 'Ricerca ricambi OEM con codici, prezzi e disponibilità', color: '#1a3a5a' },
  { id: 'maintenance', icon: '🗓️', title: 'Piano Manutenzione', desc: 'Tagliandi e scadenze km/mesi, storico interventi, prossimi service OEM', color: '#1a3a1a' },
  { id: 'gestionale', icon: '📊', title: 'Gestionale Officina', desc: 'Ordini di lavoro, clienti, preventivi, stampa PDF, report finanziario', color: '#2a1a4a' },
]

const stats = [
  { val: '44.000+', label: 'Veicoli nel DB' },
  { val: '71+', label: 'DTC SAE J2012' },
  { val: '15+', label: 'Recall NHTSA 2024-26' },
  { val: '5', label: 'Esplosi 3D Animati' },
]

export default function Home({ nav, vehicle, showVehicleModal }) {
  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 52, fontWeight: 900, color: '#fff', letterSpacing: -2, fontFamily: 'Arial Narrow, Arial, sans-serif', lineHeight: 1 }}>
          AUTO<span style={{ color: '#f0a000' }}>TECH</span> PRO
        </div>
        <div style={{ fontSize: 16, color: '#f0a000', letterSpacing: 3, marginTop: 4, fontWeight: 700 }}>GESTIONALE OFFICINA — WEB EDITION</div>
        <div style={{ fontSize: 13, color: '#4a7aaa', marginTop: 8 }}>
          Database NHTSA/OEM · Procedure passo-passo · Esplosi 3D · DTC AI-Assisted · Recall Live
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
          {stats.map(s => (
            <div key={s.val} style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 8, padding: '12px 20px', textAlign: 'center', minWidth: 100 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#f0a000' }}>{s.val}</div>
              <div style={{ fontSize: 10, color: '#4a7aaa', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Vehicle CTA */}
        {!vehicle ? (
          <div style={{ marginTop: 24 }}>
            <button onClick={showVehicleModal} style={{ background: '#f0a000', color: '#000', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              🚗 Seleziona Veicolo per Iniziare
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 20, background: '#0d1e30', border: '1px solid #1e4a2a', borderRadius: 8, padding: '10px 20px', display: 'inline-block' }}>
            <span style={{ color: '#4aaa4a', fontSize: 12 }}>✓ Veicolo attivo: </span>
            <strong style={{ color: '#fff', fontSize: 13 }}>{vehicle.year} {vehicle.make} {vehicle.model}</strong>
            {vehicle.engine && <span style={{ color: '#5a9adb', fontSize: 11 }}> — {vehicle.engine}</span>}
          </div>
        )}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {cards.map(c => (
          <div key={c.id} onClick={() => nav(c.id)}
            style={{ background: '#0d1e30', border: `1px solid #1e3a5a`, borderRadius: 10, padding: 20, cursor: 'pointer', transition: 'all .2s', borderTop: `3px solid ${c.color}` }}
            onMouseEnter={e => { e.currentTarget.style.background = '#111c27'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#2a5a8a' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0d1e30'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#1e3a5a' }}
          >
            <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{c.title}</div>
            <div style={{ fontSize: 12, color: '#5a8aaa', lineHeight: 1.6 }}>{c.desc}</div>
            <div style={{ marginTop: 12, fontSize: 11, color: '#3a6a9a', fontWeight: 600 }}>Apri →</div>
          </div>
        ))}
      </div>

      {/* News ticker */}
      <div style={{ marginTop: 32, background: '#0a1520', border: '1px solid #1e3a5a', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ background: '#cc2222', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>LIVE</span>
        <span style={{ fontSize: 11, color: '#5a9adb' }}>Ultimo recall NHTSA: 26V128 — Toyota Highlander 2021-24 (sedili 2a fila) · 26V122 — Ford 2025 EGR valve · 25V900 — VW/Audi Takata airbag</span>
      </div>
    </div>
  )
}
