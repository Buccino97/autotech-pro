import React, { useState, useEffect } from 'react'
import { PrintWorkOrder } from '../components/PrintService.jsx'

const INITIAL_WO = [
  { id:'J001025', cliente:'Rossi Marco', tel:'338 123 4567', veicolo:'2021 VW Golf 1.6 TDI', targa:'AB123CD', lavoro:'Tagliando + freni anteriori', tecnico:'Luca B.', totale:485, stato:'completed', note:'Pastiglie e dischi ant. sostituiti.' },
  { id:'J001026', cliente:'Ferrari Anna', tel:'347 987 6543', veicolo:'2019 Fiat 500 1.2', targa:'CD456EF', lavoro:'Sostituzione cinghia distribuzione', tecnico:'Marco T.', totale:620, stato:'completed', note:'Kit distribuzione OEM.' },
  { id:'J001027', cliente:'Bianchi Luigi', tel:'331 555 7890', veicolo:'2022 Toyota RAV4 Hybrid', targa:'GH789IJ', lavoro:'Diagnosi P0420 + reset DPF', tecnico:'Stefano R.', totale:195, stato:'progress', note:'Aggiornamento ECU TSB applicabile.' },
  { id:'J001028', cliente:'Conti Sara', tel:'340 222 1111', veicolo:'2018 BMW X3 2.0d', targa:'KL012MN', lavoro:'Ammortizzatori anteriori + geometria', tecnico:'Luca B.', totale:890, stato:'progress', note:'In attesa parti.' },
  { id:'J001029', cliente:'Esposito Carla', tel:'392 444 5555', veicolo:'2020 Renault Clio 1.5 dCi', targa:'OP345QR', lavoro:'Sostituzione alternatore', tecnico:'Marco T.', totale:425, stato:'waiting', note:'In attesa ricambio fornitore.' },
  { id:'J001030', cliente:'Romano Pietro', tel:'333 666 7777', veicolo:'2023 Mercedes GLC 220d', targa:'ST678UV', lavoro:'Tagliando + diagnostica', tecnico:'Stefano R.', totale:280, stato:'waiting', note:'Appuntamento confermato.' },
  { id:'J001031', cliente:'Lombardi Fabio', tel:'349 888 9999', veicolo:'2017 Audi A4 2.0 TDI', targa:'WX901YZ', lavoro:'Ricarica A/C + filtro abitacolo', tecnico:'Andrea M.', totale:210, stato:'completed', note:'Gas R134a caricato a specifica.' },
]

const STATO_LABELS = { completed:'Completato', progress:'In Lavorazione', waiting:'In Attesa', scheduled:'Programmato' }
const STATO_COLORS = { completed:'#1a7a1a', progress:'#a07000', waiting:'#cc2222', scheduled:'#1a4a8a' }

