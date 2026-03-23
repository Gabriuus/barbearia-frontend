"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", password_confirmation: "",
    phone: "", address: "", city: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await api.post("/register", formData);
      setSuccess(true);
      setTimeout(() => window.location.href = "/", 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro no cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#050505]">
       <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-[120px] pointer-events-none" />
       
       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel w-full max-w-lg p-8 rounded-2xl z-10">
          <h1 className="text-2xl font-bold text-white mb-2">Criar Conta VIP</h1>
          <p className="text-gray-400 text-sm mb-6">Preencha seus dados reais para reservar seu lugar na barbearia.</p>
          
          {success ? (
             <div className="text-green-400 bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-center font-medium">Sua conta foi criada no banco de dados! Redirecionando para login...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Nome Completo</label>
                   <input required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 mt-1 text-white outline-none focus:border-blue-500/50 interactive-glow" 
                          onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Telefone</label>
                   <input required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 mt-1 text-white outline-none focus:border-blue-500/50 interactive-glow" 
                          onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              
              <div>
                   <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Endereço de E-mail</label>
                   <input type="email" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 mt-1 text-white outline-none focus:border-blue-500/50 interactive-glow" 
                          onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Endereço (Rua)</label>
                   <input required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 mt-1 text-white outline-none focus:border-blue-500/50 interactive-glow" 
                          onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Cidade</label>
                   <input required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 mt-1 text-white outline-none focus:border-blue-500/50 interactive-glow" 
                          onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Senha Oculta</label>
                   <input type="password" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 mt-1 text-white outline-none focus:border-blue-500/50 interactive-glow" 
                          onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Confirmar Senha</label>
                   <input type="password" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 mt-1 text-white outline-none focus:border-blue-500/50 interactive-glow" 
                          onChange={e => setFormData({...formData, password_confirmation: e.target.value})} />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
              
              <button disabled={loading} type="submit" className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl interactive-glow transition-all disabled:opacity-50">
                 {loading ? "Cadastrando API..." : "Registar e Habilitar Login"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
             <p className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors" onClick={() => window.location.href = "/"}>Já possui conta? <span className="text-blue-400">Fazer login</span></p>
          </div>
       </motion.div>
    </main>
  );
}
