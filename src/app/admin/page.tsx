"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { LogOut, Calendar, Users, Shield } from "lucide-react";

export default function AdminDashboard() {
  const [schedulings, setSchedulings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedulings();
  }, []);

  const fetchSchedulings = async () => {
    try {
      const response = await api.get("/admin/schedulings");
      setSchedulings(response.data.data || []);
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("barbearia_token");
        window.location.href = "/";
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {}
    localStorage.removeItem("barbearia_token");
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-[#050505]">
      {/* Background Decorative Blur for Admin */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto z-10 relative">
        <header className="flex justify-between items-center mb-8 glass-panel p-4 md:p-6 rounded-2xl border-amber-500/20">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-amber-500">
            <span className="p-2 bg-amber-500/10 rounded-lg"><Shield className="w-6 h-6" /></span>
            Painel do Administrador
          </h1>
          <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
           <div className="glass-panel p-6 rounded-xl border-t-2 border-t-amber-500/50">
              <h3 className="text-gray-400 font-medium">Total de Agendamentos</h3>
              <p className="text-4xl font-bold text-white mt-2">{schedulings.length}</p>
           </div>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-amber-400"/> Visão Geral de Horários</h2>
        
        {loading ? (
          <div className="text-center text-gray-400 h-64 flex items-center justify-center glass-panel rounded-2xl">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid gap-4">
             {schedulings.length === 0 ? (
               <div className="glass-panel text-center text-gray-400 py-16 rounded-2xl border-dashed border-2 border-white/5">
                 Nenhum agendamento registrado no sistema.
               </div>
             ) : (
               schedulings.map((sched: any, index: number) => (
                 <motion.div 
                   initial={{opacity: 0, y: 20}} 
                   animate={{opacity: 1, y: 0}} 
                   transition={{ delay: index * 0.05 }}
                   key={sched.id} 
                   className="glass-panel p-5 md:p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between hover:border-amber-500/30 transition-colors"
                 >
                   <div>
                     <p className="font-bold text-lg text-white">
                       {new Date(sched.start_date).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
                     </p>
                     <p className="text-amber-400 text-sm mt-1 uppercase tracking-wider font-semibold">Cliente ID: <span className="text-gray-400 lowercase">{sched.client_id}</span></p>
                   </div>
                   <div className="mt-4 md:mt-0 px-4 py-2 bg-black/40 rounded-lg border border-white/5 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Término: {new Date(sched.end_date).toLocaleTimeString('pt-BR', {timeStyle: 'short'})}
                   </div>
                 </motion.div>
               ))
             )}
          </div>
        )}
      </div>
    </main>
  );
}
