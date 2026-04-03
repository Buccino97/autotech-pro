import React, { useState, useEffect } from 'react'

const MAINT_TEMPLATE = [
  { id:'oil', icon:'🛢️', name:'Olio motore + filtro olio', km:10000, months:12, cost:60, cat:'engine', note:'Usare viscosità specifica OEM. Verificare livello ogni 1000km.' },
  { id:'air', icon:'💨', name:'Filtro aria motore', km:30000, months:24, cost:25, cat:'engine', note:'Sostituire prima in ambienti polverosi.' },
  { id:'cabin', icon:'🌬️', name:'Filtro abitacolo (carboni attivi)', km:15000, months:12, cost:20, cat:'interior', note:'Preferire filtri antipolline con carboni attivi.' },
  { id:'fuel_f', icon:'⛽', name:'Filtro carburante diesel', km:30000, months:24, cost:35, cat:'fuel', note:'Solo su veicoli diesel con filtro esterno accessibile.' },
  { id:'spark', icon:'⚡', name:'Candele accensione (benzina)', km:30000, months:36, cost:80, cat:'engine', note:'Candele iridio: fino a 60.000km. Verificare specifiche motore.' },
  { id:'coolant', icon:'🌡️', name:'Liquido raffreddamento', km:0, months:48, cost:40, cat:'engine', note:'Tipo G12++ viola o G13 rosso/viola — NON mescolare.' },
  { id:'brake_f', icon:'🛑', name:'Fluido freni DOT 4', km:0, months:24, cost:30, cat:'brakes', note:'DOT 4 LV per veicoli moderni. Assorbente igroscopico — rinnovare obbligatoriamente.' },
  { id:'timing', icon:'⚙️', name:'Cinghia distribuzione + kit', km:150000, months:120, cost:400, cat:'engine', note:'Sostituire sempre con kit completo (tenditore + rullo + pompa acqua).' },
  { id:'atf', icon:'🔩', name:'Olio cambio automatico ATF', km:60000, months:60, cost:120, cat:'transmission', note:'Solo fluido specificato. Errato ATF = danni irreversibili.' },
  { id:'dsg', icon:'🔩', name:'Olio cambio DSG/DCT + filtro', km:40000, months:36, cost:180, cat:'transmission', note:'Obbligatorio su DSG/DCT 7 marce. Non trascurare.' },
  { id:'pollen', icon:'🌿', name:'Filtro antipolline (stagionale)', km:0, months:6, cost:20, cat:'interior', note:'Sostituire a primavera, prima della stagione dei pollini.' },
  { id:'wiper', icon:'🌧️', name:'Tergicristalli (gomme)', km:0, months:12, cost:35, cat:'exterior', note:'Sostituire a inizio inverno. Verificare funzionamento spruzzo.' },
  { id:'battery', icon:'🔋', name:'Test batteria (CCA / SOH)', km:0, months:12, cost:0, cat:'electrical', note:'Test gratuito presso officina. Sostituire se CCA residua <70% nominale.' },
  { id:'brakes_v', icon:'🛑', name:'Revisione impianto frenante', km:20000, months:12, cost:0, cat:'brakes', note:'Misurare spessore pastiglie e dischi. Verificare flessibili.' },
  { id:'susp_v', icon:'🔗', name:'Ispezione sospensioni e sterzo', km:30000, months:24, cost:0, cat:'suspension', note:'Verificare silent block, biellette, cuscinetti ruota, tubi sterzo.' },
  { id:'dpf', icon:'💨', name:'Rigenerazione/pulizia DPF (diesel)', km:120000, months:0, cost:150, cat:'engine', note:'Solo uso urbano: ogni 80.000km. Verificare pressione differenziale.' },
  { id:'ac_check', icon:'❄️', name:'Controllo pressione gas A/C', km:0, months:24, cost:50, cat:'ac', note:'Perdita >10% gas/anno: ricercare perdita con UV. Aggiungere olio PAG.' },
  { id:'tires', icon:'🔄', name:'Rotazione pneumatici', km:15000, months:12, cost:30, cat:'tires', note:'Schema di rotazione: ant→post e incrocio lato. Verificare pressioni.' },
]

