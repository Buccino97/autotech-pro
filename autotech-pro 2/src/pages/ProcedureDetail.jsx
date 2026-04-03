import React, { useState } from 'react'
import { TransmissionExplodedView, SuspensionExplodedView, ElectricalExplodedView } from '../components/ExplodedViews.jsx'
import { printProcedure } from '../components/PrintService.jsx'

// Animated SVG exploded views per system
function EngineExplodedView({ animated }) {
  return (
    <svg viewBox="0 0 500 380" style={{ width: '100%', maxWidth: 500 }}>
      <defs>
        <style>{`
          .part { transition: transform 0.6s cubic-bezier(.4,0,.2,1), opacity 0.4s; cursor: pointer; }
          .part:hover { filter: brightness(1.3); }
          .label { font-family: Arial, sans-serif; font-size: 9px; fill: #7ab4ff; pointer-events: none; }
          ${animated ? `
            .p1 { animation: explode1 2s ease-out forwards; }
            .p2 { animation: explode2 2s ease-out forwards; }
            .p3 { animation: explode3 2s ease-out forwards; }
            .p4 { animation: explode4 2s ease-out forwards; }
            .p5 { animation: explode5 2s ease-out forwards; }
            .p6 { animation: explode6 2s ease-out forwards; }
            @keyframes explode1 { 0%{transform:translate(0,0)} 100%{transform:translate(-80px,-60px)} }
            @keyframes explode2 { 0%{transform:translate(0,0)} 100%{transform:translate(80px,-60px)} }
            @keyframes explode3 { 0%{transform:translate(0,0)} 100%{transform:translate(-90px,0px)} }
            @keyframes explode4 { 0%{transform:translate(0,0)} 100%{transform:translate(90px,0px)} }
            @keyframes explode5 { 0%{transform:translate(0,0)} 100%{transform:translate(-70px,70px)} }
            @keyframes explode6 { 0%{transform:translate(0,0)} 100%{transform:translate(70px,70px)} }
          ` : ''}
        `}</style>
      </defs>
      <rect width="500" height="380" fill="#070f18"/>
      {/* Grid */}
      {[...Array(10)].map((_,i) => <line key={i} x1={i*55} y1="0" x2={i*55} y2="380" stroke="#0d1e30" strokeWidth="1"/>)}
      {[...Array(7)].map((_,i) => <line key={i} x1="0" y1={i*60} x2="500" y2={i*60} stroke="#0d1e30" strokeWidth="1"/>)}

      {/* Testata cilindri */}
      <g className={`part p1 ${animated ? 'p1' : ''}`} onClick={() => {}}>
        <rect x="155" y="60" width="190" height="55" rx="6" fill="#1e3a6a" stroke="#3a70c8" strokeWidth="2"/>
        <text x="250" y="82" textAnchor="middle" className="label" fill="#fff" fontWeight="bold" fontSize="11">TESTATA CILINDRI</text>
        <text x="250" y="96" textAnchor="middle" className="label">Head Gasket · Valvole · Albero Camme</text>
        {[0,1,2,3].map(i => <circle key={i} cx={180 + i*40} cy="108" r="6" fill="#2a5aaa" stroke="#4a8add" strokeWidth="1.5"/>)}
      </g>

      {/* Coperchio distribuzione */}
      <g className={`part ${animated ? 'p2' : ''}`}>
        <rect x="355" y="75" width="70" height="120" rx="5" fill="#1a2a4a" stroke="#2a5a9a" strokeWidth="1.5"/>
        <text x="390" y="118" textAnchor="middle" className="label" fill="#8ab8de">COPERCHIO</text>
        <text x="390" y="130" textAnchor="middle" className="label" fill="#8ab8de">DISTRIBUZIONE</text>
        <path d="M380 95 Q400 115 380 135 Q400 155 380 175" fill="none" stroke="#4a8add" strokeWidth="2"/>
      </g>

      {/* Blocco motore */}
      <g className="part">
        <rect x="130" y="140" width="240" height="100" rx="8" fill="#162238" stroke="#2a4a7a" strokeWidth="2"/>
        <text x="250" y="180" textAnchor="middle" className="label" fill="#fff" fontWeight="bold" fontSize="12">BLOCCO MOTORE</text>
        <text x="250" y="196" textAnchor="middle" className="label">4 Cilindri in linea</text>
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x={155 + i*52} y="150" width="28" height="80" rx="4" fill="#0f1c2e" stroke="#2a4a7a" strokeWidth="1"/>
            <text x={169 + i*52} y="194" textAnchor="middle" className="label" fill="#5a8aaa">{i+1}</text>
          </g>
        ))}
      </g>

      {/* Cinghia distribuzione */}
      <g className={`part ${animated ? 'p3' : ''}`}>
        <ellipse cx="110" cy="180" rx="35" ry="70" fill="none" stroke="#f0a000" strokeWidth="3" strokeDasharray="8,4"/>
        <text x="50" y="170" className="label" fill="#f0a000">CINGHIA</text>
        <text x="50" y="182" className="label" fill="#f0a000">DISTRIBUZIONE</text>
        <circle cx="110" cy="120" r="18" fill="#1a2a1a" stroke="#2a6a2a" strokeWidth="2"/>
        <circle cx="110" cy="240" r="22" fill="#2a1a1a" stroke="#6a2a2a" strokeWidth="2"/>
        <text x="110" y="123" textAnchor="middle" className="label" fill="#4aaa4a" fontSize="8">CAMME</text>
        <text x="110" y="243" textAnchor="middle" className="label" fill="#aa4a4a" fontSize="8">MOTORE</text>
      </g>

      {/* Carter olio */}
      <g className={`part ${animated ? 'p5' : ''}`}>
        <rect x="140" y="255" width="220" height="45" rx="5" fill="#0d1a2a" stroke="#1a3a5a" strokeWidth="1.5"/>
        <text x="250" y="275" textAnchor="middle" className="label" fill="#5a9adb">CARTER OLIO</text>
        <text x="250" y="288" textAnchor="middle" className="label">Coppa — Livello min/max</text>
      </g>

      {/* Alternatore */}
      <g className={`part ${animated ? 'p4' : ''}`}>
        <ellipse cx="420" cy="220" rx="32" ry="32" fill="#1a1a3a" stroke="#3a3a8a" strokeWidth="2"/>
        <text x="420" y="217" textAnchor="middle" className="label" fill="#8a8ae0">ALT.</text>
        <text x="420" y="229" textAnchor="middle" className="label" fill="#8a8ae0">120A</text>
        <circle cx="420" cy="220" r="16" fill="#0d0d2a" stroke="#2a2a6a" strokeWidth="1"/>
      </g>

      {/* Tenditore */}
      <g className={`part ${animated ? 'p6' : ''}`}>
        <circle cx="110" cy="180" r="12" fill="#2a1a00" stroke="#8a5a00" strokeWidth="1.5"/>
        <text x="110" y="183" textAnchor="middle" className="label" fill="#f0a000" fontSize="8">TEND.</text>
        <line x1="122" y1="180" x2="130" y2="180" stroke="#8a5a00" strokeWidth="1.5"/>
      </g>

      {/* Labels con frecce */}
      <line x1="345" y1="87" x2="360" y2="92" stroke="#3a70c8" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="300" y="83" className="label" fill="#4a9adb" fontSize="10">→ Albero camme</text>
      <line x1="360" y1="108" x2="345" y2="112" stroke="#3a70c8" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="265" y="112" className="label" fill="#4a9adb" fontSize="10">→ Valvole (8 intake / 8 exhaust)</text>

      <text x="250" y="345" textAnchor="middle" fill="#2a4a6a" fontSize="9" fontFamily="Arial">
        Vista Esplosa — Clicca su un componente per dettagli • Animazione controllata
      </text>
    </svg>
  )
}

