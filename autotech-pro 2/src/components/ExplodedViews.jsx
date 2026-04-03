// Esploso 3D — Trasmissione Automatica
export function TransmissionExplodedView({ animated }) {
  return (
    <svg viewBox="0 0 500 400" style={{ width: '100%', maxWidth: 500 }}>
      <defs>
        <style>{`
          ${animated ? `
            .te1{animation:tex1 2s ease-out forwards;}
            .te2{animation:tex2 2s ease-out forwards;}
            .te3{animation:tex3 2s ease-out forwards;}
            .te4{animation:tex4 2s ease-out forwards;}
            .te5{animation:tex5 2s ease-out forwards;}
            @keyframes tex1{0%{transform:translate(0,0)}100%{transform:translate(-110px,-50px)}}
            @keyframes tex2{0%{transform:translate(0,0)}100%{transform:translate(110px,-50px)}}
            @keyframes tex3{0%{transform:translate(0,0)}100%{transform:translate(-110px,50px)}}
            @keyframes tex4{0%{transform:translate(0,0)}100%{transform:translate(110px,50px)}}
            @keyframes tex5{0%{transform:translate(0,0)}100%{transform:translate(0,-90px)}}
          ` : ''}
        `}</style>
      </defs>
      <rect width="500" height="400" fill="#070f18"/>
      {/* Grid lines */}
      {[...Array(9)].map((_,i)=><line key={'v'+i} x1={i*62} y1="0" x2={i*62} y2="400" stroke="#0d1e30" strokeWidth="1"/>)}
      {[...Array(7)].map((_,i)=><line key={'h'+i} x1="0" y1={i*60} x2="500" y2={i*60} stroke="#0d1e30" strokeWidth="1"/>)}

      {/* Corpo cambio principale */}
      <g>
        <rect x="140" y="150" width="220" height="100" rx="10" fill="#12202e" stroke="#2a5a9a" strokeWidth="2"/>
        <text x="250" y="192" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Arial" fontWeight="bold">CORPO CAMBIO ATF</text>
        <text x="250" y="208" textAnchor="middle" fill="#5a9adb" fontSize="9" fontFamily="Arial">6AT / 8AT / 9AT</text>
        <text x="250" y="222" textAnchor="middle" fill="#3a5a8a" fontSize="8" fontFamily="Arial">Valvole idrauliche · 32 solenoidi</text>
        {/* Valve body detail */}
        {[0,1,2,3].map(i=>(
          <rect key={i} x={155+i*45} y="230" width="30" height="12" rx="2" fill="#0a1520" stroke="#2a4a7a" strokeWidth="1"/>
        ))}
      </g>

      {/* Convertitore di coppia */}
      <g className={animated?'te5':''}>
        <ellipse cx="250" cy="80" rx="65" ry="55" fill="#0d1a2a" stroke="#3a70c8" strokeWidth="2"/>
        <ellipse cx="250" cy="80" rx="45" ry="38" fill="#0a1520" stroke="#2a5a9a" strokeWidth="1.5"/>
        <ellipse cx="250" cy="80" rx="18" ry="14" fill="#070f18" stroke="#1e3a5a" strokeWidth="1"/>
        <text x="250" y="76" textAnchor="middle" fill="#7ab4de" fontSize="9" fontFamily="Arial" fontWeight="bold">CONVERTITORE</text>
        <text x="250" y="88" textAnchor="middle" fill="#4a7aaa" fontSize="8" fontFamily="Arial">DI COPPIA</text>
        {/* Stator blades */}
        {[0,1,2,3,4,5].map(i=>{
          const a = (i*60)*Math.PI/180
          return <line key={i} x1={250+22*Math.cos(a)} y1={80+18*Math.sin(a)} x2={250+40*Math.cos(a)} y2={80+32*Math.sin(a)} stroke="#3a70c8" strokeWidth="2"/>
        })}
      </g>

      {/* Frizioni multi-disco SX */}
      <g className={animated?'te1':''}>
        <rect x="30" y="145" width="85" height="110" rx="5" fill="#1a1200" stroke="#8a6000" strokeWidth="1.5"/>
        <text x="72" y="168" textAnchor="middle" fill="#f0a000" fontSize="9" fontFamily="Arial" fontWeight="bold">FRIZIONI</text>
        <text x="72" y="180" textAnchor="middle" fill="#c8a000" fontSize="9" fontFamily="Arial" fontWeight="bold">MULTI-DISCO</text>
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x="38" y={188+i*10} width="69" height="7" rx="1"
            fill={i%2===0?'#2a1a00':'#1a1000'} stroke="#6a4000" strokeWidth="1"/>
        ))}
        <text x="72" y="248" textAnchor="middle" fill="#7a5000" fontSize="7" fontFamily="Arial">C1/C2/C3</text>
      </g>

      {/* Planetari DX */}
      <g className={animated?'te2':''}>
        <rect x="385" y="145" width="90" height="110" rx="5" fill="#081a08" stroke="#206a20" strokeWidth="1.5"/>
        <text x="430" y="168" textAnchor="middle" fill="#4aaa4a" fontSize="9" fontFamily="Arial" fontWeight="bold">INGRANAGGI</text>
        <text x="430" y="180" textAnchor="middle" fill="#4aaa4a" fontSize="9" fontFamily="Arial" fontWeight="bold">PLANETARI</text>
        <circle cx="430" cy="210" r="28" fill="#0a1a0a" stroke="#1a6a1a" strokeWidth="1.5"/>
        <circle cx="430" cy="210" r="12" fill="#070f07" stroke="#1a4a1a" strokeWidth="1"/>
        {[0,1,2].map(i=>{
          const a=(i*120)*Math.PI/180
          return <circle key={i} cx={430+18*Math.cos(a)} cy={210+18*Math.sin(a)} r="6" fill="#0d1a0d" stroke="#2a6a2a" strokeWidth="1"/>
        })}
        <text x="430" y="252" textAnchor="middle" fill="#2a6a2a" fontSize="7" fontFamily="Arial">Simpson / Ravigneaux</text>
      </g>

      {/* Albero uscita SX-basso */}
      <g className={animated?'te3':''}>
        <rect x="60" y="285" width="160" height="40" rx="5" fill="#0a1530" stroke="#2a5a9a" strokeWidth="1.5"/>
        <text x="140" y="301" textAnchor="middle" fill="#5a9adb" fontSize="9" fontFamily="Arial" fontWeight="bold">ALBERO INGRESSO</text>
        <text x="140" y="315" textAnchor="middle" fill="#3a6a9a" fontSize="8" fontFamily="Arial">Input shaft · splined</text>
        <circle cx="75" cy="305" r="10" fill="#0d1a2a" stroke="#2a5a9a" strokeWidth="1.5"/>
        <circle cx="215" cy="305" r="10" fill="#0d1a2a" stroke="#2a5a9a" strokeWidth="1.5"/>
      </g>

      {/* Albero uscita DX-basso */}
      <g className={animated?'te4':''}>
        <rect x="285" y="285" width="155" height="40" rx="5" fill="#0a1530" stroke="#2a5a9a" strokeWidth="1.5"/>
        <text x="362" y="301" textAnchor="middle" fill="#5a9adb" fontSize="9" fontFamily="Arial" fontWeight="bold">ALBERO USCITA</text>
        <text x="362" y="315" textAnchor="middle" fill="#3a6a9a" fontSize="8" fontFamily="Arial">Output shaft · flangia</text>
        <circle cx="297" cy="305" r="10" fill="#0d1a2a" stroke="#2a5a9a" strokeWidth="1.5"/>
        <circle cx="428" cy="305" r="10" fill="#0d1a2a" stroke="#2a5a9a" strokeWidth="1.5"/>
      </g>

      {/* Coppa ATF */}
      <rect x="130" y="355" width="240" height="30" rx="5" fill="#070f18" stroke="#1e3a5a" strokeWidth="1.5"/>
      <text x="250" y="372" textAnchor="middle" fill="#3a6a9a" fontSize="9" fontFamily="Arial">COPPA ATF · Filtro · Magnete particelle</text>

      <text x="250" y="395" textAnchor="middle" fill="#2a4a6a" fontSize="8" fontFamily="Arial">Vista Esplosa Cambio Automatico — 6/8/9 rapporti · Dexron VI</text>
    </svg>
  )
}

