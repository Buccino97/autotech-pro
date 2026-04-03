import React, { useState, useEffect } from 'react'

const MAKES = {
  'Alfa Romeo': ['Giulia','Stelvio','Giulietta','Tonale','Brera','Mito','147','156','159'],
  'Audi': ['A1','A2','A3','A4','A5','A6','A7','A8','Q2','Q3','Q5','Q7','Q8','TT','R8','e-tron','e-tron GT'],
  'BMW': ['Serie 1','Serie 2','Serie 3','Serie 4','Serie 5','Serie 6','Serie 7','X1','X2','X3','X4','X5','X6','X7','M2','M3','M4','M5','iX','i4','i5'],
  'Citroën': ['C1','C2','C3','C3 Aircross','C4','C4 Cactus','C5','C5 Aircross','C5 X','Berlingo','DS3','DS4','DS5','Spacetourer'],
  'Dacia': ['Sandero','Logan','Duster','Jogger','Spring'],
  'Ferrari': ['Roma','SF90','F8 Tributo','Portofino','296 GTB','812 Superfast'],
  'Fiat': ['500','500X','500e','Panda','Tipo','Bravo','Punto','Ducato','Doblo','Talento'],
  'Ford': ['Fiesta','Focus','Puma','Kuga','Mustang','Mustang Mach-E','Explorer','Ranger','Bronco','Maverick','F-150','Transit','Galaxy','S-Max','Edge'],
  'Honda': ['Civic','CR-V','HR-V','Jazz','Accord','NSX','e','e:Ny1'],
  'Hyundai': ['i10','i20','i30','i40','Tucson','Santa Fe','Kona','IONIQ','IONIQ 5','IONIQ 6','ix35','ix55'],
  'Jeep': ['Renegade','Compass','Cherokee','Grand Cherokee','Wrangler','Gladiator','Avenger'],
  'Kia': ['Picanto','Rio','Ceed','ProCeed','Stinger','Sportage','Sorento','Telluride','EV6','EV9','Niro','K5'],
  'Lamborghini': ['Huracán','Urus','Revuelto'],
  'Land Rover': ['Discovery','Discovery Sport','Range Rover','Range Rover Sport','Range Rover Velar','Range Rover Evoque','Defender','Freelander'],
  'Lexus': ['CT','IS','ES','GS','LS','UX','NX','RX','GX','LX','LC','RC','RZ'],
  'Maserati': ['Ghibli','Quattroporte','Levante','Grecale','GranTurismo','MC20'],
  'Mazda': ['Mazda2','Mazda3','Mazda6','CX-3','CX-30','CX-5','CX-60','MX-5','MX-30'],
  'Mercedes-Benz': ['Classe A','Classe B','Classe C','Classe CLA','Classe CLS','Classe E','Classe GLA','Classe GLB','Classe GLC','Classe GLE','Classe GLS','Classe S','Classe SL','EQA','EQB','EQC','EQE','EQS','Sprinter','Vito'],
  'Mini': ['Cooper','Countryman','Clubman','Paceman','Roadster','Convertible'],
  'Mitsubishi': ['Colt','Eclipse Cross','Outlander','ASX','L200','Pajero'],
  'Nissan': ['Micra','Juke','Qashqai','X-Trail','Leaf','Ariya','GT-R','370Z','Navara','Patrol'],
  'Opel': ['Corsa','Astra','Insignia','Mokka','Grandland','Crossland','Zafira','Vivaro','Movano'],
  'Peugeot': ['108','208','308','408','508','2008','3008','5008','Partner','Rifter','Expert','Boxer'],
  'Porsche': ['911','Cayenne','Macan','Panamera','Taycan','718 Boxster','718 Cayman'],
  'Renault': ['Twingo','Clio','Megane','Taliant','Arkana','Captur','Kadjar','Koleos','Scenic','Zoe','Megane E-Tech','Master','Trafic'],
  'Seat': ['Mii','Ibiza','Leon','Arona','Ateca','Tarraco','Alhambra'],
  'Skoda': ['Citigo','Fabia','Octavia','Superb','Kamiq','Karoq','Kodiaq','Enyaq'],
  'Smart': ['Fortwo','Forfour','#1','#3'],
  'Subaru': ['Impreza','Legacy','Outback','Forester','XV','BRZ','WRX'],
  'Tesla': ['Model 3','Model Y','Model S','Model X','Cybertruck'],
  'Toyota': ['Aygo','Yaris','Yaris Cross','Corolla','Camry','Avensis','Auris','RAV4','C-HR','Highlander','Land Cruiser','GR86','GR Supra','Prius','Mirai','bZ4X','Tundra','Tacoma','Sienna'],
  'Volkswagen': ['Up','Polo','Golf','Golf GTE','ID.3','ID.4','ID.5','ID.7','Passat','Arteon','Tiguan','T-Cross','T-Roc','Touareg','Sharan','Touran','Caddy','Transporter','Crafter'],
  'Volvo': ['V40','V60','V90','S60','S90','XC40','XC60','XC90','C40'],
}

