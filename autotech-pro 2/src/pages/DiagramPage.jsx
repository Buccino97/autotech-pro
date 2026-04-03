import React, { useState } from 'react'

const DIAGRAMS = {
  engine: {
    title: 'Schema Elettrico — Controllo Motore (Engine Management)',
    svg: `<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#070f18;">
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#3a70c8"/></marker></defs>
      <text x="380" y="20" textAnchor="middle" fill="#3a6a9a" fontSize="10" fontFamily="Arial">ALLDATA® Schema Semplificato — Pagina 1/6</text>
      <!-- ECU -->
      <rect x="290" y="155" width="180" height="100" rx="6" fill="#0d1e3a" stroke="#3a70c8" strokeWidth="2"/>
      <text x="380" y="195" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">ECU MOTORE</text>
      <text x="380" y="212" textAnchor="middle" fill="#5a9adb" fontSize="9" fontFamily="Arial">80 Pin · CAN-Bus · ISO 15765</text>
      <text x="380" y="228" textAnchor="middle" fill="#3a5a8a" fontSize="8" fontFamily="Arial">SAE J1979 · K-Line · UDS</text>
      <!-- Sensors L -->
      <g><rect x="20" y="30" width="120" height="40" rx="4" fill="#0a1830" stroke="#2a5a9a" strokeWidth="1.5"/><text x="80" y="46" textAnchor="middle" fill="#7ab4de" fontSize="9" fontFamily="Arial" fontWeight="bold">SENSORE MAP/MAF</text><text x="80" y="60" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">5V Ref · Segnale · GND</text></g>
      <g><rect x="20" y="90" width="120" height="40" rx="4" fill="#0a1830" stroke="#2a5a9a" strokeWidth="1.5"/><text x="80" y="106" textAnchor="middle" fill="#7ab4de" fontSize="9" fontFamily="Arial" fontWeight="bold">SONDA LAMBDA O₂</text><text x="80" y="120" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">Pre-cat · 0–1V osc.</text></g>
      <g><rect x="20" y="150" width="120" height="40" rx="4" fill="#0a1830" stroke="#2a5a9a" strokeWidth="1.5"/><text x="80" y="166" textAnchor="middle" fill="#7ab4de" fontSize="9" fontFamily="Arial" fontWeight="bold">TPS FARFALLA</text><text x="80" y="180" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">0,5–4,5V lineare</text></g>
      <g><rect x="20" y="210" width="120" height="40" rx="4" fill="#0a1830" stroke="#2a5a9a" strokeWidth="1.5"/><text x="80" y="226" textAnchor="middle" fill="#7ab4de" fontSize="9" fontFamily="Arial" fontWeight="bold">SENSORE CKP/CMP</text><text x="80" y="240" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">Hall · 48 imp/giro</text></g>
      <g><rect x="20" y="270" width="120" height="40" rx="4" fill="#1a1200" stroke="#6a5000" strokeWidth="1.5"/><text x="80" y="286" textAnchor="middle" fill="#c8a000" fontSize="9" fontFamily="Arial" fontWeight="bold">SENSORE KNOCK</text><text x="80" y="300" textAnchor="middle" fill="#7a6000" fontSize="8" fontFamily="Arial">Piezoelettrico</text></g>
      <g><rect x="20" y="330" width="120" height="40" rx="4" fill="#0a1830" stroke="#2a5a9a" strokeWidth="1.5"/><text x="80" y="346" textAnchor="middle" fill="#7ab4de" fontSize="9" fontFamily="Arial" fontWeight="bold">SENSORE ECT</text><text x="80" y="360" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">NTC 10kΩ temp. liquido</text></g>
      <!-- Outputs R -->
      <g><rect x="620" y="30" width="120" height="40" rx="4" fill="#1a0808" stroke="#6a2020" strokeWidth="1.5"/><text x="680" y="46" textAnchor="middle" fill="#de7a7a" fontSize="9" fontFamily="Arial" fontWeight="bold">INIETTORI GDI ×4</text><text x="680" y="60" textAnchor="middle" fill="#7a4a4a" fontSize="8" fontFamily="Arial">PWM 150µs–4ms</text></g>
      <g><rect x="620" y="90" width="120" height="40" rx="4" fill="#1a0808" stroke="#6a2020" strokeWidth="1.5"/><text x="680" y="106" textAnchor="middle" fill="#de7a7a" fontSize="9" fontFamily="Arial" fontWeight="bold">BOBINE IGN. ×4</text><text x="680" y="120" textAnchor="middle" fill="#7a4a4a" fontSize="8" fontFamily="Arial">DIS/COP canali</text></g>
      <g><rect x="620" y="150" width="120" height="40" rx="4" fill="#081a08" stroke="#206a20" strokeWidth="1.5"/><text x="680" y="166" textAnchor="middle" fill="#7ade7a" fontSize="9" fontFamily="Arial" fontWeight="bold">SOLENOIDE EGR</text><text x="680" y="180" textAnchor="middle" fill="#4a7a4a" fontSize="8" fontFamily="Arial">PWM riciclo gas</text></g>
      <g><rect x="620" y="210" width="120" height="40" rx="4" fill="#1a1000" stroke="#6a5000" strokeWidth="1.5"/><text x="680" y="226" textAnchor="middle" fill="#dea000" fontSize="9" fontFamily="Arial" fontWeight="bold">FARFALLA ETC</text><text x="680" y="240" textAnchor="middle" fill="#7a6000" fontSize="8" fontFamily="Arial">Drive-by-wire</text></g>
      <g><rect x="620" y="270" width="120" height="40" rx="4" fill="#081a08" stroke="#206a20" strokeWidth="1.5"/><text x="680" y="286" textAnchor="middle" fill="#7ade7a" fontSize="9" fontFamily="Arial" fontWeight="bold">SOLENOIDE VVT</text><text x="680" y="300" textAnchor="middle" fill="#4a7a4a" fontSize="8" fontFamily="Arial">Fasatura variabile</text></g>
      <g><rect x="620" y="330" width="120" height="40" rx="4" fill="#0a1830" stroke="#2a5a9a" strokeWidth="1.5"/><text x="680" y="346" textAnchor="middle" fill="#7ab4de" fontSize="9" fontFamily="Arial" fontWeight="bold">CAN BUS HL/LL</text><text x="680" y="360" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">TCU·ABS·BCM·KFZ</text></g>
      <!-- Wires -->
      <line x1="140" y1="50" x2="290" y2="180" stroke="#3a70c8" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <line x1="140" y1="110" x2="290" y2="188" stroke="#3a70c8" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <line x1="140" y1="170" x2="290" y2="197" stroke="#3a70c8" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <line x1="140" y1="230" x2="290" y2="205" stroke="#3a70c8" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <line x1="140" y1="290" x2="290" y2="214" stroke="#c8a000" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <line x1="140" y1="350" x2="290" y2="222" stroke="#3a70c8" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <line x1="470" y1="180" x2="620" y2="50" stroke="#cc3333" strokeWidth="1.5"/>
      <line x1="470" y1="188" x2="620" y2="110" stroke="#cc3333" strokeWidth="1.5"/>
      <line x1="470" y1="197" x2="620" y2="170" stroke="#33aa33" strokeWidth="1.5"/>
      <line x1="470" y1="205" x2="620" y2="230" stroke="#c8a000" strokeWidth="1.5"/>
      <line x1="470" y1="214" x2="620" y2="290" stroke="#33aa33" strokeWidth="1.5"/>
      <line x1="470" y1="222" x2="620" y2="350" stroke="#3a70c8" strokeWidth="1.5"/>
      <!-- Power -->
      <rect x="300" y="15" width="160" height="28" rx="4" fill="#3a2800" stroke="#8a6000" strokeWidth="1.5"/>
      <text x="380" y="27" textAnchor="middle" fill="#f0a000" fontSize="9" fontFamily="Arial" fontWeight="bold">+12V BATTERIA — FUSIBILE F23 15A</text>
      <text x="380" y="39" textAnchor="middle" fill="#7a5000" fontSize="8" fontFamily="Arial">via BCM centralina fusibili motore</text>
      <line x1="380" y1="43" x2="380" y2="155" stroke="#f0a000" strokeWidth="2"/>
      <!-- GND -->
      <line x1="30" y1="395" x2="730" y2="395" stroke="#5a5a5a" strokeWidth="3"/>
      <text x="380" y="412" textAnchor="middle" fill="#4a4a4a" fontSize="9" fontFamily="Arial">▼ MASSA MOTORE / CARROZZERIA (GND) — Resistenza &lt; 0,5 Ω</text>
    </svg>`
  },
  charge: {
    title: 'Schema Elettrico — Carica e Avviamento',
    svg: `<svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#070f18;">
      <text x="380" y="20" textAnchor="middle" fill="#3a6a9a" fontSize="10" fontFamily="Arial">ALLDATA® Schema Carica/Avviamento — Pagina 2/6</text>
      <!-- Battery -->
      <rect x="30" y="130" width="120" height="75" rx="5" fill="#0f0f0f" stroke="#3a3a3a" strokeWidth="2"/>
      <text x="90" y="158" textAnchor="middle" fill="#f0a000" fontSize="12" fontFamily="Arial" fontWeight="bold">BATTERIA</text>
      <text x="90" y="173" textAnchor="middle" fill="#666" fontSize="9" fontFamily="Arial">12V / 72Ah AGM</text>
      <text x="90" y="186" textAnchor="middle" fill="#444" fontSize="8" fontFamily="Arial">CCA: 680A · SOH test</text>
      <rect x="40" y="118" width="24" height="14" rx="2" fill="#882222"/><text x="52" y="129" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">+</text>
      <rect x="106" y="118" width="24" height="14" rx="2" fill="#222"/><text x="118" y="129" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">−</text>
      <!-- Fuse Box -->
      <rect x="260" y="55" width="240" height="90" rx="4" fill="#111" stroke="#3a3a3a" strokeWidth="1.5"/>
      <text x="380" y="78" textAnchor="middle" fill="#8ab4de" fontSize="11" fontFamily="Arial" fontWeight="bold">CENTRALINA FUSIBILI</text>
      <text x="315" y="98" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">F23 ECU 15A</text><text x="380" y="98" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">F12 Motor 40A</text><text x="445" y="98" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">F08 Alt 80A</text>
      <text x="315" y="115" textAnchor="middle" fill="#cc2222" fontSize="8" fontFamily="Arial">F01 Main 200A</text><text x="380" y="115" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">F15 IGN 20A</text><text x="445" y="115" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">F22 FAN 30A</text>
      <!-- Starter -->
      <ellipse cx="160" cy="280" rx="60" ry="45" fill="#0a1a0a" stroke="#2a6a2a" strokeWidth="2"/>
      <text x="160" y="275" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Arial" fontWeight="bold">MOTORINO</text>
      <text x="160" y="290" textAnchor="middle" fill="#7ade7a" fontSize="9" fontFamily="Arial">1,4 kW · 12V</text>
      <!-- Alternator -->
      <ellipse cx="590" cy="280" rx="65" ry="50" fill="#0a0a1a" stroke="#3a3aaa" strokeWidth="2"/>
      <text x="590" y="273" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Arial" fontWeight="bold">ALTERNATORE</text>
      <text x="590" y="287" textAnchor="middle" fill="#8a8ade" fontSize="10" fontFamily="Arial">14,4V · 120A</text>
      <text x="590" y="300" textAnchor="middle" fill="#4a4a8a" fontSize="8" fontFamily="Arial">Regolatore integrato</text>
      <!-- IGN -->
      <rect x="270" y="180" width="220" height="58" rx="4" fill="#1a1200" stroke="#8a6000" strokeWidth="1.5"/>
      <text x="380" y="205" textAnchor="middle" fill="#f0a000" fontSize="11" fontFamily="Arial" fontWeight="bold">CHIAVE / BCM</text>
      <text x="380" y="220" textAnchor="middle" fill="#8a6000" fontSize="9" fontFamily="Arial">ACC — ON — START (relay)</text>
      <text x="380" y="232" textAnchor="middle" fill="#4a3a00" fontSize="8" fontFamily="Arial">Smart Key / Push Button</text>
      <!-- Wires -->
      <line x1="52" y1="118" x2="52" y2="70" stroke="#cc2222" strokeWidth="3"/>
      <line x1="52" y1="70" x2="260" y2="70" stroke="#cc2222" strokeWidth="3"/>
      <line x1="500" y1="82" x2="730" y2="82" stroke="#cc2222" strokeWidth="3"/>
      <line x1="590" y1="230" x2="590" y2="82" stroke="#cc2222" strokeWidth="2"/>
      <line x1="160" y1="235" x2="160" y2="215" stroke="#33aa33" strokeWidth="2"/>
      <line x1="160" y1="215" x2="270" y2="205" stroke="#33aa33" strokeWidth="2"/>
      <line x1="118" y1="140" x2="118" y2="340" stroke="#555" strokeWidth="2.5" strokeDasharray="6,3"/>
      <line x1="118" y1="340" x2="730" y2="340" stroke="#555" strokeWidth="2.5"/>
      <text x="380" y="362" textAnchor="middle" fill="#3a3a3a" fontSize="9" fontFamily="Arial">▼ MASSA CARROZZERIA</text>
    </svg>`
  },
  abs: {
    title: 'Schema Elettrico — ABS / ESC (Controllo Stabilità)',
    svg: `<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#070f18;">
      <text x="380" y="20" textAnchor="middle" fill="#3a6a9a" fontSize="10" fontFamily="Arial">ALLDATA® Schema ABS/ESC — Pagina 3/6</text>
      <rect x="275" y="155" width="210" height="110" rx="6" fill="#1a0808" stroke="#aa2222" strokeWidth="2"/>
      <text x="380" y="195" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">ABS / ESC MODULO</text>
      <text x="380" y="212" textAnchor="middle" fill="#de8a8a" fontSize="9" fontFamily="Arial">Electronic Stability Control</text>
      <text x="380" y="227" textAnchor="middle" fill="#8a4a4a" fontSize="8" fontFamily="Arial">Bosch 9.3 iBooster · 48 Pin</text>
      <text x="380" y="247" textAnchor="middle" fill="#5a2a2a" fontSize="8" fontFamily="Arial">CAN-Bus Telaio · ISO 11898</text>
      <!-- Wheel sensors -->
      ${[['20','Ant. SX'],['90','Ant. DX'],['160','Post. SX'],['230','Post. DX']].map(([y,l]) => `
        <rect x="20" y="${y}" width="125" height="40" rx="3" fill="#0a1830" stroke="#2a5a9a" strokeWidth="1.5"/>
        <text x="82" y="${parseInt(y)+16}" textAnchor="middle" fill="#7ab4de" fontSize="9" fontFamily="Arial" fontWeight="bold">SENS. VEL. ${l}</text>
        <text x="82" y="${parseInt(y)+30}" textAnchor="middle" fill="#3a6a9a" fontSize="8" fontFamily="Arial">Hall · 0/+12V · 48 imp</text>
      `).join('')}
      <rect x="20" y="290" width="125" height="40" rx="3" fill="#1a1200" stroke="#6a5000" strokeWidth="1.5"/>
      <text x="82" y="306" textAnchor="middle" fill="#c8a000" fontSize="9" fontFamily="Arial" fontWeight="bold">SENS. ANGOLO STERZO</text>
      <text x="82" y="320" textAnchor="middle" fill="#7a6000" fontSize="8" fontFamily="Arial">±720° — CAN-Bus</text>
      <!-- Outputs -->
      <rect x="615" y="20" width="125" height="40" rx="3" fill="#1a0808" stroke="#6a2020" strokeWidth="1.5"/>
      <text x="677" y="36" textAnchor="middle" fill="#de7a7a" fontSize="9" fontFamily="Arial" fontWeight="bold">ELETTROV. INLET ×4</text>
      <text x="677" y="50" textAnchor="middle" fill="#7a4a4a" fontSize="8" fontFamily="Arial">ABS Inlet Valves</text>
      <rect x="615" y="80" width="125" height="40" rx="3" fill="#1a0808" stroke="#6a2020" strokeWidth="1.5"/>
      <text x="677" y="96" textAnchor="middle" fill="#de7a7a" fontSize="9" fontFamily="Arial" fontWeight="bold">ELETTROV. OUTLET ×4</text>
      <text x="677" y="110" textAnchor="middle" fill="#7a4a4a" fontSize="8" fontFamily="Arial">ABS Outlet Valves</text>
      <rect x="615" y="140" width="125" height="40" rx="3" fill="#1a0808" stroke="#6a2020" strokeWidth="1.5"/>
      <text x="677" y="156" textAnchor="middle" fill="#de7a7a" fontSize="9" fontFamily="Arial" fontWeight="bold">POMPA RITORNO</text>
      <text x="677" y="170" textAnchor="middle" fill="#7a4a4a" fontSize="8" fontFamily="Arial">Motore ritorno fluido</text>
      <rect x="615" y="200" width="125" height="40" rx="3" fill="#081a08" stroke="#206a20" strokeWidth="1.5"/>
      <text x="677" y="216" textAnchor="middle" fill="#7ade7a" fontSize="9" fontFamily="Arial" fontWeight="bold">SPIA ABS / ESC</text>
      <text x="677" y="230" textAnchor="middle" fill="#4a7a4a" fontSize="8" fontFamily="Arial">Cruscotto cluster</text>
      <rect x="615" y="260" width="125" height="40" rx="3" fill="#0a1830" stroke="#2a5a9a" strokeWidth="1.5"/>
      <text x="677" y="276" textAnchor="middle" fill="#7ab4de" fontSize="9" fontFamily="Arial" fontWeight="bold">CAN TELAIO</text>
      <text x="677" y="290" textAnchor="middle" fill="#3a6a9a" fontSize="8" fontFamily="Arial">ECU·SRS·EPS·BCM</text>
      <!-- Wires -->
      <line x1="145" y1="40" x2="275" y2="188" stroke="#3a70c8" strokeWidth="1.5"/>
      <line x1="145" y1="110" x2="275" y2="198" stroke="#3a70c8" strokeWidth="1.5"/>
      <line x1="145" y1="180" x2="275" y2="208" stroke="#3a70c8" strokeWidth="1.5" strokeDasharray="5,2"/>
      <line x1="145" y1="250" x2="275" y2="218" stroke="#3a70c8" strokeWidth="1.5" strokeDasharray="5,2"/>
      <line x1="145" y1="310" x2="275" y2="228" stroke="#c8a000" strokeWidth="1.5"/>
      <line x1="485" y1="188" x2="615" y2="40" stroke="#cc3333" strokeWidth="1.5"/>
      <line x1="485" y1="198" x2="615" y2="100" stroke="#cc3333" strokeWidth="1.5"/>
      <line x1="485" y1="208" x2="615" y2="160" stroke="#cc3333" strokeWidth="1.5"/>
      <line x1="485" y1="218" x2="615" y2="220" stroke="#33aa33" strokeWidth="1.5"/>
      <line x1="485" y1="228" x2="615" y2="280" stroke="#3a70c8" strokeWidth="1.5"/>
      <line x1="30" y1="385" x2="730" y2="385" stroke="#555" strokeWidth="3"/>
      <text x="380" y="405" textAnchor="middle" fill="#3a3a3a" fontSize="9" fontFamily="Arial">▼ MASSA TELAIO — ABS/ESC Ground</text>
    </svg>`
  }
}

