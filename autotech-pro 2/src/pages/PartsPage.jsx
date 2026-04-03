// PartsPage.jsx
import React, { useState } from 'react'

const PARTS = [
  { code:'04465-12290', desc:'Kit pastiglie freno anteriori OEM', cat:'brakes', brand:'Toyota OEM', price:78, stock:8 },
  { code:'43512-02270', desc:'Disco freno anteriore ventilato (singolo)', cat:'brakes', brand:'Toyota OEM', price:95, stock:4 },
  { code:'13440-0T010', desc:'Cinghia di distribuzione (kit completo)', cat:'engine', brand:'Toyota OEM', price:145, stock:2 },
  { code:'16271-0T010', desc:'Tenditore automatico distribuzione', cat:'engine', brand:'Toyota OEM', price:58, stock:6 },
  { code:'04100-0H010', desc:'Kit tagliando motore (olio + filtri)', cat:'filters', brand:'Toyota OEM', price:42, stock:12 },
  { code:'87139-0E040', desc:'Filtro abitacolo carboni attivi', cat:'filters', brand:'Toyota OEM', price:22, stock:10 },
  { code:'28500-0W530', desc:'Alternatore 120A ricondizionato', cat:'electrical', brand:'Valeo', price:195, stock:3 },
  { code:'28100-0H030', desc:'Motorino avviamento 1.4 kW', cat:'electrical', brand:'Toyota OEM', price:260, stock:1 },
  { code:'48520-0R010', desc:'Ammortizzatore anteriore SX gas', cat:'suspension', brand:'KYB Excel-G', price:88, stock:5 },
  { code:'48521-0R010', desc:'Ammortizzatore anteriore DX gas', cat:'suspension', brand:'KYB Excel-G', price:88, stock:5 },
  { code:'23220-0T040', desc:'Pompa carburante alta pressione GDI', cat:'engine', brand:'Denso OEM', price:340, stock:0 },
  { code:'88320-0R130', desc:'Compressore A/C ricondizionato', cat:'ac', brand:'Denso', price:285, stock:2 },
  { code:'04231-20030', desc:'Fluido freni DOT 4 LV 500ml', cat:'filters', brand:'Toyota OEM', price:12.50, stock:20 },
  { code:'08889-80830', desc:'Olio motore 0W-20 SN/GF-5 4L', cat:'filters', brand:'Toyota Genuine', price:35, stock:15 },
  { code:'39900-52060', desc:'Centralina sterzo EPS ricondizionata', cat:'electrical', brand:'JTEKT OEM', price:480, stock:1 },
  { code:'90915-YZZD3', desc:'Filtro olio motore', cat:'filters', brand:'Toyota OEM', price:8.50, stock:25 },
  { code:'48680-60030', desc:'Braccio sospensione anteriore SX', cat:'suspension', brand:'Toyota OEM', price:185, stock:3 },
  { code:'48654-60050', desc:'Silent block braccio inferiore', cat:'suspension', brand:'Lemforder', price:45, stock:8 },
  { code:'04311-0D090', desc:'Kit frizione completo', cat:'engine', brand:'Sachs', price:320, stock:2 },
  { code:'88919-06030', desc:'Gas refrigerante R1234yf (750g)', cat:'ac', brand:'Honeywell', price:65, stock:6 },
]

const CATS = ['all','engine','brakes','filters','electrical','suspension','ac']
const CAT_LABELS = { all:'Tutti', engine:'Motore', brakes:'Freni', filters:'Filtri', electrical:'Elettrico', suspension:'Sospensioni', ac:'Clima' }

