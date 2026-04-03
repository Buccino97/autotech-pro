// PrintService.jsx — Stampa PDF ordini di lavoro e procedure
import React, { useRef } from 'react'

export function PrintWorkOrder({ order, onClose }) {
  const ref = useRef()

  const doPrint = () => {
    const w = window.open('', '_blank')
    w.document.write(`
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
        <title>Ordine di Lavoro ${order.id}</title>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; padding: 30px; font-size: 12px; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #1a4a8a; padding-bottom: 16px; margin-bottom: 20px; }
          .logo { font-size: 28px; font-weight: 900; color: #1a4a8a; letter-spacing: -1px; }
          .logo span { color: #f0a000; }
          .logo-sub { font-size: 10px; color: #888; letter-spacing: 2px; margin-top: 2px; }
          .wo-id { font-size: 22px; font-weight: 700; color: #1a4a8a; font-family: monospace; }
          .wo-date { font-size: 11px; color: #888; margin-top: 4px; }
          .section { margin-bottom: 18px; }
          .section-title { font-size: 11px; font-weight: 700; color: #1a4a8a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-bottom: 10px; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .field { margin-bottom: 8px; }
          .field-label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 2px; }
          .field-value { font-size: 13px; color: #222; font-weight: 500; }
          .work-box { background: #f8f9fa; border: 1px solid #ddd; border-radius: 4px; padding: 12px; font-size: 13px; line-height: 1.6; min-height: 60px; }
          .status-badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; background: #e8f8e8; color: #1a6a1a; border: 1px solid #4aaa4a; }
          .total-box { background: #1a4a8a; color: #fff; border-radius: 6px; padding: 14px 18px; text-align: right; }
          .total-label { font-size: 11px; opacity: 0.7; }
          .total-val { font-size: 28px; font-weight: 900; margin-top: 2px; }
          .sign-area { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 30px; }
          .sign-line { border-bottom: 1px solid #aaa; padding-bottom: 4px; font-size: 10px; color: #888; text-align: center; margin-top: 40px; }
          .footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #ddd; font-size: 10px; color: #aaa; text-align: center; }
          @media print { body { padding: 15px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">AUTO<span>TECH</span> PRO</div>
            <div class="logo-sub">GESTIONALE OFFICINA</div>
          </div>
          <div style="text-align:right;">
            <div class="wo-id">${order.id}</div>
            <div class="wo-date">${new Date().toLocaleDateString('it-IT', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</div>
          </div>
        </div>

        <div class="grid-2">
          <div class="section">
            <div class="section-title">👤 Dati Cliente</div>
            <div class="field"><div class="field-label">Nome e Cognome</div><div class="field-value">${order.cliente || '—'}</div></div>
            <div class="field"><div class="field-label">Telefono</div><div class="field-value">${order.tel || '—'}</div></div>
          </div>
          <div class="section">
            <div class="section-title">🚗 Veicolo</div>
            <div class="field"><div class="field-label">Veicolo</div><div class="field-value">${order.veicolo || '—'}</div></div>
            <div class="field"><div class="field-label">Targa</div><div class="field-value" style="font-family:monospace;font-size:15px;font-weight:700;">${order.targa || '—'}</div></div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">🔧 Lavoro Richiesto</div>
          <div class="work-box">${order.lavoro || '—'}</div>
        </div>

        <div class="grid-2">
          <div class="section">
            <div class="section-title">👷 Tecnico Assegnato</div>
            <div class="field-value" style="font-size:15px;font-weight:600;">${order.tecnico || '—'}</div>
          </div>
          <div class="section">
            <div class="section-title">📊 Stato</div>
            <span class="status-badge">${{ completed:'Completato', progress:'In Lavorazione', waiting:'In Attesa', scheduled:'Programmato' }[order.stato] || order.stato}</span>
          </div>
        </div>

        ${order.note ? `<div class="section"><div class="section-title">📝 Note Tecniche</div><div class="work-box">${order.note}</div></div>` : ''}

        <div class="total-box">
          <div class="total-label">TOTALE INTERVENTO</div>
          <div class="total-val">€ ${(order.totale || 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}</div>
        </div>

        <div class="sign-area">
          <div><div class="sign-line">Firma Cliente</div></div>
          <div><div class="sign-line">Firma Tecnico / Timbro</div></div>
        </div>

        <div class="footer">
          AutoTech Pro — Gestionale Officina · Documento generato il ${new Date().toLocaleString('it-IT')}
        </div>
      </body>
      </html>
    `)
    w.document.close()
    setTimeout(() => { w.focus(); w.print(); }, 500)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }}>
      <div style={{ background: '#0d1e30', border: '1px solid #1e3a5a', borderRadius: 10, width: 460, overflow: 'hidden' }}>
        <div style={{ background: '#0a1520', padding: '12px 16px', borderBottom: '1px solid #1e3a5a', fontSize: 14, fontWeight: 700, color: '#fff' }}>
          🖨️ Stampa Ordine di Lavoro — {order.id}
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ background: '#070f18', border: '1px solid #1e3a5a', borderRadius: 8, padding: 16, marginBottom: 16, fontSize: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div><div style={{ color: '#4a7aaa', fontSize: 10, marginBottom: 2 }}>CLIENTE</div><div style={{ color: '#fff', fontWeight: 600 }}>{order.cliente}</div></div>
              <div><div style={{ color: '#4a7aaa', fontSize: 10, marginBottom: 2 }}>VEICOLO</div><div style={{ color: '#c8d8e8' }}>{order.veicolo}</div></div>
              <div><div style={{ color: '#4a7aaa', fontSize: 10, marginBottom: 2 }}>TARGA</div><div style={{ color: '#fff', fontFamily: 'monospace' }}>{order.targa}</div></div>
              <div><div style={{ color: '#4a7aaa', fontSize: 10, marginBottom: 2 }}>TOTALE</div><div style={{ color: '#f0a000', fontWeight: 700 }}>€ {order.totale?.toLocaleString('it-IT')}</div></div>
            </div>
            <div style={{ marginTop: 10 }}><div style={{ color: '#4a7aaa', fontSize: 10, marginBottom: 2 }}>LAVORO</div><div style={{ color: '#8ab8de', fontSize: 11 }}>{order.lavoro}</div></div>
          </div>
          <div style={{ fontSize: 11, color: '#3a6a9a', marginBottom: 16 }}>
            Il documento verrà aperto in una nuova finestra. Usa Ctrl+P o il pulsante Stampa del browser per stampare o salvare come PDF.
          </div>
        </div>
        <div style={{ padding: '10px 16px', background: '#070f18', borderTop: '1px solid #1e3a5a', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #2a4a6a', borderRadius: 6, color: '#5a9adb', cursor: 'pointer', fontSize: 12 }}>Annulla</button>
          <button onClick={doPrint} style={{ padding: '8px 20px', background: '#1a4a8a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>🖨️ Apri e Stampa PDF</button>
        </div>
      </div>
    </div>
  )
}

export function printProcedure(proc, vehicle) {
  const w = window.open('', '_blank')
  w.document.write(`
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="UTF-8">
      <title>${proc.title}</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; padding: 30px; font-size: 12px; line-height: 1.6; }
        .header { border-bottom: 3px solid #1a4a8a; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; }
        .logo { font-size: 22px; font-weight: 900; color: #1a4a8a; }
        .logo span { color: #f0a000; }
        h1 { font-size: 18px; color: #1a4a8a; margin: 0 0 4px; }
        .vehicle { font-size: 12px; color: #666; margin-bottom: 16px; }
        .warn { background: #fff8e0; border: 1px solid #d09000; border-left: 4px solid #d09000; padding: 8px 12px; margin-bottom: 12px; font-size: 11px; color: #705000; border-radius: 0 4px 4px 0; }
        .warn.critical { background: #fff0f0; border-color: #cc2222; color: #8a1010; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        th { background: #1a4a8a; color: #fff; padding: 6px 10px; text-align: left; font-size: 10px; }
        td { padding: 5px 10px; border-bottom: 1px solid #eee; font-size: 11px; }
        tr:nth-child(even) td { background: #f8f8f8; }
        .step { display: flex; gap: 10px; padding: 7px 0; border-bottom: 1px solid #f0f0f0; page-break-inside: avoid; }
        .step-n { min-width: 24px; height: 24px; background: #1a4a8a; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
        .section-title { font-size: 12px; font-weight: 700; color: #1a4a8a; border-bottom: 2px solid #1a4a8a; padding-bottom: 4px; margin: 16px 0 10px; }
        .parts ul { padding-left: 20px; font-size: 11px; line-height: 2; }
        .footer { margin-top: 24px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 10px; color: #aaa; text-align: center; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo">AUTO<span>TECH</span> PRO</div>
          <div style="font-size:9px;color:#888;letter-spacing:1px;">GESTIONALE OFFICINA</div>
        </div>
        <div style="text-align:right;font-size:11px;color:#888;">${new Date().toLocaleDateString('it-IT', { year:'numeric', month:'long', day:'numeric' })}</div>
      </div>

      <h1>${proc.title}</h1>
      ${vehicle ? `<div class="vehicle">🚗 ${vehicle.year} ${vehicle.make} ${vehicle.model} — ${vehicle.engine || ''}</div>` : ''}

      ${proc.warnings ? proc.warnings.map(w => `<div class="warn ${w.type === 'critical' ? 'critical' : ''}">${w.text}</div>`).join('') : ''}

      ${proc.specs?.length ? `
        <div class="section-title">📐 Specifiche Tecniche OEM</div>
        <table>
          <thead><tr><th>Parametro</th><th>Valore</th></tr></thead>
          <tbody>${proc.specs.map(([k,v]) => `<tr><td>${k}</td><td><strong>${v}</strong></td></tr>`).join('')}</tbody>
        </table>
      ` : ''}

      <div class="section-title">🔧 Procedura (${proc.steps?.length || 0} passi)</div>
      ${proc.steps?.map((s, i) => `
        <div class="step">
          <div class="step-n">${i+1}</div>
          <div>${s}</div>
        </div>
      `).join('') || ''}

      ${proc.parts?.length ? `
        <div class="section-title parts">🔩 Parti Necessarie</div>
        <div class="parts"><ul>${proc.parts.map(p => `<li>${p}</li>`).join('')}</ul></div>
      ` : ''}

      <div class="footer">
        AutoTech Pro · Procedura OEM · Generata il ${new Date().toLocaleString('it-IT')} · Seguire sempre le norme di sicurezza vigenti
      </div>
    </body>
    </html>
  `)
  w.document.close()
  setTimeout(() => { w.focus(); w.print(); }, 500)
}