const CAT_COLORS = {
  engine:'#1a4a8a', transmission:'#1a3a5a', brakes:'#8a1a1a', suspension:'#1a5a3a',
  electrical:'#5a3a8a', fuel:'#5a3a00', interior:'#3a3a1a', exterior:'#1a3a3a',
  ac:'#0a3a5a', tires:'#3a2a1a',
}

export default function MaintenancePage({ vehicle, showToast }) {
  const storageKey = vehicle ? `maint_${vehicle.make}_${vehicle.model}_${vehicle.year}` : 'maint_default'

  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) return JSON.parse(saved)
    } catch {}
    // Initialize with default records
    return MAINT_TEMPLATE.map(m => ({
      ...m,
      lastKm: 0,
      lastDate: null,
      nextKm: m.km || null,
      done: false,
    }))
  })

  const [currentKm, setCurrentKm] = useState(() => {
    return vehicle?.km ? parseInt(vehicle.km.replace(/\D/g,'')) : 0
  })
  const [editKm, setEditKm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [showDoneModal, setShowDoneModal] = useState(null)
  const [doneKm, setDoneKm] = useState('')
  const [doneDate, setDoneDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(records))
  }, [records, storageKey])

  const getStatus = (r) => {
    if (!r.lastDate && !r.lastKm) return 'unknown'
    let kmStatus = 'ok', timeStatus = 'ok'
    if (r.km && r.lastKm) {
      const kmLeft = (r.lastKm + r.km) - currentKm
      if (kmLeft < 0) kmStatus = 'overdue'
      else if (kmLeft < r.km * 0.15) kmStatus = 'due_soon'
    }
    if (r.months && r.lastDate) {
      const nextDate = new Date(r.lastDate)
      nextDate.setMonth(nextDate.getMonth() + r.months)
      const daysLeft = Math.floor((nextDate - new Date()) / (1000*60*60*24))
      if (daysLeft < 0) timeStatus = 'overdue'
      else if (daysLeft < 30) timeStatus = 'due_soon'
    }
    if (kmStatus === 'overdue' || timeStatus === 'overdue') return 'overdue'
    if (kmStatus === 'due_soon' || timeStatus === 'due_soon') return 'due_soon'
    return 'ok'
  }

  const getProgress = (r) => {
    if (!r.lastKm || !r.km) return 50
    const used = currentKm - r.lastKm
    return Math.min(100, Math.max(0, (used / r.km) * 100))
  }

  const markDone = () => {
    if (!showDoneModal) return
    setRecords(prev => prev.map(r => {
      if (r.id !== showDoneModal.id) return r
      const km = parseInt(doneKm) || currentKm
      return { ...r, lastKm: km, lastDate: doneDate, done: true, nextKm: km + r.km }
    }))
    showToast(`✅ "${showDoneModal.name}" segnato come eseguito`, 'ok')
    setShowDoneModal(null)
    setDoneKm('')
  }

  const filtered = filter === 'all' ? records : filter === 'due' ? records.filter(r => ['overdue','due_soon'].includes(getStatus(r))) : records.filter(r => r.cat === filter)

  const overdueCount = records.filter(r => getStatus(r) === 'overdue').length
  const dueSoonCount = records.filter(r => getStatus(r) === 'due_soon').length

  const STATUS_STYLE = {
    overdue: { bg: '#1a0505', border: '#cc2222', dot: '#cc2222', label: 'SCADUTO' },
    due_soon: { bg: '#1a1200', border: '#a07000', dot: '#f0a000', label: 'IN SCADENZA' },
    ok: { bg: '#051505', border: '#1a5a1a', dot: '#4aaa4a', label: 'OK' },
    unknown: { bg: '#0d1e30', border: '#2a4a6a', dot: '#5a9adb', label: 'DA REGISTRARE' },
  }

  return (
    <div style={{ padding: 20 }}>
      {/* Mark done modal */}
      {showDoneModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 10, width: 400, overflow: 'hidden' }}>
            <div style={{ background: '#0a1520', padding: '12px 16px', borderBottom: '1px solid #1e3a5a', fontSize: 14, fontWeight: 700, color: '#fff' }}>
              ✓ Segna come Eseguito — {showDoneModal.name}
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: '#5a9adb', marginBottom: 5, textTransform: 'uppercase' }}>Km al momento dell'intervento</div>
                <input value={doneKm} onChange={e => setDoneKm(e.target.value)} type="number"
                  placeholder={`Km attuali: ${currentKm.toLocaleString('it-IT')}`}
                  style={{ width: '100%', background: '#070f18', border: '1px solid #1e3a5a', borderRadius: 6, padding: '8px 12px', color: '#e8edf5', fontSize: 13, outline: 'none' }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: '#5a9adb', marginBottom: 5, textTransform: 'uppercase' }}>Data intervento</div>
                <input value={doneDate} onChange={e => setDoneDate(e.target.value)} type="date"
                  style={{ width: '100%', background: '#070f18', border: '1px solid #1e3a5a', borderRadius: 6, padding: '8px 12px', color: '#e8edf5', fontSize: 13, outline: 'none' }} />
              </div>
              {showDoneModal.note && (
                <div style={{ background: '#0a1520', border: '1px solid #1e3a5a', borderRadius: 6, padding: '8px 12px', fontSize: 11, color: '#5a9adb', marginBottom: 12 }}>
                  💡 {showDoneModal.note}
                </div>
              )}
            </div>
            <div style={{ padding: '10px 18px', background: '#070f18', borderTop: '1px solid #1e3a5a', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowDoneModal(null)} style={{ padding: '7px 16px', background: 'transparent', border: '1px solid #2a4a6a', borderRadius: 6, color: '#5a9adb', cursor: 'pointer', fontSize: 12 }}>Annulla</button>
              <button onClick={markDone} style={{ padding: '7px 18px', background: '#1a7a1a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>✓ Conferma Eseguito</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>🗓️ Piano Manutenzione OEM</h2>
          <div style={{ fontSize: 12, color: '#4a7aaa', marginTop: 3 }}>
            {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Nessun veicolo selezionato'} · Scadenze per km e mesi
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {editKm ? (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input value={currentKm} onChange={e => setCurrentKm(parseInt(e.target.value)||0)} type="number"
                style={{ width: 120, background: '#070f18', border: '1px solid #2a6a2a', borderRadius: 6, padding: '7px 10px', color: '#4aaa4a', fontSize: 13, outline: 'none' }} />
              <button onClick={() => { setEditKm(false); showToast(`✅ Km aggiornati: ${currentKm.toLocaleString('it-IT')}`, 'ok') }}
                style={{ background: '#1a7a1a', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>✓</button>
            </div>
          ) : (
            <div onClick={() => setEditKm(true)} style={{ background: '#0d1e30', border: '1px solid #2a4a6a', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13 }}>
              <span style={{ color: '#4a7aaa' }}>Km attuali: </span>
              <span style={{ color: '#f0a000', fontWeight: 700 }}>{currentKm.toLocaleString('it-IT')}</span>
              <span style={{ color: '#3a6a9a', fontSize: 11, marginLeft: 6 }}>✏️</span>
            </div>
          )}
        </div>
      </div>

      {/* KPI bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { val: overdueCount, label: 'Scaduti', color: '#cc2222', bg: '#1a0505' },
          { val: dueSoonCount, label: 'In Scadenza', color: '#f0a000', bg: '#1a1200' },
          { val: records.filter(r => getStatus(r) === 'ok').length, label: 'In Regola', color: '#4aaa4a', bg: '#051505' },
          { val: records.filter(r => getStatus(r) === 'unknown').length, label: 'Da Registrare', color: '#5a9adb', bg: '#051a2a' },
        ].map(k => (
          <div key={k.label} style={{ background: k.bg, border: `1px solid ${k.color}44`, borderRadius: 8, padding: '12px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: k.color }}>{k.val}</div>
            <div style={{ fontSize: 10, color: k.color, opacity: 0.7, marginTop: 3 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {[['all','Tutti'], ['due','⚠️ Da fare'], ['engine','Motore'], ['brakes','Freni'], ['transmission','Trasmissione'], ['electrical','Elettrico'], ['ac','Clima'], ['tires','Pneumatici']].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #2a4a6a', background: filter === v ? '#1a4a8a' : 'transparent', color: filter === v ? '#fff' : '#5a9adb', cursor: 'pointer', fontSize: 11 }}>{l}</button>
        ))}
      </div>

      {/* Maintenance items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(r => {
          const status = getStatus(r)
          const st = STATUS_STYLE[status]
          const progress = getProgress(r)

          let nextKmText = '', nextDateText = ''
          if (r.lastKm && r.km) {
            const next = r.lastKm + r.km
            const left = next - currentKm
            nextKmText = left < 0 ? `Scaduto di ${Math.abs(left).toLocaleString('it-IT')} km` : `Tra ${left.toLocaleString('it-IT')} km (@ ${next.toLocaleString('it-IT')} km)`
          } else if (r.km) {
            nextKmText = `Ogni ${r.km.toLocaleString('it-IT')} km`
          }
          if (r.lastDate && r.months) {
            const next = new Date(r.lastDate)
            next.setMonth(next.getMonth() + r.months)
            const daysLeft = Math.floor((next - new Date()) / (1000*60*60*24))
            nextDateText = daysLeft < 0 ? `Scaduto da ${Math.abs(daysLeft)} giorni` : `Tra ${daysLeft} giorni (${next.toLocaleDateString('it-IT')})`
          } else if (r.months) {
            nextDateText = `Ogni ${r.months} mesi`
          }

          return (
            <div key={r.id} style={{ background: st.bg, border: `1px solid ${st.border}`, borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ fontSize: 26, flexShrink: 0 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{r.name}</div>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: `${st.dot}22`, color: st.dot, border: `1px solid ${st.dot}44` }}>{st.label}</span>
                  <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 8, background: `${CAT_COLORS[r.cat] || '#1a3a6a'}44`, color: '#7ab4de', border: `1px solid ${CAT_COLORS[r.cat] || '#1a3a6a'}88` }}>{r.cat}</span>
                  {r.cost > 0 && <span style={{ fontSize: 9, color: '#f0a000', marginLeft: 'auto' }}>~€ {r.cost}</span>}
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#5a8aaa', marginBottom: 8, flexWrap: 'wrap' }}>
                  {nextKmText && <span>📍 {nextKmText}</span>}
                  {nextDateText && <span>📅 {nextDateText}</span>}
                  {r.lastDate && <span style={{ color: '#3a6a9a' }}>Ultimo: {new Date(r.lastDate).toLocaleDateString('it-IT')}</span>}
                </div>
                {/* Progress bar */}
                <div style={{ background: '#0a1520', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{ height: 6, borderRadius: 4, width: `${progress}%`, background: progress > 90 ? '#cc2222' : progress > 75 ? '#f0a000' : '#1a7a1a', transition: 'width .4s' }} />
                </div>
                {r.note && <div style={{ fontSize: 10, color: '#3a6a9a', marginTop: 6, fontStyle: 'italic' }}>💡 {r.note}</div>}
              </div>
              <button onClick={() => { setShowDoneModal(r); setDoneKm(String(currentKm)) }}
                style={{ flexShrink: 0, background: status === 'overdue' ? '#3a0000' : '#0d2a0d', border: `1px solid ${status === 'overdue' ? '#cc2222' : '#2a6a2a'}`, borderRadius: 7, padding: '8px 14px', color: status === 'overdue' ? '#ff6666' : '#4aaa4a', cursor: 'pointer', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
                ✓ Fatto
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
