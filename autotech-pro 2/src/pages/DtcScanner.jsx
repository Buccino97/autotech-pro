import React, { useState } from 'react'

const DTC_DB = {
  'P0300':{ d:'Mancata accensione casuale — cilindro multiplo', s:'alta', sys:'Accensione', c:'Candele esaurite, bobine difettose, iniettori, bassa compressione', t:'1. Freeze frame: rpm e carico al guasto\n2. Scambia bobine: DTC segue la bobina?\n3. Compressione cilindri: min 10 bar, diff. max 1 bar', sol:'Sostituire candele. Se persiste: bobine. Se compressione bassa: testata.' },
  'P0301':{ d:'Mancata accensione — Cilindro 1', s:'alta', sys:'Accensione', c:'Candela N.1, bobina N.1, iniettore N.1', t:'Spostare bobina cil.1→cil.2: se DTC diventa P0302, bobina difettosa.', sol:'Sostituire bobina o candela identificata.' },
  'P0302':{ d:'Mancata accensione — Cilindro 2', s:'alta', sys:'Accensione', c:'Candela, bobina o iniettore cilindro 2', t:'Stessa procedura P0301 applicata al cilindro 2', sol:'Sostituire componente difettoso.' },
  'P0303':{ d:'Mancata accensione — Cilindro 3', s:'alta', sys:'Accensione', c:'Candela, bobina o iniettore cilindro 3', t:'Stessa procedura P0301 applicata al cilindro 3', sol:'Sostituire componente difettoso.' },
  'P0304':{ d:'Mancata accensione — Cilindro 4', s:'alta', sys:'Accensione', c:'Candela, bobina o iniettore cilindro 4', t:'Stessa procedura P0301 applicata al cilindro 4', sol:'Sostituire componente difettoso.' },
  'P0420':{ d:'Efficienza catalizzatore sotto soglia — Banco 1', s:'media', sys:'Emissioni', c:'Catalizzatore esaurito, sonda lambda difettosa, perdite scarico', t:'1. Segnale sonda post-cat: deve essere stabile ~0,6-0,8V\n2. Verificare aggiornamento ECU (falsi positivi noti)\n3. Temperatura pre/post-cat: +10-15% con pirometro', sol:'Prima verificare TSB aggiornamento ECU. Se cat esaurito: sostituzione.' },
  'P0171':{ d:'Sistema carburante troppo magro — Banco 1', s:'media', sys:'Carburante', c:'Perdita aria aspirazione, MAF sporco, pompa debole, iniettori', t:'1. Ispezione tubi aspirazione (crepe)\n2. Pulizia MAF con spray\n3. LTFT >+10%: confermato lean\n4. Pressione carburante: 3,0-3,5 bar', sol:'Cercare perdite d\'aria. Pulire MAF. Test iniettori.' },
  'P0172':{ d:'Sistema carburante troppo ricco — Banco 1', s:'media', sys:'Carburante', c:'Sonda lambda difettosa, iniettori che perdono, MAP difettoso', t:'1. Test sonda lambda: oscillazione 0-1V a 1Hz?\n2. Pressione carburante\n3. Dati live MAP e TPS', sol:'Sostituire sonda lambda. Verificare iniettori.' },
  'P0087':{ d:'Pressione carburante nel rail troppo bassa', s:'alta', sys:'Carburante', c:'Pompa debole, filtro intasato, regolatore difettoso', t:'1. Manometro al rail: riposo 3,5 bar, motore 3,0 bar\n2. Key-off 5 min: non scendere sotto 2,5 bar\n3. Amperaggio pompa >8A: filtro intasato', sol:'Sostituire filtro carburante. Se persiste: pompa.' },
  'P0562':{ d:'Tensione sistema batteria bassa', s:'media', sys:'Elettrico', c:'Batteria scarica, alternatore difettoso, consumo parassita', t:'1. CCA e SOH batteria\n2. Tensione carica: 13,8-14,4V a 2000 rpm\n3. Corrente parassita a riposo: <50 mA', sol:'Ricaricare/sostituire batteria. Testare alternatore.' },
  'P0101':{ d:'Sensore MAF — Segnale fuori range', s:'media', sys:'Sensori', c:'MAF sporco, perdita aria, farfalla sporca', t:'Lettura live MAF: minimo 2-4 g/s, 2500 rpm ~18-22 g/s', sol:'Pulizia MAF. Verificare manicotto aspirazione.' },
  'P0128':{ d:'Temperatura liquido sotto soglia termostato', s:'bassa', sys:'Raffreddamento', c:'Termostato bloccato aperto, sensore ECT', t:'Monitorare tempo raggiungimento 80°C: normale <10 min', sol:'Sostituire termostato.' },
  'P0505':{ d:'Sistema controllo minimo (IAC) — Malfunzionamento', s:'bassa', sys:'Minimo', c:'Corpo farfalla sporco, valvola IAC', t:'Pulizia corpo farfalla. Target minimo: 700-800 rpm', sol:'Pulizia corpo farfalla e reset adattamento.' },
  'P0401':{ d:'Flusso EGR insufficiente', s:'media', sys:'EGR', c:'Valvola EGR bloccata chiusa o incrostata', t:'Test attuazione EGR con scanner. Ispezione canali.', sol:'Pulizia valvola EGR. Se bloccata: sostituzione.' },
  'P2002':{ d:'Efficienza DPF/FAP sotto soglia — Banco 1', s:'alta', sys:'DPF', c:'DPF intasato, rigenerazioni insufficienti', t:'Pressione differenziale DPF: >50 mbar = intasato\nLettura % soot load con scanner', sol:'Rigenerazione forzata. Se fallisce: pulizia/sostituzione DPF.' },
  'P0016':{ d:'Correlazione CKP/CMP — Banco 1 fuori fase', s:'alta', sys:'Fasatura', c:'Catena distribuzione allentata, tenditore usato, solenoide VVT', t:'Segnali CKP e CMP con oscilloscopio. Rumorosità catena a freddo.', sol:'Sostituzione kit distribuzione (catena + tenditore + guide).' },
  'C0034':{ d:'Sensore velocità ruota — Anteriore sinistra', s:'alta', sys:'ABS/ESC', c:'Sensore ABS sporco, anello dentato rotto, cablaggio', t:'Oscilloscopio: onda sinusoidale durante rotazione\nResistenza sensore: 1-2 kΩ', sol:'Pulizia sensore. Se assente: sostituzione.' },
  'C0031':{ d:'Sensore velocità ruota — Anteriore destra', s:'alta', sys:'ABS/ESC', c:'Sensore ABS, cablaggio, anello dentato', t:'Stessa procedura C0034 ruota destra', sol:'Pulizia o sostituzione sensore ABS.' },
  'B0001':{ d:'Circuito airbag lato guida — Resistenza anomala', s:'critica', sys:'SRS Airbag', c:'Clock spring difettosa, connettore allentato, modulo SRS', t:'⚠️ NON misurare circuiti SRS manualmente!\nSolo con strumento SRS certificato.', sol:'Controllare clock spring. Officina specializzata SRS.' },
  'U0100':{ d:'Comunicazione persa con ECM/PCM — CAN Bus', s:'alta', sys:'Network CAN', c:'ECU non alimentata, cortocircuito CAN, fusibili', t:'1. Fusibili ECU\n2. Resistenza CAN H-L: ~60Ω\n3. Alimentazione ECU: +12V e GND', sol:'Ripristinare alimentazione ECU. Ricerca guasto CAN bus.' },
  'U0101':{ d:'Comunicazione persa con TCM (Trasmissione)', s:'alta', sys:'Network CAN', c:'TCU non alimentata, guasto TCU', t:'Verifica alimentazione TCU. Lettura codici TCU.', sol:'Ripristinare alimentazione. Sostituzione TCU.' },
  'P0010':{ d:'Solenoide VVT — Albero camme A Banco 1', s:'bassa', sys:'VVT', c:'Solenoide bloccato, olio sporco, pressione olio bassa', t:'1. Qualità e livello olio\n2. Resistenza solenoide: 7-15Ω', sol:'Cambio olio. Se persiste: sostituzione solenoide VVT.' },
  'P0520':{ d:'Sensore pressione olio — Malfunzionamento', s:'critica', sys:'Lubrificazione', c:'Olio sotto livello, sensore difettoso, pompa olio', t:'⚠️ SPEGNERE MOTORE!\nVerificare livello olio SUBITO.\nTest pressione meccanico: min 1,5 bar al minimo', sol:'Se pressione bassa: NON avviare — rischio danni gravi.' },
}

