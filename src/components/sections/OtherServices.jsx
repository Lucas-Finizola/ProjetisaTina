import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building,
  Zap,
  Construction,
  ArrowRight
} from 'lucide-react';

const otherServicesData = [
  {
    icon: <Building className="w-10 h-10" />,
    title: "Montagens e Estruturas",
    description: "Soluções completas para estruturas de solo, conexão em média tensão e mais."
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Redes e Subestações",
    description: "Implantação e montagem de redes subterrâneas, subestações abrigadas e aéreas."
  },
  {
    icon: <Construction className="w-10 h-10" />,
    title: "Obras de Infraestrutura",
    description: "Executamos desde a escavação mecanizada até a construção de redes de distribuição completas."
  }
];

const OtherServices = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Soluções Completas em Engenharia Elétrica
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Além da energia solar, oferecemos um portfólio completo para grandes projetos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {otherServicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="text-green-600 mb-5 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
          >
              <Link 
                to="/services"
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg inline-flex items-center"
              >
                <span>Conheça Todos os Serviços</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OtherServices;
