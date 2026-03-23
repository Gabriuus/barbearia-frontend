"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { LogOut, Calendar, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  const [schedulings, setSchedulings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedulings();
  }, []);

  const fetchSchedulings = async () => {
    try {
      const response = await api.get("/client/schedulings");
      setSchedulings(response.data.data || []);
    } catch (err: any) {
      if (err.response?.status === 401) {
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
    <main className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <header className="flex justify-between items-center mb-8 glass-panel p-4 md:p-6 rounded-2xl">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-3">
            <span className="p-2 bg-blue-500/20 rounded-lg"><Calendar className="text-blue-400 w-6 h-6" /></span>
            Meus Agendamentos
          </h1>
          <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </header>
        
        {loading ? (
          <div className="text-center text-gray-400 h-64 flex items-center justify-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-4">
             {schedulings.length === 0 ? (
               <div className="glass-panel text-center text-gray-400 py-16 rounded-2xl border-dashed border-2 border-white/5">
                 Você não possui nenhum agendamento futuro.
               </div>
             ) : (
               schedulings.map((sched: any, index: number) => (
                 <motion.div 
                   initial={{opacity: 0, y: 20}} 
                   animate={{opacity: 1, y: 0}} 
                   transition={{ delay: index * 0.1 }}
                   key={sched.id} 
                   className="glass-panel p-6 rounded-xl flex justify-between items-center hover:border-blue-500/30 transition-colors interactive-glow cursor-pointer"
                 >
                   <div>
                     <p className="font-bold text-lg md:text-xl text-white">
                       {new Date(sched.start_date).toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' })}
                     </p>
                     <p className="text-blue-400 text-sm mt-1 uppercase tracking-wider font-semibold">Status: Confirmado</p>
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