export default function PartsPage({ showToast }) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')
  const [cart, setCart] = useState([])

  const filtered = PARTS.filter(p =>
    (cat === 'all' || p.cat === cat) &&
    (!search || (p.desc + p.code + p.brand).toLowerCase().includes(search.toLowerCase()))
  )

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(c => c.code === p.code)
      if (ex) return prev.map(c => c.code === p.code ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...p, qty: 1 }]
    })
    showToast(`✅ "${p.desc.substring(0,30)}..." aggiunto all'ordine`, 'ok')
  }

  const cartTotal = cart.reduce((a, c) => a + c.price * c.qty, 0)

  const stockColor = (n) => n === 0 ? '#cc2222' : n <= 2 ? '#a07000' : '#1a7a1a'
  const stockLabel = (n) => n === 0 ? '✗ Esaurito' : n <= 2 ? `⚠️ ${n} pz` : `✓ ${n} pz`

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>🔩 Catalogo Ricambi</h2>
          <div style={{ fontSize: 12, color: '#4a7aaa', marginBottom: 16 }}>{PARTS.length} ricambi OEM e aftermarket</div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cerca codice OEM, descrizione, marca..."
              style={{ flex: 1, minWidth: 220, background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 6, padding: '7px 12px', color: '#e8edf5', fontSize: 12, outline: 'none' }} />
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ padding: '7px 14px', borderRadius: 6, border: '1px solid #2a4a6a', background: cat === c ? '#1a4a8a' : 'transparent', color: cat === c ? '#fff' : '#5a9adb', cursor: 'pointer', fontSize: 12 }}>{CAT_LABELS[c]}</button>
            ))}
          </div>

          <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#0a1520' }}>
                  {['Codice OEM','Descrizione','Marca','Prezzo','Giacenza',''].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 10, color: '#5a9adb', fontWeight: 700, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.code} style={{ borderTop: '1px solid #1e3a5a' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#111c27'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '9px 12px', fontFamily: 'monospace', color: '#5a9adb', fontSize: 11 }}>{p.code}</td>
                    <td style={{ padding: '9px 12px', color: '#c8d8e8' }}>{p.desc}</td>
                    <td style={{ padding: '9px 12px', color: '#7a9aaa', fontSize: 11 }}>{p.brand}</td>
                    <td style={{ padding: '9px 12px', fontWeight: 700, color: '#f0a000' }}>€ {p.price.toLocaleString('it-IT')}</td>
                    <td style={{ padding: '9px 12px', fontWeight: 700, color: stockColor(p.stock), fontSize: 11 }}>{stockLabel(p.stock)}</td>
                    <td style={{ padding: '9px 12px' }}>
                      <button onClick={() => addToCart(p)} disabled={p.stock === 0}
                        style={{ padding: '5px 12px', background: p.stock > 0 ? '#1a4a8a' : '#1a1a1a', color: p.stock > 0 ? '#fff' : '#444', border: 'none', borderRadius: 5, cursor: p.stock > 0 ? 'pointer' : 'default', fontSize: 11 }}>
                        + Ordine
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart */}
        {cart.length > 0 && (
          <div style={{ width: 260, flexShrink: 0, background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 10, padding: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#5a9adb', marginBottom: 12 }}>🛒 Ordine ({cart.length})</h3>
            {cart.map(c => (
              <div key={c.code} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11, color: '#8ab8de' }}>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.desc.substring(0, 22)}...</span>
                <span style={{ color: '#f0a000', marginLeft: 8 }}>x{c.qty}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #1e3a5a', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
              <span style={{ color: '#8ab8de' }}>Totale</span>
              <span style={{ color: '#f0a000' }}>€ {cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={() => { showToast('✅ Ordine ricambi inviato al fornitore', 'ok'); setCart([]) }} style={{ width: '100%', marginTop: 12, background: '#f0a000', color: '#000', border: 'none', borderRadius: 6, padding: '9px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
              📦 Conferma Ordine
            </button>
            <button onClick={() => setCart([])} style={{ width: '100%', marginTop: 6, background: 'transparent', border: '1px solid #2a4a6a', borderRadius: 6, padding: '7px', cursor: 'pointer', fontSize: 11, color: '#5a9adb' }}>
              Svuota
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