function BrakeExplodedView({ animated }) {
  return (
    <svg viewBox="0 0 500 380" style={{ width: '100%', maxWidth: 500 }}>
      <defs>
        <style>{`
          ${animated ? `
            .b1 { animation: bexp1 1.8s ease-out forwards; }
            .b2 { animation: bexp2 1.8s ease-out forwards; }
            .b3 { animation: bexp3 1.8s ease-out forwards; }
            @keyframes bexp1 { 0%{transform:translate(0,0)} 100%{transform:translate(-100px,0)} }
            @keyframes bexp2 { 0%{transform:translate(0,0)} 100%{transform:translate(100px,0)} }
            @keyframes bexp3 { 0%{transform:translate(0,0)} 100%{transform:translate(0,-80px)} }
          ` : ''}
        `}</style>
      </defs>
      <rect width="500" height="380" fill="#070f18"/>
      {/* Disco freno */}
      <g>
        <circle cx="250" cy="200" r="110" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="3"/>
        <circle cx="250" cy="200" r="85" fill="#222" stroke="#444" strokeWidth="1"/>
        <circle cx="250" cy="200" r="25" fill="#0d0d0d" stroke="#555" strokeWidth="2"/>
        {[0,1,2,3,4,5,6,7].map(i => {
          const a = (i * 45) * Math.PI / 180
          return <line key={i} x1={250 + 30*Math.cos(a)} y1={200 + 30*Math.sin(a)} x2={250 + 80*Math.cos(a)} y2={200 + 80*Math.sin(a)} stroke="#333" strokeWidth="2"/>
        })}
        <text x="250" y="196" textAnchor="middle" fill="#aaa" fontSize="11" fontFamily="Arial" fontWeight="bold">DISCO FRENO</text>
        <text x="250" y="210" textAnchor="middle" fill="#888" fontSize="9" fontFamily="Arial">Ventilato Ø 300mm</text>
      </g>
      {/* Pastiglia sx */}
      <g className={animated ? 'b1' : ''}>
        <rect x="98" y="155" width="60" height="90" rx="4" fill="#cc2222" stroke="#ff4444" strokeWidth="2"/>
        <rect x="104" y="165" width="48" height="70" rx="2" fill="#aa1a1a"/>
        <text x="128" y="195" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">PAST.</text>
        <text x="128" y="208" textAnchor="middle" fill="#ffaaaa" fontSize="8" fontFamily="Arial">SX</text>
        <text x="128" y="220" textAnchor="middle" fill="#ff8888" fontSize="8" fontFamily="Arial">12mm</text>
      </g>
      {/* Pastiglia dx */}
      <g className={animated ? 'b2' : ''}>
        <rect x="342" y="155" width="60" height="90" rx="4" fill="#cc2222" stroke="#ff4444" strokeWidth="2"/>
        <rect x="348" y="165" width="48" height="70" rx="2" fill="#aa1a1a"/>
        <text x="372" y="195" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">PAST.</text>
        <text x="372" y="208" textAnchor="middle" fill="#ffaaaa" fontSize="8" fontFamily="Arial">DX</text>
        <text x="372" y="220" textAnchor="middle" fill="#ff8888" fontSize="8" fontFamily="Arial">12mm</text>
      </g>
      {/* Pinza freno */}
      <g className={animated ? 'b3' : ''}>
        <rect x="180" y="55" width="140" height="60" rx="8" fill="#1a3a6a" stroke="#3a70c8" strokeWidth="2"/>
        <text x="250" y="82" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Arial" fontWeight="bold">PINZA FRENO</text>
        <text x="250" y="96" textAnchor="middle" fill="#8ab8de" fontSize="9" fontFamily="Arial">2 pistoni · 105 Nm</text>
        <rect x="195" y="68" width="30" height="32" rx="4" fill="#0d1e30" stroke="#2a5a9a" strokeWidth="1"/>
        <rect x="275" y="68" width="30" height="32" rx="4" fill="#0d1e30" stroke="#2a5a9a" strokeWidth="1"/>
      </g>
      {/* Labels */}
      <text x="250" y="345" textAnchor="middle" fill="#2a4a6a" fontSize="9" fontFamily="Arial">Vista Esplosa Sistema Frenante — Specifiche OEM</text>
    </svg>
  )
}