// Esploso 3D — Sospensione McPherson
export function SuspensionExplodedView({ animated }) {
  return (
    <svg viewBox="0 0 500 420" style={{ width: '100%', maxWidth: 500 }}>
      <defs>
        <style>{`
          ${animated ? `
            .se1{animation:sex1 2s ease-out forwards;}
            .se2{animation:sex2 2s ease-out forwards;}
            .se3{animation:sex3 2s ease-out forwards;}
            .se4{animation:sex4 2s ease-out forwards;}
            @keyframes sex1{0%{transform:translate(0,0)}100%{transform:translate(0,-100px)}}
            @keyframes sex2{0%{transform:translate(0,0)}100%{transform:translate(-100px,30px)}}
            @keyframes sex3{0%{transform:translate(0,0)}100%{transform:translate(100px,30px)}}
            @keyframes sex4{0%{transform:translate(0,0)}100%{transform:translate(0,80px)}}
          ` : ''}
        `}</style>
      </defs>
      <rect width="500" height="420" fill="#070f18"/>
      {[...Array(9)].map((_,i)=><line key={'v'+i} x1={i*62} y1="0" x2={i*62} y2="420" stroke="#0d1e30" strokeWidth="1"/>)}

      {/* Cappellotto superiore */}
      <g className={animated?'se1':''}>
        <ellipse cx="250" cy="55" rx="50" ry="25" fill="#1a1000" stroke="#8a5000" strokeWidth="2"/>
        <ellipse cx="250" cy="55" rx="25" ry="12" fill="#0a0800" stroke="#6a3a00" strokeWidth="1.5"/>
        <text x="250" y="51" textAnchor="middle" fill="#f0a000" fontSize="9" fontFamily="Arial" fontWeight="bold">CAPPELLOTTO</text>
        <text x="250" y="63" textAnchor="middle" fill="#a07000" fontSize="8" fontFamily="Arial">Cuscinetto · 65Nm</text>
        {/* Mounting bolts */}
        {[-30,0,30].map(dx=>(
          <circle key={dx} cx={250+dx} cy="55" r="5" fill="#1a0800" stroke="#8a5000" strokeWidth="1.5"/>
        ))}
      </g>

      {/* Molla */}
      <g>
        {[...Array(8)].map((_,i)=>{
          const y1=100+i*22, y2=100+(i+1)*22
          return <path key={i} d={`M${i%2===0?185:315},${y1} Q250,${(y1+y2)/2} ${i%2===0?315:185},${y2}`}
            fill="none" stroke="#3a70c8" strokeWidth="3"/>
        })}
        <text x="250" y="230" textAnchor="middle" fill="#3a70c8" fontSize="9" fontFamily="Arial" fontWeight="bold">MOLLA ELICOIDALE</text>
        <text x="250" y="242" textAnchor="middle" fill="#2a5a9a" fontSize="8" fontFamily="Arial">⚠️ Compressore certificato obbligatorio</text>
      </g>

      {/* Ammortizzatore */}
      <g>
        <rect x="230" y="95" width="40" height="180" rx="4" fill="#0d1520" stroke="#2a4a7a" strokeWidth="2"/>
        <rect x="238" y="95" width="24" height="100" rx="2" fill="#070f18" stroke="#1e3a5a" strokeWidth="1"/>
        <text x="250" y="200" textAnchor="middle" fill="#5a9adb" fontSize="9" fontFamily="Arial" fontWeight="bold">AMMORTIZZATORE</text>
        <text x="250" y="213" textAnchor="middle" fill="#3a6a9a" fontSize="8" fontFamily="Arial">Gas pressurizzato</text>
        {/* Piston rod */}
        <rect x="244" y="108" width="12" height="80" rx="2" fill="#1e3a6a" stroke="#3a6ab8" strokeWidth="1"/>
      </g>

      {/* Braccio inferiore SX */}
      <g className={animated?'se2':''}>
        <path d="M60,320 L230,290 L230,310 L60,340 Z" fill="#0d1520" stroke="#2a4a7a" strokeWidth="1.5"/>
        <text x="145" y="315" textAnchor="middle" fill="#5a9adb" fontSize="9" fontFamily="Arial" fontWeight="bold">BRACCIO INFERIORE</text>
        <text x="145" y="327" textAnchor="middle" fill="#3a6a9a" fontSize="8" fontFamily="Arial">Silent block · 180Nm+45°</text>
        <circle cx="75" cy="330" r="12" fill="#0a1520" stroke="#3a6ab8" strokeWidth="2"/>
        <circle cx="220" cy="300" r="10" fill="#0a1520" stroke="#3a6ab8" strokeWidth="2"/>
      </g>

      {/* Bielletta barra stab DX */}
      <g className={animated?'se3':''}>
        <rect x="300" y="295" width="140" height="20" rx="4" fill="#1a1200" stroke="#8a6000" strokeWidth="1.5"/>
        <text x="370" y="307" textAnchor="middle" fill="#f0a000" fontSize="9" fontFamily="Arial" fontWeight="bold">BIELLETTA STAB. · 55Nm</text>
        <circle cx="310" cy="305" r="8" fill="#0a0800" stroke="#8a5000" strokeWidth="1.5"/>
        <circle cx="430" cy="305" r="8" fill="#0a0800" stroke="#8a5000" strokeWidth="1.5"/>
      </g>

      {/* Morsetto + mozzo */}
      <g className={animated?'se4':''}>
        <rect x="195" y="355" width="110" height="45" rx="6" fill="#081a08" stroke="#206a20" strokeWidth="2"/>
        <text x="250" y="373" textAnchor="middle" fill="#4aaa4a" fontSize="9" fontFamily="Arial" fontWeight="bold">MORSETTO + MOZZO</text>
        <text x="250" y="386" textAnchor="middle" fill="#2a8a2a" fontSize="8" fontFamily="Arial">120Nm+60° · Cuscinetto ruota</text>
        {/* Hub bolts */}
        {[-35,-17,0,17,35].map(dx=>(
          <circle key={dx} cx={250+dx} cy="388" r="4" fill="#0a1a0a" stroke="#3a8a3a" strokeWidth="1"/>
        ))}
      </g>

      <text x="250" y="412" textAnchor="middle" fill="#2a4a6a" fontSize="8" fontFamily="Arial">Vista Esplosa Sospensione McPherson — Geometria obbligatoria dopo sostituzione</text>
    </svg>
  )
}

