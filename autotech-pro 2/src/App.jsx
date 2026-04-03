import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Repair from './pages/Repair.jsx'
import ProcedureDetail from './pages/ProcedureDetail.jsx'
import DiagramPage from './pages/DiagramPage.jsx'
import DtcScanner from './pages/DtcScanner.jsx'
import RecallPage from './pages/RecallPage.jsx'
import Gestionale from './pages/Gestionale.jsx'
import PartsPage from './pages/PartsPage.jsx'
import MaintenancePage from './pages/MaintenancePage.jsx'
import VehicleModal from './components/VehicleModal.jsx'
import Toast from './components/Toast.jsx'

export default function App() {
  const [page, setPage] = useState('home')
  const [vehicle, setVehicle] = useState(null)
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  const [selectedProc, setSelectedProc] = useState(null)
  const [toast, setToast] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const showToast = (msg, type = 'ok') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const nav = (p) => { setPage(p); setSelectedProc(null) }

  const ctx = { vehicle, setVehicle, showVehicleModal: () => setShowVehicleModal(true), nav, showToast, selectedProc, setSelectedProc }

  const pages = {
    home: <Home {...ctx} />,
    repair: <Repair {...ctx} />,
    procedure: <ProcedureDetail {...ctx} />,
    diagram: <DiagramPage {...ctx} />,
    dtc: <DtcScanner {...ctx} />,
    recall: <RecallPage {...ctx} />,
    gestionale: <Gestionale {...ctx} />,
    parts: <PartsPage {...ctx} />,
    maintenance: <MaintenancePage {...ctx} />,
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0f1923', color: '#e8edf5' }}>
      <Sidebar page={page} nav={nav} vehicle={vehicle} open={sidebarOpen} setOpen={setSidebarOpen} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header vehicle={vehicle} page={page} nav={nav} onVehicle={() => setShowVehicleModal(true)} onToggleSidebar={() => setSidebarOpen(o => !o)} showToast={showToast} />
        <main style={{ flex: 1, overflowY: 'auto', background: '#111c27' }}>
          {pages[page] || pages.home}
        </main>
      </div>
      {showVehicleModal && <VehicleModal onClose={() => setShowVehicleModal(false)} onSelect={v => { setVehicle(v); setShowVehicleModal(false); showToast(`✅ ${v.year} ${v.make} ${v.model} caricato`, 'ok'); nav('repair') }} />}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  )
}
