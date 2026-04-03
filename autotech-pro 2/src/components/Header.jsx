import React, { useState } from 'react'

export default function Header({ vehicle, page, nav, onVehicle, onToggleSidebar, showToast }) {
  const [q, setQ] = useState('')

  const doSearch = () => {
    const s = q.toLowerCase()
    if (!s) return
    const map = [
      [['freni','pastiglia','disco','abs'],'repair'],
      [['motore','distribuzione','cinghia'],'repair'],
      [['schema','elettrico','wiring'],'diagram'],
      [['dtc','obd','p0','errore','codice'],'dtc'],
      [['recall','tsb','richiamo','nhtsa'],'recall'],
      [['ricambi','pezzo','oem','parts'],'parts'],
      [['manutenzione','tagliando','service','scadenza','km'],'maintenance'],
    [['ordine','lavoro','gestionale','fattura'],'gestionale'],
    ]
    for (const [keys, dest] of map) {
      if (keys.some(k => s.includes(k))) { nav(dest); showToast(`🔍 Navigato a: ${dest}`); setQ(''); return }
    }
    nav('dtc')
    showToast('🔍 Ricerca avanzata tramite AI DTC Scanner')
    setQ('')
  }

  const pageLabels = {
    home: 'Home', repair: 'Diagnosi & Riparazione', procedure: 'Procedura OEM',
    diagram: 'Schemi Elettrici', dtc: 'Scanner DTC + AI', recall: 'Recall NHTSA Live',
    parts: 'Catalogo Ricambi', gestionale: 'Gestionale Officina',
  }

  return (
    <header style={{ background: '#0a1520', borderBottom: '1px solid #1e3a5a', padding: '0 16px', height: 52, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      <button onClick={onToggleSidebar} style={{ background: 'none', border: 'none', color: '#5a9adb', cursor: 'pointer', fontSize: 18, padding: '4px 8px' }}>☰</button>

      <div style={{ fontSize: 11, color: '#3a6a9a' }}>
        <span style={{ color: '#5a9adb', cursor: 'pointer' }} onClick={() => nav('home')}>AutoTech Pro</span>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#8ab8de' }}>{pageLabels[page] || page}</span>
      </div>

      {/* Search */}
      <div style={{ flex: 1, display: 'flex', gap: 6, maxWidth: 480 }}>
        <input
          value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch()}
          placeholder="Cerca procedura, DTC, componente, recall..."
          style={{ flex: 1, background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 6, padding: '6px 12px', color: '#e8edf5', fontSize: 12, outline: 'none' }}
        />
        <button onClick={doSearch} style={{ background: '#1a4a8a', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
          Cerca
        </button>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        {vehicle && (
          <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: '#5a9adb' }}>
            🚗 {vehicle.year} {vehicle.make} {vehicle.model}
          </div>
        )}
        <button onClick={onVehicle} style={{ background: '#f0a000', color: '#000', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}>
          {vehicle ? '🔄 Cambia' : '+ Veicolo'}
        </button>
      </div>
    </header>
  )
}