const SEVERITY_COLOR = { critica: '#cc2222', alta: '#cc4400', media: '#a07000', bassa: '#1a7a1a' }

export default function DtcScanner({ vehicle, showToast }) {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiAnswer, setAiAnswer] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [filterCat, setFilterCat] = useState('all')

  const lookup = () => {
    const c = code.trim().toUpperCase()
    if (!c) return
    const d = DTC_DB[c]
    if (d) { setResult({ code: c, ...d }); setAiAnswer('') }
    else {
      const partial = Object.keys(DTC_DB).filter(k => k.startsWith(c.substring(0, 3)))
      setResult({ code: c, notFound: true, partial })
    }
  }

  const askAI = async () => {
    if (!result && !symptoms) return
    setAiLoading(true)
    setAiAnswer('')
    try {
      const prompt = result && !result.notFound
        ? `Sono un meccanico. Il veicolo ${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.engine}` : 'non specificato'} mostra il codice DTC ${result.code}: "${result.d}". Causa probabile: ${result.c}. Fornisci una diagnosi tecnica approfondita e procedura di test specifica per questo veicolo, con valori e misurazioni attesi. Rispondi in italiano, in modo tecnico e pratico.`
        : `Sono un meccanico. Il mio veicolo ${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.engine}` : ''} presenta questi sintomi: "${symptoms}". Quali codici DTC potrei trovare? Qual è la diagnosi più probabile e cosa verificare per primo? Rispondi in italiano in modo tecnico.`
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] })
      })
      const data = await res.json()
      setAiAnswer(data.content?.[0]?.text || 'Risposta non disponibile')
    } catch (e) {
      setAiAnswer('Errore connessione AI. Verifica la connessione internet.')
    }
    setAiLoading(false)
  }

  const cats = ['all', 'P', 'C', 'B', 'U']
  const filtered = filterCat === 'all' ? Object.entries(DTC_DB) : Object.entries(DTC_DB).filter(([k]) => k.startsWith(filterCat))

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>🔴 Scanner DTC + AI Assistant</h2>
      <div style={{ fontSize: 12, color: '#4a7aaa', marginBottom: 20 }}>Database SAE J2012 · ISO 15031-6 · Diagnosi assistita da Claude AI</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* DTC Lookup */}
        <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 10, padding: 18 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#5a9adb', marginBottom: 12 }}>🔍 Ricerca Codice DTC</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && lookup()}
              placeholder="P0420, C0034, B0001..." maxLength={6}
              style={{ flex: 1, background: '#070f18', border: '1px solid #1e3a5a', borderRadius: 6, padding: '8px 12px', color: '#e8edf5', fontSize: 14, fontFamily: 'monospace', outline: 'none' }} />
            <button onClick={lookup} style={{ background: '#1a4a8a', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>Analizza</button>
          </div>

          {result && !result.notFound && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#5a9adb', fontFamily: 'monospace' }}>{result.code}</span>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: `${SEVERITY_COLOR[result.s]}22`, color: SEVERITY_COLOR[result.s], border: `1px solid ${SEVERITY_COLOR[result.s]}` }}>{result.s?.toUpperCase()}</span>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: '#1a2a4a', color: '#5a9adb', border: '1px solid #2a4a6a' }}>{result.sys}</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{result.d}</p>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#4a7aaa', textTransform: 'uppercase', marginBottom: 4 }}>Cause possibili</div>
                <p style={{ fontSize: 11, color: '#8ab8de', lineHeight: 1.6 }}>{result.c}</p>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#4a7aaa', textTransform: 'uppercase', marginBottom: 4 }}>Procedura di Test OEM</div>
                <pre style={{ fontSize: 10, color: '#5a9adb', background: '#070f18', padding: 10, borderRadius: 6, whiteSpace: 'pre-wrap', lineHeight: 1.7, borderLeft: '3px solid #1a4a8a' }}>{result.t}</pre>
              </div>
              <div style={{ background: '#0a1f0a', border: '1px solid #1a4a1a', borderRadius: 6, padding: 10 }}>
                <div style={{ fontSize: 10, color: '#4aaa4a', textTransform: 'uppercase', marginBottom: 4 }}>✅ Soluzione</div>
                <p style={{ fontSize: 11, color: '#8ae88a', lineHeight: 1.6 }}>{result.sol}</p>
              </div>
              <button onClick={askAI} style={{ marginTop: 12, width: '100%', background: '#3a1a5a', border: '1px solid #6a3a9a', borderRadius: 6, padding: '9px', color: '#c88ae8', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                🤖 Approfondisci con Claude AI →
              </button>
            </div>
          )}
          {result?.notFound && (
            <div style={{ color: '#cc4444', fontSize: 12 }}>
              <strong>{result.code}</strong> non trovato nel database.
              {result.partial.length > 0 && <div style={{ marginTop: 8 }}>Simili: {result.partial.slice(0, 6).map(k => <span key={k} onClick={() => { setCode(k); setResult(DTC_DB[k] ? { code: k, ...DTC_DB[k] } : null) }} style={{ display: 'inline-block', margin: '2px', padding: '2px 8px', background: '#1a2a4a', color: '#5a9adb', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}>{k}</span>)}</div>}
            </div>
          )}
          {!result && <div style={{ color: '#3a6a9a', fontSize: 11, padding: '10px 0' }}>Inserisci un codice DTC (es. P0420, C0034, U0100...)</div>}
        </div>

        {/* AI Symptoms */}
        <div style={{ background: '#0d1e30', border: '1px solid #2a1a4a', borderRadius: 10, padding: 18, borderTop: '3px solid #6a3a9a' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#c88ae8', marginBottom: 4 }}>🤖 Diagnosi AI per Sintomi</h3>
          <div style={{ fontSize: 10, color: '#6a4a8a', marginBottom: 12 }}>Descrivi i sintomi e Claude AI identifica il problema</div>
          <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)}
            placeholder="es. Il motore vibra al minimo, c'è un rumore di battito a freddo, il consumo è aumentato e la spia motore lampeggia..."
            style={{ width: '100%', height: 100, background: '#070f18', border: '1px solid #2a1a4a', borderRadius: 6, padding: '10px 12px', color: '#e8edf5', fontSize: 12, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
          <button onClick={askAI} disabled={aiLoading || (!result && !symptoms.trim())}
            style={{ width: '100%', marginTop: 10, background: aiLoading ? '#1a0a2a' : '#4a1a7a', border: '1px solid #7a3aaa', borderRadius: 6, padding: '10px', color: '#c88ae8', cursor: aiLoading ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>
            {aiLoading ? '🤖 Claude AI sta analizzando...' : '🤖 Analizza con Claude AI'}
          </button>
          {aiLoading && <div style={{ marginTop: 12, textAlign: 'center' }}>
            <div style={{ display: 'inline-block', width: 32, height: 32, border: '3px solid #3a1a5a', borderTop: '3px solid #c88ae8', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>}
          {aiAnswer && (
            <div style={{ marginTop: 14, background: '#0a0a1a', border: '1px solid #2a1a4a', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 10, color: '#8a5aaa', textTransform: 'uppercase', marginBottom: 8 }}>🤖 Risposta Claude AI</div>
              <div style={{ fontSize: 12, color: '#d8b8f8', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{aiAnswer}</div>
            </div>
          )}
        </div>
      </div>

      {/* DTC List */}
      <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 10, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#5a9adb' }}>📋 Database Codici DTC ({Object.keys(DTC_DB).length} codici SAE J2012)</h3>
          <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilterCat(c)} style={{ padding: '4px 10px', borderRadius: 5, border: '1px solid #2a4a6a', background: filterCat === c ? '#1a4a8a' : 'transparent', color: filterCat === c ? '#fff' : '#5a9adb', cursor: 'pointer', fontSize: 11 }}>
                {c === 'all' ? 'Tutti' : `${c}xxxx`}
              </button>
            ))}
          </div>
        </div>
        <div style={{ maxHeight: 320, overflowY: 'auto' }}>
          {filtered.map(([k, d]) => (
            <div key={k} onClick={() => { setCode(k); setResult({ code: k, ...d }); setAiAnswer('') }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderBottom: '1px solid #0d1e30', cursor: 'pointer', transition: 'background .12s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#111c27'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#5a9adb', width: 56, fontSize: 12, flexShrink: 0 }}>{k}</span>
              <span style={{ flex: 1, fontSize: 11, color: '#8ab8de' }}>{d.d}</span>
              <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 8, background: `${SEVERITY_COLOR[d.s]}22`, color: SEVERITY_COLOR[d.s], border: `1px solid ${SEVERITY_COLOR[d.s]}44`, flexShrink: 0 }}>{d.s?.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