const PROCEDURES = {
  engine: {
    title: '⚙️ Motore — Sostituzione Cinghia di Distribuzione',
    time: '2,5–4,0 h', difficulty: 'Alta', ExplodedView: EngineExplodedView,
    warnings: [
      { type: 'critical', text: '⚠️ Spegnere il motore e lasciarlo raffreddare completamente (min. 2 ore). Rischio ustioni gravi.' },
      { type: 'warning', text: 'Verificare compatibilità del kit distribuzione con il codice motore esatto prima di ordinare.' },
    ],
    specs: [
      ['Intervallo sostituzione', '150.000 km oppure 10 anni'],
      ['Coppia bullone puleggia albero motore', '135 Nm + 90° (angolo)'],
      ['Coppia dado tenditore automatico', '25 Nm'],
      ['Coppia viti coperchio distribuzione', '12 Nm (Torx T30)'],
      ['Tipo fluido raffreddamento', 'G12++ HOAT viola — 1,5 L'],
      ['Attrezzo blocco albero camme', 'T10171 o equivalente OEM'],
    ],
    steps: [
      'Scollegare il cavo negativo della batteria (−). Attendere 5 minuti.',
      'Rimuovere il coperchio superiore del motore (4 viti M6 — 8 Nm).',
      'Portare il cilindro N.1 al PMS: ruotare l\'albero motore in senso orario dal bullone puleggia.',
      'Verificare l\'allineamento dei segni di riferimento su albero motore (marcatura "0") e albero a camme.',
      'Rimuovere il coperchio anteriore distribuzione (6 viti Torx T30 — 12 Nm).',
      'Bloccare l\'albero a camme con attrezzo di blocco OEM (T10171 o equivalente).',
      'Allentare il tenditore automatico ruotando in senso antiorario. Inserire spillo di blocco ⌀2mm.',
      'Sfilare la cinghia di distribuzione dalla puleggia albero motore, poi dall\'albero a camme.',
      'Verificare stato tenditore e rullo di rinvio: sostituire se mostrano usura o gioco.',
      'Se previsto nel kit: sostituire anche la pompa acqua (corpo pompa 20 Nm).',
      'Montare la nuova cinghia partendo dalla puleggia inferiore albero motore (senso antiorario).',
      'Rimuovere lo spillo di blocco tenditore: il tenditore tende automaticamente la cinghia.',
      'Eseguire 2 rotazioni complete in senso orario. Ricontrollare allineamento segni.',
      'Riassemblare in ordine inverso. Avviare il motore e verificare assenza rumori anomali.',
    ],
    parts: ['Kit distribuzione OEM (cinghia + tenditore + rullo)', 'Guarnizione coperchio distribuzione', 'Liquido raffreddamento G12++'],
    related: ['Sostituzione pompa acqua', 'Controllo tenditore catena', 'Reset indicatori manutenzione'],
  },
  brakes: {
    title: '🛑 Freni — Sostituzione Pastiglie e Dischi Anteriori',
    time: '1,5–2,0 h', difficulty: 'Media', ExplodedView: BrakeExplodedView,
    warnings: [
      { type: 'critical', text: '⚠️ Testare i freni a bassa velocità prima di immettersi nel traffico normale.' },
      { type: 'warning', text: 'Non comprimere lo stantuffo senza prima rimuovere fluido dal serbatoio.' },
    ],
    specs: [
      ['Spessore minimo disco (ANT)', '22 mm — nuovo: 28 mm'],
      ['Spessore minimo pastiglia', '2 mm — nuova: 12 mm'],
      ['Runout disco (oscillazione laterale)', '< 0,05 mm'],
      ['Coppia bulloni pinza freno', '105 Nm'],
      ['Coppia bulloni supporto pinza', '210 Nm'],
      ['Coppia bulloni ruota', '110 Nm'],
      ['Fluido freni', 'DOT 4 LV (Low Viscosity)'],
    ],
    steps: [
      'Allentare i bulloni ruota con veicolo a terra (110 Nm).',
      'Sollevare il veicolo su cavalletti certificati e rimuovere la ruota.',
      'Aprire il tappo del serbatoio liquido freni (evita sovrappressione).',
      'Comprimere lentamente lo stantuffo della pinza con morsetto C (proteggere pastiglia con spessore).',
      'Smontare i 2 bulloni pinza freno (105 Nm). Appendere la pinza con filo metallico.',
      'Estrarre le pastiglie vecchie annotando il verso di montaggio.',
      'Rimuovere il disco: svitare il bullone di fermo (10 Nm) e sfilare dal mozzo.',
      'Pulire il mozzo con carta abrasiva 80 e sgrassante specifico.',
      'Montare il nuovo disco e serrare il bullone di fermo (10 Nm).',
      'Applicare pasta anti-cigolìo sul retro delle pastiglie (NON sulle superfici di attrito).',
      'Inserire le nuove pastiglie e rimontare la pinza (105 Nm).',
      'Premere il pedale del freno a fondo 4-5 volte fino a sentirlo duro.',
      'Rimontare la ruota (110 Nm a croce). Eseguire rodaggio: 10 frenate progressive da 60 km/h.',
    ],
    parts: ['Kit pastiglie anteriori OEM', 'Coppia dischi freno anteriori', 'Pasta anti-cigolìo', 'Fluido freni DOT 4 LV (500ml)'],
    related: ['Spurgo impianto frenante', 'Sostituzione freni posteriori', 'Calibrazione EPB elettrico'],
  },
  electrical: {
    title: '⚡ Elettrico — Sostituzione Alternatore',
    time: '1,5–2,5 h', difficulty: 'Media', ExplodedView: null,
    warnings: [{ type: 'critical', text: '⚠️ Scollegare SEMPRE il cavo negativo batteria prima di qualsiasi intervento elettrico.' }],
    specs: [['Tensione di carica', '13,8–14,4 V (motore caldo 2000 rpm)'], ['Corrente max', '120 A'], ['Coppia bullone superiore', '45 Nm'], ['Coppia bullone inferiore', '55 Nm'], ['Coppia cavo B+', '12 Nm']],
    steps: ['Scollegare cavo negativo batteria (−). Attendere 5 min.', 'Allentare cinghia servizi tramite tenditore automatico.', 'Sfilare cinghia dalla puleggia alternatore.', 'Scollegare connettore multiplo dal retro alternatore.', 'Rimuovere cavo B+ (dado M8 — 12 Nm).', 'Smontare 2 bulloni fissaggio (45 Nm sup, 55 Nm inf).', 'Estrarre alternatore (~3,5–5 kg).', 'Installare nuovo alternatore verificando allineamento puleggia.', 'Serrare bulloni alle coppie prescritte.', 'Ricollegare cavo B+ (12 Nm) e connettore multiplo.', 'Reinstallare cinghia servizi.', 'Ricollegare batteria. Avviare e misurare tensione carica.'],
    parts: ['Alternatore OEM o rigenerato', 'Cinghia servizi (se usurata)'],
    related: ['Test sistema di carica', 'Sostituzione batteria', 'Sostituzione motorino avviamento'],
  },
  suspension: {
    title: '🔗 Sospensioni — Sostituzione Ammortizzatore Anteriore', time: '2,5–3,5 h', difficulty: 'Alta', ExplodedView: SuspensionExplodedView,
    warnings: [{ type: 'critical', text: '⚠️ PERICOLO VITA: Usare SOLO compressore molle certificato professionale.' }, { type: 'warning', text: 'Geometria ruote OBBLIGATORIA dopo sostituzione.' }],
    specs: [['Coppia dado cappellotto ammortizzatore', '65 Nm'], ['Coppia morsetto montante su braccio', '120 Nm + 60°'], ['Coppia bielletta stabilizzatrice', '55 Nm'], ['Coppia braccio inferiore', '180 Nm + 45°']],
    steps: ['Allentare dado cappellotto (NON rimuovere) con veicolo a terra.', 'Sollevare veicolo. Rimuovere ruota.', 'Scollegare sensore ABS e flessibile freno dai supporti.', 'Smontare bielletta barra stabilizzatrice (55 Nm).', 'Smontare bullone morsetto inferiore (120 Nm + 60°).', 'Estrarre montante completo.', 'Montare compressore molle certificato. Comprimere simmetricamente.', 'Rimuovere dado cappellotto e separare componenti.', 'Montare nuovo ammortizzatore con molla (rispettare orientamento).', 'Serrare dado cappellotto (65 Nm). Decomprimere molla lentamente.', 'Reinstallare montante e serrare bulloni.', 'Far eseguire geometria ruote entro 50 km.'],
    parts: ['Ammortizzatore OEM', 'Kit cappellotto/tampone', 'Cuscinetto montante superiore'],
    related: ['Sostituzione bielletta stabilizzatrice', 'Verifica geometria', 'Sostituzione silent block'],
  },
  ac: { title: '❄️ Clima — Ricarica Gas R1234yf/R134a', time: '1,0–2,0 h', difficulty: 'Media', ExplodedView: null, warnings: [{ type: 'critical', text: '⚠️ Solo tecnici certificati F-Gas. Gas refrigerante sotto pressione.' }], specs: [['Gas (dal 2017)', 'R1234yf'], ['Quantità tipica', '450 ± 25 g'], ['Pressione lato bassa', '1,5–3,0 bar'], ['Pressione lato alta', '12–16 bar']], steps: ['Verificare tipo gas su etichetta cofano.', 'Collegare stazione ricarica a valvole alta (rosso) e bassa (blu).', 'Eseguire vacuum 30 min.', 'Ricaricare alla quantità indicata (±5g).', 'Aggiungere 25 ml olio PAG SP-10.', 'Verificare pressioni e temperatura aria uscita.', 'Sostituire filtro abitacolo.'], parts: ['Gas R1234yf', 'Olio PAG SP-10', 'Filtro abitacolo'], related: ['Sostituzione compressore A/C'] },
  transmission: { title: '🔩 Trasmissione — Cambio Olio ATF', time: '1,5–2,5 h', difficulty: 'Media', ExplodedView: null, warnings: [{ type: 'critical', text: '⚠️ Usare SOLO fluido ATF specificato.' }], specs: [['Tipo fluido', 'Dexron VI'], ['Quantità totale', '7,8 litri'], ['Temperatura rabbocco', '35–45°C'], ['Coppia tappo', '32 Nm']], steps: ['Portare a temperatura operativa.', 'Aprire tappo scarico ATF.', 'Sostituire guarnizione tappo.', 'Riempire con ATF nuovo.', 'Verificare livello con motore acceso.'], parts: ['ATF Dexron VI (8L)', 'Guarnizioni'], related: ['Sostituzione filtro cambio'] },
  exhaust: { title: '💨 DPF — Rigenerazione Forzata', time: '1,0–3,0 h', difficulty: 'Media', ExplodedView: null, warnings: [{ type: 'warning', text: 'Non eseguire rigenerazioni ripetute senza diagnosticare la causa.' }], specs: [['Pressione diff. DPF intasato', '>50 mbar'], ['Temperatura rigenerazione', '600–650°C']], steps: ['Leggere % soot load con scanner.', 'Rigenerazione forzata (3000 rpm, 20 min).', 'Se fallisce: rimuovere DPF per pulizia.', 'Reset contatore soot.'], parts: ['Additivo EOLYS 176 (300ml)', 'Guarnizioni scarico'], related: ['Pulizia valvola EGR'] },
  fuel: { title: '⛽ Carburante — Sostituzione Pompa', time: '2,0–3,5 h', difficulty: 'Alta', ExplodedView: null, warnings: [{ type: 'critical', text: '⚠️ RISCHIO INCENDIO. Lavorare lontano da fiamme. Estintore CO2 a portata.' }], specs: [['Pressione a riposo', '3,5 bar'], ['Portata minima', '120 L/ora'], ['Coppia anello', '40 Nm']], steps: ['Depressurizzare circuito.', 'Scollegare batteria.', 'Accedere pompa dal bagagliaio.', 'Sfilare modulo pompa.', 'Installare nuovo modulo.', 'Verificare assenza perdite.'], parts: ['Modulo pompa OEM', 'Guarnizione flangia'], related: ['Sostituzione filtro carburante'] },
  steering: { title: '🎯 Sterzo EPS — Sostituzione Piantone', time: '3,0–5,0 h', difficulty: 'Alta', ExplodedView: null, warnings: [{ type: 'critical', text: '⚠️ AIRBAG: scollegare batteria e attendere 10 minuti prima di lavorare sul piantone.' }], specs: [['Coppia dado volante', '50 Nm'], ['Coppia giunto cardanico', '25 Nm'], ['Calibrazione angolo sterzo', 'Obbligatoria']], steps: ['Scollegare batteria. Attendere 10 min.', 'Rimuovere pannello inferiore cruscotto.', 'Scollegare connettori EPS.', 'Smontare dado volante (50 Nm) e rimuovere volante.', 'Smontare clock spring (annotare posizione neutra).', 'Smontare giunto cardanico inferiore.', 'Estrarre piantone.', 'Installare nuovo piantone.', 'Rimontare clock spring in posizione neutra.', 'Calibrare sensore angolo sterzo con scanner.'], parts: ['Piantone sterzo EPS', 'Kit bulloni non riutilizzabili'], related: ['Calibrazione sensore angolo sterzo', 'Reset apprendimento EPS'] },
  body: { title: '🚗 Carrozzeria — Sostituzione Parabrezza con ADAS', time: '2,0–4,0 h', difficulty: 'Alta', ExplodedView: null, warnings: [{ type: 'critical', text: '⚠️ Calibrazione ADAS OBBLIGATORIA dopo sostituzione parabrezza.' }, { type: 'warning', text: 'Non guidare per 8 ore dopo montaggio (asciugatura sigillante).' }], specs: [['Sigillante', 'PU Betaseal 1803'], ['Asciugatura min.', '8 ore a 20°C'], ['Calibrazione ADAS', 'Statica con target certificato']], steps: ['Rimuovere modanature e sensore pioggia.', 'Tagliare cordone sigillante vecchio.', 'Rimuovere parabrezza con ventose.', 'Pulire flangia da vecchio sigillante.', 'Applicare primer PU (5 min asciugatura).', 'Applicare cordone sigillante uniforme.', 'Posizionare nuovo parabrezza con ventose.', 'Reinstallare modanature e sensore.', 'Calibrare ADAS con target certificato.'], parts: ['Parabrezza OEM con punto attacco telecamera', 'Sigillante PU (310ml)', 'Primer PU'], related: ['Calibrazione telecamera ADAS', 'Reset sensore pioggia'] },
}

