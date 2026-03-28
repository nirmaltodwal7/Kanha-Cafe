'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Leaf, Award, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Made with Love',
    desc: 'Every recipe is a labour of love passed down through generations, adapted with modern technique.',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    desc: 'We source locally, choose seasonal, and refuse artificial preservatives — always.',
  },
  {
    icon: Award,
    title: 'Award-Winning',
    desc: 'Recognised as Rajasthan Best Artisan Bakery for three consecutive years.',
  },
  {
    icon: Users,
    title: 'Community First',
    desc: 'Proudly employing 40+ local artisans, supporting farmers and the community we call home.',
  },
];

const team = [
  {
    name: 'Mohan Sharma',
    role: 'Founder & Head Baker',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&q=80',
    bio: 'Trained in Vienna and Paris before bringing his craft back to Ajmer in 2008.',
  },
  {
    name: 'Sunita Sharma',
    role: 'Pastry Chef & Co-founder',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&q=80',
    bio: 'The creative force behind our pastry line — an artist who speaks in butter and flour.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Cake Designer',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=300&q=80',
    bio: 'Brings sculptural artistry to every celebration cake — no two are ever alike.',
  },
];

const milestones = [
  { year: '2008', event: 'Opened our first 400 sq ft shop in Naya Bazaar, Ajmer with one oven.' },
  { year: '2011', event: 'Expanded to a full production kitchen. Launched our signature croissant line.' },
  { year: '2015', event: 'Won Rajasthan Best Bakery Award for the first time.' },
  { year: '2018', event: 'Crossed 10,000 monthly orders. Hired our 25th team member.' },
  { year: '2021', event: 'Launched online ordering and home delivery across Ajmer.' },
  { year: '2024', event: 'Celebrated 16 years and 500,000 happy customers.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
            alt="Kanha Bakers bakery interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mocha via-mocha/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-accent text-3xl text-caramel mb-2"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-6xl md:text-7xl font-bold text-white leading-tight max-w-2xl"
          >
            Baked in<br />
            <span className="italic text-caramel">Ajmer's Heart</span>
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-subtitle mb-2">Since 2008</p>
            <h2 className="section-title mb-6">From One Oven<br />to 50,000 Smiles</h2>
            <p className="font-body text-gray-600 leading-relaxed mb-5">
              It all began on a quiet morning in 2008, when Mohan Sharma lit the oven in a tiny 400 sq ft shop in Naya Bazaar, Ajmer. He had spent years studying the craft of bread and pastry in Vienna and Paris, and returned home with one dream: to give the people of Rajasthan the pleasure of truly artisan baked goods.
            </p>
            <p className="font-body text-gray-600 leading-relaxed mb-5">
              His wife Sunita, a gifted pastry artist in her own right, joined him from day one. Together they perfected recipes that married European technique with Indian flavour — masala croissants, saffron éclairs, cardamom Danishes. The neighbourhood fell in love.
            </p>
            <p className="font-body text-gray-600 leading-relaxed">
              Sixteen years later, Kanha Bakers employs over 40 local artisans, sources ingredients from Rajasthani farmers, and still bakes every item from scratch before sunrise. The oven is bigger now, but the love in every loaf is unchanged.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative h-64 rounded-2xl overflow-hidden col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=80"
                alt="Fresh bread"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80"
                alt="Cake making"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80"
                alt="Croissants"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-mocha">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-accent text-3xl text-caramel mb-2">What We Stand For</p>
            <h2 className="font-display text-5xl font-bold text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-bakery-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <v.icon size={22} className="text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="font-body text-sm text-bakery-200 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-2">Our Journey</p>
            <h2 className="section-title">16 Years of Growth</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-bakery-200 -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex items-center gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} flex-row pl-16 sm:pl-0`}
                >
                  {/* Year badge */}
                  <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 w-16 h-16 bg-bakery-600 rounded-2xl flex items-center justify-center shadow-lg shadow-bakery-600/30 shrink-0 z-10">
                    <span className="font-display text-sm font-bold text-white text-center leading-tight">{m.year}</span>
                  </div>
                  <div className={`sm:w-[calc(50%-3rem)] bg-white rounded-2xl p-5 shadow-md ${i % 2 === 0 ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto'}`}>
                    <p className="font-body text-gray-600 leading-relaxed text-sm">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-bakery-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-2">The Bakers</p>
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-mocha">{member.name}</h3>
                  <p className="font-body text-sm text-bakery-600 font-semibold mb-3">{member.role}</p>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 px-6 bg-gradient-to-br from-bakery-600 to-bakery-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            {
              label: 'Our Mission',
              text: 'To make premium artisan baking accessible to every household in Rajasthan, while preserving the craft, supporting local communities and never compromising on quality.',
            },
            {
              label: 'Our Vision',
              text: 'To become India most beloved artisan bakery chain — expanding from Ajmer to every city while keeping every loaf as personal, as warm and as handcrafted as the first one Mohan ever baked.',
            },
          ].map(item => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 border border-white/20 rounded-3xl p-8"
            >
              <p className="font-accent text-2xl text-caramel mb-3">{item.label}</p>
              <p className="font-body text-bakery-100 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
