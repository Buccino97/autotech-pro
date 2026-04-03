import React from 'react'

export default function Toast({ msg, type }) {
  const colors = { ok: '#1a7a1a', err: '#cc2222', warn: '#a06000', info: '#1a4a8a' }
  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 24, background: '#0d1e30',
      border: '1px solid #1e3a5a', borderLeft: `4px solid ${colors[type] || '#f0a000'}`,
      borderRadius: 8, padding: '10px 18px', fontSize: 13, color: '#e8edf5',
      zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,.5)', maxWidth: 360,
      animation: 'fadeIn .2s ease',
    }}>
      {msg}
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </div>
  )
}