export default function DiagramPage({ vehicle, showVehicleModal, showToast }) {
  const [active, setActive] = useState(null)

  const load = (id) => {
    if (!vehicle) { showVehicleModal(); showToast('⚠️ Seleziona prima un veicolo', 'warn'); return }
    setActive(id)
    showToast(`⚡ Schema caricato: ${DIAGRAMS[id]?.title.split('—')[0].trim()}`, 'ok')
  }

  const btns = [
    { id: 'engine', label: '🔌 Controllo Motore' },
    { id: 'charge', label: '🔋 Carica/Avviam.' },
    { id: 'abs', label: '🛑 ABS/ESC' },
    { id: 'body', label: '🚪 BCM Carrozzeria' },
    { id: 'ac', label: '❄️ Clima HVAC' },
  ]

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>⚡ Schemi Elettrici Interattivi</h2>
      <div style={{ fontSize: 12, color: '#4a7aaa', marginBottom: 16 }}>300.000+ diagrammi OEM a colori · Localizzazione connettori</div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        {btns.map(b => (
          <button key={b.id} onClick={() => load(b.id)}
            style={{ padding: '8px 16px', borderRadius: 7, border: '1px solid #2a4a6a', background: active === b.id ? '#1a4a8a' : '#0d1e30', color: active === b.id ? '#fff' : '#5a9adb', cursor: 'pointer', fontSize: 12, fontWeight: active === b.id ? 700 : 400 }}>
            {b.label}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, fontSize: 10, color: '#3a6a9a', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 20, height: 3, background: '#cc2222', display: 'inline-block', borderRadius: 2 }}/>+12V</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 20, height: 3, background: '#555', display: 'inline-block', borderRadius: 2 }}/>GND</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 20, height: 3, background: '#3a70c8', display: 'inline-block', borderRadius: 2 }}/>Segnale</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 20, height: 3, background: '#33aa33', display: 'inline-block', borderRadius: 2 }}/>Attuatori</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 20, height: 3, background: '#c8a000', display: 'inline-block', borderRadius: 2 }}/>CAN/Dati</span>
        </div>
      </div>

      {/* Diagram area */}
      <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 10, overflow: 'hidden' }}>
        {active && DIAGRAMS[active] ? (
          <>
            <div style={{ background: '#0a1520', padding: '10px 16px', borderBottom: '1px solid #1e3a5a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#5a9adb' }}>{DIAGRAMS[active].title}</div>
              {vehicle && <div style={{ fontSize: 11, color: '#4a7aaa' }}>{vehicle.year} {vehicle.make} {vehicle.model}</div>}
            </div>
            <div style={{ padding: 16, overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: DIAGRAMS[active].svg }} />
          </>
        ) : (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>⚡</div>
            <div style={{ color: '#3a6a9a', fontSize: 14 }}>
              {vehicle ? 'Seleziona uno schema dal menu sopra' : 'Seleziona prima un veicolo, poi scegli uno schema'}
            </div>
            {!vehicle && <button onClick={showVehicleModal} style={{ marginTop: 14, background: '#f0a000', color: '#000', border: 'none', borderRadius: 8, padding: '9px 22px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>🚗 Seleziona Veicolo</button>}
          </div>
        )}
      </div>
    </div>
  )
}