export default function Gestionale({ vehicle, showToast }) {
  const [orders, setOrders] = useState(() => {
    try { const saved = localStorage.getItem('autotech_orders'); return saved ? JSON.parse(saved) : INITIAL_WO } catch { return INITIAL_WO }
  })
  const [tab, setTab] = useState('orders')
  const [filter, setFilter] = useState('all')
  const [showNew, setShowNew] = useState(false)
  const [newWo, setNewWo] = useState({ cliente:'', tel:'', veicolo: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '', targa:'', lavoro:'', tecnico:'Luca B.', totale:0, note:'' })
  const [expanded, setExpanded] = useState(null)
  const [printOrder, setPrintOrder] = useState(null)

  useEffect(() => { localStorage.setItem('autotech_orders', JSON.stringify(orders)) }, [orders])

  const filtered = filter === 'all' ? orders : orders.filter(o => o.stato === filter)
  const completed = orders.filter(o => o.stato === 'completed')
  const revenue = completed.reduce((a, o) => a + (o.totale || 0), 0)

  const saveOrder = () => {
    if (!newWo.cliente || !newWo.lavoro) { showToast('⚠️ Cliente e lavoro obbligatori', 'warn'); return }
    const id = `J${String(orders.length + 1001).padStart(6,'0')}`
    const order = { ...newWo, id, stato:'waiting', totale: parseFloat(newWo.totale)||0 }
    setOrders(prev => [order, ...prev])
    setNewWo({ cliente:'', tel:'', veicolo: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '', targa:'', lavoro:'', tecnico:'Luca B.', totale:0, note:'' })
    setShowNew(false)
    showToast(`✅ Ordine ${id} creato`, 'ok')
  }

  const updateStato = (id, stato) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, stato } : o))
    showToast(`✅ Ordine ${id} aggiornato: ${STATO_LABELS[stato]}`, 'ok')
  }

  const inp = { background: '#070f18', border: '1px solid #1e3a5a', borderRadius: 6, padding: '7px 12px', color: '#e8edf5', fontSize: 12, outline: 'none', width: '100%' }

  return (
    <div style={{ padding: 20 }}>
      {printOrder && <PrintWorkOrder order={printOrder} onClose={() => setPrintOrder(null)} />}
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>📊 Gestionale Officina</h2>
          <div style={{ fontSize: 12, color: '#4a7aaa', marginTop: 3 }}>Dati salvati automaticamente nel browser</div>
        </div>
        <button onClick={() => setShowNew(true)} style={{ marginLeft: 'auto', background: '#f0a000', color: '#000', border: 'none', borderRadius: 8, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
          ➕ Nuovo Ordine
        </button>
      </div>

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { val: orders.length, label: 'Ordini Totali', color: '#5a9adb' },
          { val: completed.length, label: 'Completati', color: '#4aaa4a' },
          { val: orders.filter(o => o.stato === 'progress').length, label: 'In Lavorazione', color: '#f0a000' },
          { val: `€ ${revenue.toLocaleString('it-IT')}`, label: 'Fatturato', color: '#cc4444' },
        ].map(k => (
          <div key={k.label} style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: k.color }}>{k.val}</div>
            <div style={{ fontSize: 10, color: '#4a7aaa', marginTop: 3 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* New WO form */}
      {showNew && (
        <div style={{ background: '#0d1e30', border: '1px solid #2a5a2a', borderRadius: 10, padding: 18, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#4aaa4a', marginBottom: 14 }}>➕ Nuovo Ordine di Lavoro</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[['Cliente *', 'cliente', 'Nome cliente'], ['Telefono', 'tel', '338 000 0000'], ['Veicolo', 'veicolo', 'Anno Marca Modello'], ['Targa', 'targa', 'AB123CD']].map(([l, k, ph]) => (
              <div key={k}>
                <div style={{ fontSize: 10, color: '#4a7aaa', marginBottom: 4, textTransform: 'uppercase' }}>{l}</div>
                <input value={newWo[k]} onChange={e => setNewWo(p => ({ ...p, [k]: e.target.value }))} placeholder={ph} style={inp} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: '#4a7aaa', marginBottom: 4, textTransform: 'uppercase' }}>Lavoro richiesto *</div>
            <textarea value={newWo.lavoro} onChange={e => setNewWo(p => ({ ...p, lavoro: e.target.value }))} placeholder="Descrizione lavoro..." style={{ ...inp, height: 70, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, color: '#4a7aaa', marginBottom: 4, textTransform: 'uppercase' }}>Tecnico</div>
              <select value={newWo.tecnico} onChange={e => setNewWo(p => ({ ...p, tecnico: e.target.value }))} style={inp}>
                {['Luca B.','Marco T.','Stefano R.','Andrea M.'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#4a7aaa', marginBottom: 4, textTransform: 'uppercase' }}>Importo €</div>
              <input type="number" value={newWo.totale} onChange={e => setNewWo(p => ({ ...p, totale: e.target.value }))} placeholder="0" style={inp} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#4a7aaa', marginBottom: 4, textTransform: 'uppercase' }}>Note</div>
              <input value={newWo.note} onChange={e => setNewWo(p => ({ ...p, note: e.target.value }))} placeholder="Note aggiuntive..." style={inp} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowNew(false)} style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #2a4a6a', borderRadius: 6, color: '#5a9adb', cursor: 'pointer', fontSize: 13 }}>Annulla</button>
            <button onClick={saveOrder} style={{ padding: '8px 22px', background: '#f0a000', color: '#000', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>✓ Crea Ordine</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {[['all','Tutti'], ['completed','Completati'], ['progress','In Lavorazione'], ['waiting','In Attesa'], ['scheduled','Programmati']].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #2a4a6a', background: filter === v ? '#1a4a8a' : 'transparent', color: filter === v ? '#fff' : '#5a9adb', cursor: 'pointer', fontSize: 12 }}>{l} {v === 'all' ? `(${orders.length})` : `(${orders.filter(o=>o.stato===v).length})`}</button>
        ))}
      </div>

      {/* Orders table */}
      <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 10, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#0a1520' }}>
              {['R/O #','Cliente','Veicolo / Targa','Lavoro','Tecnico','Totale','Stato','Azioni'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 10, color: '#5a9adb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <React.Fragment key={o.id}>
                <tr onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                  style={{ borderTop: '1px solid #1e3a5a', cursor: 'pointer', background: expanded === o.id ? '#111c27' : 'transparent', transition: 'background .12s' }}
                  onMouseEnter={e => { if (expanded !== o.id) e.currentTarget.style.background = '#0f1a27' }}
                  onMouseLeave={e => { if (expanded !== o.id) e.currentTarget.style.background = 'transparent' }}>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontWeight: 700, color: '#5a9adb' }}>{o.id}</td>
                  <td style={{ padding: '10px 12px' }}><div style={{ fontWeight: 600, color: '#fff' }}>{o.cliente}</div><div style={{ fontSize: 10, color: '#4a7aaa' }}>{o.tel}</div></td>
                  <td style={{ padding: '10px 12px' }}><div style={{ color: '#c8d8e8' }}>{o.veicolo}</div><div style={{ fontSize: 10, color: '#4a7aaa', fontFamily: 'monospace' }}>{o.targa}</div></td>
                  <td style={{ padding: '10px 12px', color: '#8ab8de', maxWidth: 180 }}><div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.lavoro}</div></td>
                  <td style={{ padding: '10px 12px', color: '#7a9aaa' }}>{o.tecnico}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#f0a000' }}>€ {o.totale?.toLocaleString('it-IT')}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 10, background: `${STATO_COLORS[o.stato]}22`, color: STATO_COLORS[o.stato], border: `1px solid ${STATO_COLORS[o.stato]}44` }}>
                      {STATO_LABELS[o.stato]}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{display:'flex',gap:4,alignItems:'center'}}>
                    <button onClick={e => {e.stopPropagation(); setPrintOrder(o)}} style={{background:'none',border:'none',cursor:'pointer',color:'#5a9adb',fontSize:14,padding:'2px 4px'}} title="Stampa PDF">🖨️</button>
                    <select onChange={e => { e.stopPropagation(); updateStato(o.id, e.target.value) }} value={o.stato} onClick={e => e.stopPropagation()}
                      style={{ background: '#0a1520', border: '1px solid #2a4a6a', borderRadius: 4, color: '#5a9adb', fontSize: 10, padding: '3px 6px', cursor: 'pointer' }}>
                      {Object.entries(STATO_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select></div>
                  </td>
                </tr>
                {expanded === o.id && (
                  <tr>
                    <td colSpan={8} style={{ padding: '0 12px 14px', borderBottom: '1px solid #1e3a5a', background: '#0a1520' }}>
                      <div style={{ paddingTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <div style={{ fontSize: 10, color: '#4a7aaa', marginBottom: 4 }}>LAVORO COMPLETO</div>
                          <div style={{ fontSize: 12, color: '#8ab8de', lineHeight: 1.6 }}>{o.lavoro}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: '#4a7aaa', marginBottom: 4 }}>NOTE TECNICHE</div>
                          <div style={{ fontSize: 12, color: '#7a9aaa', lineHeight: 1.6 }}>{o.note || '—'}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: 30, textAlign: 'center', color: '#3a6a9a', fontSize: 13 }}>Nessun ordine trovato</div>}
      </div>
    </div>
  )
}