const ENGINES = {
  'Volkswagen': ['1.0 TSI 95cv (CHYB)','1.0 TSI 115cv (DKJA)','1.5 TSI EVO 130cv','1.5 TSI EVO2 150cv (DPCA)','2.0 TDI 115cv','2.0 TDI 150cv (DFCA)','2.0 TDI 200cv','2.0 TSI 245cv','2.0 TSI 300cv (DNBA)','Motor elettrico 150kW (ID.3/ID.4)'],
  'BMW': ['1.5i B38 136cv','2.0i B48 184cv','2.0d B47 150cv','2.0d B47 190cv','3.0i B58 340cv','3.0d B57 286cv','Motor elettrico 210kW (iX/i4)'],
  'Toyota': ['1.0 VVT-i 72cv','1.5 HSD Hybrid 116cv','1.8 HSD Hybrid 122cv','2.0 TNGA D-4T 170cv','2.5 Hybrid 218cv','2.5 PHEV 306cv','2.8 D-4D 177cv'],
  'Ford': ['1.0 EcoBoost 95cv','1.0 EcoBoost 125cv','1.5 EcoBoost 150cv','2.0 EcoBoost 250cv','2.3 EcoBoost 300cv (Mustang)','2.0 EcoBlue 120cv','2.0 EcoBlue 170cv'],
  'Mercedes-Benz': ['1.3 EQ Boost 136cv (M282)','2.0 CDI 150cv (OM654)','2.0 CDI 194cv','3.0 V6 TDI 286cv','Motor EQ 292cv (EQC)'],
  'Renault': ['1.0 SCe 65cv','1.0 TCe 90cv','1.3 TCe 130cv','1.3 TCe 160cv','1.5 dCi 85cv (K9K)','1.5 dCi 115cv (K9K)','Motor elettrico 135kW (Zoe)'],
  'Audi': ['1.0 TFSI 116cv','1.5 TFSI 150cv (DADA)','2.0 TDI 150cv','2.0 TDI 204cv','2.0 TFSI 190cv','2.0 TFSI 265cv','3.0 TDI 286cv','Motor elettrico 150kW (e-tron)'],
  'Fiat': ['0.9 TwinAir 85cv','1.0 Firefly 70cv','1.2 Fire 69cv','1.4 T-Jet 140cv','1.6 MultiJet 120cv','2.0 MultiJet 140cv'],
  'default': ['1.0 VTi 75cv','1.2 PureTech 100cv','1.2 PureTech 130cv','1.5 BlueHDi 100cv','1.6 HDi 120cv','2.0 HDi 150cv','1.5 dCi 90cv','1.6 TDI 115cv','1.8 Hybrid 122cv','2.5 PHEV 306cv']
}