// Esploso 3D — Impianto Elettrico / Alternatore
export function ElectricalExplodedView({ animated }) {
  return (
    <svg viewBox="0 0 500 400" style={{ width: '100%', maxWidth: 500 }}>
      <defs>
        <style>{`
          ${animated ? `
            .ee1{animation:eex1 2s ease-out forwards;}
            .ee2{animation:eex2 2s ease-out forwards;}
            .ee3{animation:eex3 2s ease-out forwards;}
            .ee4{animation:eex4 2s ease-out forwards;}
            @keyframes eex1{0%{transform:translate(0,0)}100%{transform:translate(-120px,0)}}
            @keyframes eex2{0%{transform:translate(0,0)}100%{transform:translate(120px,0)}}
            @keyframes eex3{0%{transform:translate(0,0)}100%{transform:translate(0,-90px)}}
            @keyframes eex4{0%{transform:translate(0,0)}100%{transform:translate(0,80px)}}
          ` : ''}
        `}</style>
      </defs>
      <rect width="500" height="400" fill="#070f18"/>
      {[...Array(9)].map((_,i)=><line key={'v'+i} x1={i*62} y1="0" x2={i*62} y2="400" stroke="#0d1e30" strokeWidth="1"/>)}

      {/* Alternatore corpo */}
      <g>
        <ellipse cx="250" cy="200" rx="85" ry="85" fill="#0d1520" stroke="#2a4a7a" strokeWidth="2"/>
        <ellipse cx="250" cy="200" rx="55" ry="55" fill="#0a1020" stroke="#1e3a5a" strokeWidth="1.5"/>
        <text x="250" y="196" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Arial" fontWeight="bold">ALTERNATORE</text>
        <text x="250" y="210" textAnchor="middle" fill="#5a9adb" fontSize="9" fontFamily="Arial">14,4V · 120A</text>
        <text x="250" y="223" textAnchor="middle" fill="#3a6a9a" fontSize="8" fontFamily="Arial">Regolatore integrato</text>
      </g>

      {/* Rotore */}
      <g className={animated?'ee3':''}>
        <ellipse cx="250" cy="70" rx="40" ry="30" fill="#1a2a00" stroke="#4a7a00" strokeWidth="2"/>
        <ellipse cx="250" cy="70" rx="20" ry="14" fill="#0a1500" stroke="#3a6a00" strokeWidth="1.5"/>
        <text x="250" y="66" textAnchor="middle" fill="#7ade00" fontSize="9" fontFamily="Arial" fontWeight="bold">ROTORE</text>
        <text x="250" y="78" textAnchor="middle" fill="#4a8a00" fontSize="8" fontFamily="Arial">Avv. campo · 4Ω</text>
        {[0,1,2,3,4,5,6,7].map(i=>{
          const a=(i*45)*Math.PI/180
          return <line key={i} x1={250+22*Math.cos(a)} y1={70+16*Math.sin(a)} x2={250+38*Math.cos(a)} y2={70+27*Math.sin(a)} stroke="#3a6a00" strokeWidth="1.5"/>
        })}
      </g>

      {/* Statore */}
      <g className={animated?'ee4':''}>
        <ellipse cx="250" cy="340" rx="60" ry="35" fill="#1a0030" stroke="#6a00aa" strokeWidth="2"/>
        <ellipse cx="250" cy="340" rx="35" ry="18" fill="#0a0020" stroke="#4a0088" strokeWidth="1.5"/>
        <text x="250" y="336" textAnchor="middle" fill="#cc88ff" fontSize="9" fontFamily="Arial" fontWeight="bold">STATORE</text>
        <text x="250" y="348" textAnchor="middle" fill="#7a40aa" fontSize="8" fontFamily="Arial">3 fasi · Avv. rame</text>
      </g>

      {/* Regolatore di tensione SX */}
      <g className={animated?'ee1':''}>
        <rect x="30" y="165" width="110" height="70" rx="5" fill="#001a1a" stroke="#00aaaa" strokeWidth="1.5"/>
        <text x="85" y="190" textAnchor="middle" fill="#00cccc" fontSize="9" fontFamily="Arial" fontWeight="bold">REGOLATORE</text>
        <text x="85" y="203" textAnchor="middle" fill="#00cccc" fontSize="9" fontFamily="Arial" fontWeight="bold">TENSIONE</text>
        <text x="85" y="218" textAnchor="middle" fill="#008888" fontSize="8" fontFamily="Arial">13,8–14,4V</text>
        <text x="85" y="228" textAnchor="middle" fill="#006666" fontSize="7" fontFamily="Arial">Integrato nel corpo</text>
      </g>

      {/* Ponte raddrizzatore DX */}
      <g className={animated?'ee2':''}>
        <rect x="360" y="165" width="110" height="70" rx="5" fill="#1a0000" stroke="#aa0000" strokeWidth="1.5"/>
        <text x="415" y="190" textAnchor="middle" fill="#ff6666" fontSize="9" fontFamily="Arial" fontWeight="bold">PONTE</text>
        <text x="415" y="203" textAnchor="middle" fill="#ff6666" fontSize="9" fontFamily="Arial" fontWeight="bold">RADDRIZZATORE</text>
        <text x="415" y="218" textAnchor="middle" fill="#aa4444" fontSize="8" fontFamily="Arial">6 diodi · AC→DC</text>
        {/* Diode symbols */}
        {[0,1,2].map(i=>(
          <g key={i}>
            <polygon points={`${380+i*25},225 ${393+i*25},213 ${393+i*25},237`} fill="#4a0000" stroke="#aa2222" strokeWidth="1"/>
            <line x1={393+i*25} y1="213" x2={393+i*25} y2="237" stroke="#cc2222" strokeWidth="2"/>
          </g>
        ))}
      </g>

      {/* Cinghia */}
      <g>
        <ellipse cx="250" cy="200" rx="95" ry="95" fill="none" stroke="#f0a000" strokeWidth="3" strokeDasharray="12,6"/>
        <text x="380" y="120" textAnchor="middle" fill="#f0a000" fontSize="9" fontFamily="Arial">CINGHIA SERVIZI</text>
        <text x="380" y="132" textAnchor="middle" fill="#a07000" fontSize="8" fontFamily="Arial">Policanale</text>
      </g>

      <text x="250" y="392" textAnchor="middle" fill="#2a4a6a" fontSize="8" fontFamily="Arial">Vista Esplosa Alternatore — Tensione carica: 13,8–14,4V · Test con multimetro</text>
    </svg>
  )
}
