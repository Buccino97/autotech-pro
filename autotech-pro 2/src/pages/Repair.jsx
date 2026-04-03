import React, { useState } from 'react'

const systems = [
  { id: 'engine', icon: '⚙️', name: 'Motore', desc: 'Distribuzione, testata, lubrificazione', procs: 42 },
  { id: 'brakes', icon: '🛑', name: 'Freni', desc: 'Pastiglie, dischi, ABS, EPB', procs: 35 },
  { id: 'electrical', icon: '⚡', name: 'Impianto Elettrico', desc: 'Batteria, alternatore, avviamento', procs: 55 },
  { id: 'suspension', icon: '🔗', name: 'Sospensioni & Sterzo', desc: 'Ammortizzatori, bracci, EPS, geometria', procs: 31 },
  { id: 'ac', icon: '❄️', name: 'Climatizzazione', desc: 'Compressore A/C, gas refrigerante', procs: 18 },
  { id: 'transmission', icon: '🔩', name: 'Trasmissione', desc: 'Cambio ATF, frizione, differenziale', procs: 28 },
  { id: 'exhaust', icon: '💨', name: 'Scarico / DPF / EGR', desc: 'Catalizzatore, filtro DPF, lambda', procs: 16 },
  { id: 'fuel', icon: '⛽', name: 'Carburante', desc: 'Pompa, iniettori, pressione rail', procs: 24 },
  { id: 'steering', icon: '🎯', name: 'Sterzo EPS', desc: 'Piantone elettronico, calibrazione', procs: 12 },
  { id: 'body', icon: '🚗', name: 'Carrozzeria & SRS', desc: 'Parabrezza ADAS, airbag, pannelli', procs: 47 },
]

export default function Repair({ nav, vehicle, setSelectedProc, showVehicleModal }) {
  const [filter, setFilter] = useState('all')

  const selectProc = (id) => {
    if (!vehicle) { showVehicleModal(); return }
    setSelectedProc(id)
    nav('procedure')
  }

  const categories = [
    { id: 'all', label: 'Tutti i sistemi' },
    { id: 'mechanical', label: 'Meccanici' },
    { id: 'electrical', label: 'Elettrici' },
    { id: 'body', label: 'Carrozzeria' },
  ]
  const catMap = {
    engine: 'mechanical', brakes: 'mechanical', suspension: 'mechanical',
    ac: 'mechanical', transmission: 'mechanical', exhaust: 'mechanical', fuel: 'mechanical',
    steering: 'electrical', electrical: 'electrical', body: 'body',
  }

  const filtered = filter === 'all' ? systems : systems.filter(s => catMap[s.id] === filter)

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>🔧 Diagnosi e Riparazione</h2>
          <div style={{ fontSize: 12, color: '#4a7aaa', marginTop: 4 }}>
            {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${vehicle.engine}` : 'Seleziona un veicolo per procedure specifiche'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {categories.map(c => (
            <button key={c.id} onClick={() => setFilter(c.id)}
              style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #2a4a6a', background: filter === c.id ? '#1a4a8a' : 'transparent', color: filter === c.id ? '#fff' : '#5a9adb', cursor: 'pointer', fontSize: 12 }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {!vehicle && (
        <div style={{ background: '#1a2a0a', border: '1px solid #2a4a1a', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 12, color: '#4aaa4a', display: 'flex', alignItems: 'center', gap: 10 }}>
          💡 Seleziona un veicolo per procedure e specifiche personalizzate per il tuo modello
          <button onClick={showVehicleModal} style={{ background: '#f0a000', color: '#000', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 11, fontWeight: 700, marginLeft: 'auto' }}>Seleziona Veicolo</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {filtered.map(s => (
          <SystemCard key={s.id} system={s} onClick={() => selectProc(s.id)} />
        ))}
      </div>
    </div>
  )
}

function SystemCard({ system, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#111c27' : '#0d1e30', border: '1px solid', borderColor: hov ? '#2a5a8a' : '#1e3a5a',
        borderRadius: 10, padding: 18, cursor: 'pointer', transition: 'all .18s',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ fontSize: 36, flexShrink: 0 }}>{system.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{system.name}</div>
          <div style={{ fontSize: 11, color: '#5a8aaa', marginTop: 4, lineHeight: 1.5 }}>{system.desc}</div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, color: '#3a6a9a' }}>▶ {system.procs} procedure OEM</span>
            <span style={{ fontSize: 9, background: '#1a2a3a', color: '#5a9adb', padding: '2px 8px', borderRadius: 10, border: '1px solid #2a4a6a' }}>3D Esplosivo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