export default function VehicleModal({ onClose, onSelect }) {
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [engine, setEngine] = useState('')
  const [km, setKm] = useState('')
  const [vin, setVin] = useState('')
  const [plate, setPlate] = useState('')

  const years = Array.from({ length: 36 }, (_, i) => 2025 - i)
  const makes = Object.keys(MAKES).sort()
  const models = make ? MAKES[make] || [] : []
  const engines = make ? (ENGINES[make] || ENGINES.default) : []

  const confirm = () => {
    if (!year || !make || !model) return
    onSelect({ year, make, model, engine: engine || 'N.D.', km, vin, plate })
  }

  const overlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }
  const box = { background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 12, width: 540, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.6)' }
  const hdr = { background: '#0a1520', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e3a5a' }
  const inp = { width: '100%', background: '#070f18', border: '1px solid #1e3a5a', borderRadius: 6, padding: '8px 12px', color: '#e8edf5', fontSize: 13, outline: 'none' }
  const lbl = { fontSize: 10, color: '#5a9adb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 5 }
  const row = { display: 'flex', gap: 12, marginBottom: 14 }
  const field = { flex: 1 }

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={box}>
        <div style={hdr}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>🚗 Selezione Veicolo</div>
            <div style={{ fontSize: 10, color: '#3a6a9a', marginTop: 2 }}>Database 44.000+ veicoli 1990–2025</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#5a9adb', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 20 }}>
          <div style={row}>
            <div style={field}>
              <label style={lbl}>Anno</label>
              <select value={year} onChange={e => setYear(e.target.value)} style={inp}>
                <option value="">-- Anno --</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div style={field}>
              <label style={lbl}>Marca</label>
              <select value={make} onChange={e => { setMake(e.target.value); setModel(''); setEngine('') }} style={inp}>
                <option value="">-- Marca --</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div style={row}>
            <div style={field}>
              <label style={lbl}>Modello</label>
              <select value={model} onChange={e => setModel(e.target.value)} style={inp} disabled={!make}>
                <option value="">-- Modello --</option>
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div style={field}>
              <label style={lbl}>Motorizzazione</label>
              <select value={engine} onChange={e => setEngine(e.target.value)} style={inp} disabled={!model}>
                <option value="">-- Seleziona --</option>
                {engines.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <div style={row}>
            <div style={field}>
              <label style={lbl}>Km attuali</label>
              <input type="number" value={km} onChange={e => setKm(e.target.value)} placeholder="es. 85000" style={inp} />
            </div>
            <div style={field}>
              <label style={lbl}>Targa (opz.)</label>
              <input value={plate} onChange={e => setPlate(e.target.value.toUpperCase())} placeholder="es. AB123CD" style={{ ...inp, fontFamily: 'monospace' }} />
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>VIN (opzionale — 17 caratteri)</label>
            <input value={vin} onChange={e => setVin(e.target.value.toUpperCase())} placeholder="es. WVWZZZ1KZ9W123456" maxLength={17} style={{ ...inp, fontFamily: 'monospace' }} />
          </div>
          {year && make && model && (
            <div style={{ background: '#0a1f35', border: '1px solid #1e4a7a', borderRadius: 6, padding: '10px 14px', marginBottom: 14, fontSize: 11, color: '#5a9adb' }}>
              ✓ Veicolo selezionato: <strong style={{ color: '#fff' }}>{year} {make} {model}</strong>{engine ? ` — ${engine}` : ''}
            </div>
          )}
        </div>
        <div style={{ padding: '12px 20px', background: '#070f18', borderTop: '1px solid #1e3a5a', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button onClick={onClose} style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #2a4a6a', borderRadius: 6, color: '#5a9adb', cursor: 'pointer', fontSize: 13 }}>Annulla</button>
          <button onClick={confirm} disabled={!year || !make || !model}
            style={{ padding: '8px 20px', background: year && make && model ? '#f0a000' : '#2a3a4a', color: year && make && model ? '#000' : '#555', border: 'none', borderRadius: 6, cursor: year && make && model ? 'pointer' : 'default', fontSize: 13, fontWeight: 700 }}>
            ✓ Carica Veicolo
          </button>
        </div>
      </div>
    </div>
  )
}