export default function ProcedureDetail({ vehicle, selectedProc, nav, showVehicleModal }) {
  const [stepsChecked, setStepsChecked] = useState({})
  const [animateExplode, setAnimateExplode] = useState(false)
  const [explodeKey, setExplodeKey] = useState(0)

  const proc = PROCEDURES[selectedProc] || PROCEDURES.engine

  const toggleStep = (i) => setStepsChecked(prev => ({ ...prev, [i]: !prev[i] }))
  const doneCount = Object.values(stepsChecked).filter(Boolean).length

  const triggerAnimation = () => {
    setAnimateExplode(true)
    setExplodeKey(k => k + 1)
    setTimeout(() => setAnimateExplode(false), 2500)
  }

  const s = (color, px = 12) => ({ fontSize: px, color })

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 0, height: '100%' }}>
      {/* LEFT: procedure */}
      <div style={{ padding: 20, overflowY: 'auto', borderRight: '1px solid #1e3a5a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={() => nav('repair')} style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 6, padding: '6px 12px', color: '#5a9adb', cursor: 'pointer', fontSize: 12 }}>← Indietro</button>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', flex: 1 }}>{proc.title}</h2>
          <button onClick={() => printProcedure(proc, vehicle)} style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 6, padding: '6px 12px', color: '#5a9adb', cursor: 'pointer', fontSize: 12 }}>🖨️ Stampa PDF</button>
        </div>

        {vehicle && <div style={{ background: '#0a1f35', border: '1px solid #1a4a7a', borderRadius: 6, padding: '8px 14px', marginBottom: 14, fontSize: 11, color: '#5a9adb' }}>🚗 {vehicle.year} {vehicle.make} {vehicle.model} — {vehicle.engine}</div>}

        {/* Warnings */}
        {proc.warnings.map((w, i) => (
          <div key={i} style={{ background: w.type === 'critical' ? '#1a0a0a' : '#1a1200', border: `1px solid ${w.type === 'critical' ? '#cc2222' : '#a06000'}`, borderLeft: `4px solid ${w.type === 'critical' ? '#cc2222' : '#a06000'}`, borderRadius: 4, padding: '9px 12px', marginBottom: 10, fontSize: 11, color: w.type === 'critical' ? '#ff8888' : '#ffcc66' }}>
            {w.text}
          </div>
        ))}

        {/* Specs */}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#5a9adb', borderBottom: '1px solid #1e3a5a', paddingBottom: 6, marginBottom: 10 }}>📐 Specifiche Tecniche OEM</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
            <thead><tr><th style={{ background: '#0a1520', color: '#5a9adb', padding: '6px 10px', textAlign: 'left', fontSize: 10 }}>Parametro</th><th style={{ background: '#0a1520', color: '#5a9adb', padding: '6px 10px', textAlign: 'left', fontSize: 10 }}>Valore</th></tr></thead>
            <tbody>
              {proc.specs.map(([k, v], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#0d1e30' : '#070f18' }}>
                  <td style={{ padding: '6px 10px', color: '#8ab8de' }}>{k}</td>
                  <td style={{ padding: '6px 10px', color: '#fff', fontWeight: 600 }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Steps */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#5a9adb' }}>🔧 Procedura ({proc.steps.length} passi)</h3>
            <div style={{ fontSize: 11, color: '#4aaa4a' }}>{doneCount}/{proc.steps.length} completati</div>
          </div>
          <div style={{ background: '#0a1520', borderRadius: 4, height: 4, marginBottom: 14 }}>
            <div style={{ background: '#1a7a1a', height: 4, borderRadius: 4, width: `${(doneCount / proc.steps.length) * 100}%`, transition: 'width .3s' }} />
          </div>
          {proc.steps.map((step, i) => (
            <div key={i} onClick={() => toggleStep(i)}
              style={{ display: 'flex', gap: 10, padding: '8px 10px', borderLeft: `3px solid ${stepsChecked[i] ? '#1a7a1a' : '#1e3a5a'}`, marginBottom: 6, background: stepsChecked[i] ? '#0a1a0a' : '#0d1e30', borderRadius: '0 6px 6px 0', cursor: 'pointer', transition: 'all .15s', fontSize: 11, color: stepsChecked[i] ? '#4aaa4a' : '#c8d8e8', textDecoration: stepsChecked[i] ? 'line-through' : 'none' }}>
              <div style={{ minWidth: 22, height: 22, background: stepsChecked[i] ? '#1a7a1a' : '#1e3a5a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700, flexShrink: 0 }}>{stepsChecked[i] ? '✓' : i + 1}</div>
              <div style={{ lineHeight: 1.6 }}>{step}</div>
            </div>
          ))}
          <button onClick={() => setStepsChecked({})} style={{ marginTop: 8, background: 'transparent', border: '1px solid #2a4a6a', borderRadius: 5, padding: '5px 12px', color: '#5a9adb', cursor: 'pointer', fontSize: 11 }}>↺ Reset passi</button>
        </div>
      </div>

      {/* RIGHT: exploded view + sidebar */}
      <div style={{ padding: 20, overflowY: 'auto', background: '#0a1520' }}>
        {/* Exploded view */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#5a9adb' }}>🔩 Vista Esplosa 3D</h3>
            <button onClick={triggerAnimation} style={{ background: '#1a3a6a', border: '1px solid #3a6ab8', borderRadius: 6, padding: '5px 12px', color: '#7ab4ff', cursor: 'pointer', fontSize: 11 }}>▶ Anima Esplosione</button>
          </div>
          <div style={{ background: '#070f18', borderRadius: 8, border: '1px solid #1e3a5a', overflow: 'hidden' }}>
            {proc.ExplodedView ? (
              <proc.ExplodedView key={explodeKey} animated={animateExplode} />
            ) : (
              <div style={{ padding: 40, textAlign: 'center', color: '#3a6a9a', fontSize: 12 }}>
                Vista 3D disponibile per: Motore, Freni<br />
                <span style={{ fontSize: 10, color: '#2a4a6a', marginTop: 8, display: 'block' }}>Altri sistemi in aggiornamento</span>
              </div>
            )}
          </div>
        </div>

        {/* Info boxes */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 8, padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f0a000' }}>{proc.time}</div>
            <div style={{ fontSize: 10, color: '#4a7aaa', marginTop: 3 }}>ore manodopera OEM</div>
          </div>
          <div style={{ flex: 1, background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 8, padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: proc.difficulty === 'Alta' ? '#cc4444' : proc.difficulty === 'Media' ? '#aa7700' : '#44aa44' }}>{proc.difficulty}</div>
            <div style={{ fontSize: 10, color: '#4a7aaa', marginTop: 3 }}>difficoltà</div>
          </div>
        </div>

        {/* Parts */}
        <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#5a9adb', marginBottom: 8 }}>🔩 Parti Necessarie</h4>
          <ul style={{ paddingLeft: 16, fontSize: 11, color: '#7a9aaa', lineHeight: 2 }}>
            {proc.parts.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>

        {/* Related */}
        <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 8, padding: 14 }}>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#5a9adb', marginBottom: 8 }}>🔗 Procedure Correlate</h4>
          {proc.related.map(r => (
            <div key={r} style={{ padding: '5px 8px', fontSize: 11, color: '#5a9adb', cursor: 'pointer', borderRadius: 4, marginBottom: 4 }}
              onMouseEnter={e => e.currentTarget.style.background = '#1e3a5a'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              → {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
