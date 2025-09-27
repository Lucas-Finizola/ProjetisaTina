import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonialsData = [
  {
    name: "Carlos Silva",
    role: "Empresário",
    content: "Minha empresa economiza R$ 3.500 por mês com a energia solar da Projetisa. Investimento que se pagou em 3 anos!",
    rating: 5,
    savings: "R$ 3.500/mês"
  },
  {
    name: "Ana Santos",
    role: "Proprietária Residencial",
    content: "Conta de luz que era R$ 450 agora é apenas R$ 35. Recomendo a Projetisa para todos!",
    rating: 5,
    savings: "92% de economia"
  },
  {
    name: "João Oliveira",
    role: "Fazendeiro",
    content: "Sistema rural perfeito! Energia para toda a propriedade e ainda sobra para vender energia.",
    rating: 5,
    savings: "100% independente"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Clientes Reais, Economias Reais
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos clientes satisfeitos têm a dizer sobre a Projetisa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                \"{testimonial.content}\"
              </p>
              <p className="font-semibold text-gray-900">
                {testimonial.name}, <span className="text-gray-600">{testimonial.role}</span>
              </p>
              <p className="text-green-600 font-bold mt-2">
                Economia: {testimonial.savings}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
