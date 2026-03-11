import React from 'react';
import { AlertTriangle, Navigation, Phone, Shield, Heart, Info } from 'lucide-react';
import { motion } from 'motion/react';

const SafetyTips: React.FC = () => {
  const tips = [
    {
      id: 1,
      title: "Avoid Isolated Areas",
      description: "Stay in well-lit, populated areas, especially at night. Research safe neighborhoods before you go.",
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />
    },
    {
      id: 2,
      title: "Share Your Location",
      description: "Always let a trusted friend or family member know where you are and your expected return time.",
      icon: <Navigation className="w-6 h-6 text-blue-500" />
    },
    {
      id: 3,
      title: "Emergency Contacts",
      description: "Keep a list of local emergency numbers and your country's embassy contact info saved offline.",
      icon: <Phone className="w-6 h-6 text-red-500" />
    },
    {
      id: 4,
      title: "Stay Alert",
      description: "Be aware of your surroundings in crowded places. Keep your valuables in a secure, hidden place.",
      icon: <Shield className="w-6 h-6 text-teal-500" />
    },
    {
      id: 5,
      title: "Digital Safety",
      description: "Avoid using public Wi-Fi for sensitive transactions. Use a VPN and keep your devices password-protected.",
      icon: <Shield className="w-6 h-6 text-indigo-500" />
    },
    {
      id: 6,
      title: "Health Precautions",
      description: "Carry basic first aid and know the location of the nearest hospital or clinic in your area.",
      icon: <Heart className="w-6 h-6 text-rose-500" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-bold text-slate-900">Essential Safety Tips</h2>
        <p className="mt-4 text-lg text-slate-600">Proactive measures to keep you secure during your travels.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={tip.id}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
          >
            <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              {tip.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{tip.title}</h3>
            <p className="text-slate-600 leading-relaxed">{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SafetyTips;
