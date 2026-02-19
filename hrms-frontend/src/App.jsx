import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Users, 
  ClipboardCheck, 
  Trash2, 
  PlusCircle, 
  LayoutDashboard 
} from 'lucide-react';

// Import your reusable components
import { LoadingState, EmptyState } from './components/StatusMessages';
import { ConfirmModal } from './components/ConfirmModal';

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [activeTab, setActiveTab] = useState('employees');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [selectedHistoryName, setSelectedHistoryName] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form States
  const [empForm, setEmpForm] = useState({ employee_id: '', name: '', email: '', department: '' });
  const [attForm, setAttForm] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/employees/`);
      setEmployees(res.data);
    } catch (err) {
      toast.error("Could not load employees from server");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/employees/`, empForm);
      toast.success("Employee added successfully!");
      setEmpForm({ employee_id: '', name: '', email: '', department: '' });
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to add employee");
    }
  };

  // Trigger Modal instead of native alert
  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/employees/${deleteTargetId}`);
      toast.info("Employee record removed");
      fetchEmployees();
    } catch (err) {
      toast.error("Deletion failed");
    } finally {
      setIsModalOpen(false);
      setDeleteTargetId(null);
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/attendance/`, attForm);
      toast.success(`Attendance marked for ${attForm.employee_id}`);
      setAttForm({ ...attForm, employee_id: '' });
    } catch (err) {
      toast.error(err.response?.data?.detail || "Attendance error");
    }
  };

  const fetchAttendanceHistory = async (empId) => {
    if (!empId) {
      setAttendanceHistory([]);
      setSelectedHistoryName('');
      return;
    }
    const selectedEmp = employees.find(e => e.employee_id === empId);
    setSelectedHistoryName(selectedEmp ? selectedEmp.name : '');

    try {
      const res = await axios.get(`${API_BASE}/attendance/${empId}`);
      setAttendanceHistory(res.data);
    } catch (err) {
      toast.error("Could not load attendance history");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-xl sticky top-0 h-screen">
        <div className="p-6 text-xl font-bold tracking-tight border-b border-indigo-800 flex items-center gap-2">
          <LayoutDashboard className="text-indigo-400" />
          <span>HRMS <span className="text-indigo-400">Lite</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('employees')}
            className={`flex items-center w-full gap-3 p-3 rounded-lg transition-all ${activeTab === 'employees' ? 'bg-indigo-700 shadow-inner' : 'hover:bg-indigo-800'}`}>
            <Users size={20} /> Employees
          </button>
          <button onClick={() => setActiveTab('attendance')}
            className={`flex items-center w-full gap-3 p-3 rounded-lg transition-all ${activeTab === 'attendance' ? 'bg-indigo-700 shadow-inner' : 'hover:bg-indigo-800'}`}>
            <ClipboardCheck size={20} /> Attendance
          </button>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === 'employees' ? (
          <div className="max-w-5xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-indigo-950">Employee Directory</h1>
              <p className="text-gray-500">Manage your staff records and details.</p>
            </header>

            <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-t-indigo-600 border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-900">
                <PlusCircle size={18} /> Add New Employee
              </h3>
              <form onSubmit={handleAddEmployee} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input required placeholder="ID (e.g. EMP01)" className="border-2 border-gray-50 p-2.5 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 outline-none transition-all" value={empForm.employee_id} onChange={e => setEmpForm({ ...empForm, employee_id: e.target.value })} />
                <input required placeholder="Full Name" className="border-2 border-gray-50 p-2.5 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 outline-none transition-all" value={empForm.name} onChange={e => setEmpForm({ ...empForm, name: e.target.value })} />
                <input required type="email" placeholder="Email" className="border-2 border-gray-50 p-2.5 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 outline-none transition-all" value={empForm.email} onChange={e => setEmpForm({ ...empForm, email: e.target.value })} />
                <input required placeholder="Department" className="border-2 border-gray-50 p-2.5 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 outline-none transition-all" value={empForm.department} onChange={e => setEmpForm({ ...empForm, department: e.target.value })} />
                <button className="md:col-span-4 bg-indigo-600 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Save Employee</button>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              {loading ? <LoadingState /> : (
                <>
                  {employees.length > 0 ? (
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                        <tr>
                          <th className="px-6 py-4">ID</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Department</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {employees.map(emp => (
                          <tr key={emp.employee_id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-bold">{emp.employee_id}</td>
                            <td className="px-6 py-4 font-medium">{emp.name}</td>
                            <td className="px-6 py-4 text-gray-600">{emp.department}</td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => triggerDelete(emp.employee_id)} className="text-red-400 hover:text-red-600 p-2">
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : <EmptyState message="No employees found." />}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-8">
            <header className="text-center">
              <h1 className="text-3xl font-bold text-indigo-950">Attendance Control</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-t-indigo-600 border border-gray-100">
                <h3 className="text-xl font-bold mb-6 text-indigo-900 flex items-center gap-2"><PlusCircle size={20} /> Mark Status</h3>
                <form onSubmit={handleMarkAttendance} className="space-y-4">
                  <select required className="w-full border-2 border-gray-50 p-3 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 outline-none transition-all" value={attForm.employee_id} onChange={e => setAttForm({ ...attForm, employee_id: e.target.value })}>
                    <option value="">Select Employee...</option>
                    {employees.map(e => <option key={e.employee_id} value={e.employee_id}>{e.name}</option>)}
                  </select>
                  <input type="date" className="w-full border-2 border-gray-50 p-3 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 outline-none transition-all" value={attForm.date} onChange={e => setAttForm({ ...attForm, date: e.target.value })} />
                  <select className="w-full border-2 border-gray-50 p-3 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 outline-none transition-all" value={attForm.status} onChange={e => setAttForm({ ...attForm, status: e.target.value })}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                  <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg">Submit Entry</button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-t-emerald-500 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-emerald-900 flex items-center gap-2"><ClipboardCheck size={20} /> View History</h3>
                  {selectedHistoryName && <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedHistoryName}</span>}
                </div>
                <select className="w-full border-2 border-gray-50 p-3 rounded-xl bg-gray-50 mb-6 focus:bg-white focus:border-emerald-500 outline-none transition-all" onChange={(e) => fetchAttendanceHistory(e.target.value)}>
                  <option value="">Choose Personnel...</option>
                  {employees.map(e => <option key={e.employee_id} value={e.employee_id}>{e.name}</option>)}
                </select>
                <div className="overflow-y-auto max-h-[260px] border-2 border-gray-50 rounded-xl">
                  {attendanceHistory.length > 0 ? (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 sticky top-0 border-b-2 border-gray-100">
                        <tr><th className="p-4 font-bold">Date</th><th className="p-4 font-bold">Status</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {attendanceHistory.map((rec, idx) => (
                          <tr key={idx}>
                            <td className="p-4">{rec.date}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${rec.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{rec.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : <EmptyState message="Select personnel to view history." />}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* REUSABLE MODAL */}
      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Employee?"
        message={`Are you sure you want to delete ${deleteTargetId}? All associated attendance records will remain in the database history.`}
      />
    </div>
  );
}

export default App;