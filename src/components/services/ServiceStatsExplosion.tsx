import React from 'react';
import { motion } from 'framer-motion';
import ScrollExplosion, { ExplosiveCountUp } from '@/components/websites-we-fire/ScrollExplosion';
import ParallaxBackground from '@/components/ParallaxBackground';
const heroRaceCar = "/assets/hero-race-car.jpg";

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: boolean;
}

const stats: StatItem[] = [
  { value: 50, prefix: '', suffix: '+', label: 'Active Clients' },
  { value: 24, prefix: '£', suffix: 'M', label: 'Pipeline Generated', decimals: true },
  { value: 92, prefix: '', suffix: '%', label: 'Client Retention' },
  { value: 147, prefix: '+', suffix: '%', label: 'Avg Traffic Increase' },
];

const ServiceStatsExplosion: React.FC = () => {
  return (
    <section id="results" className="relative">
      <ParallaxBackground
        backgroundImage={heroRaceCar}
        overlay="dark"
        speed={0.2}
        minHeight="auto"
      >
        <div className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">
                Results that matter.
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Numbers from real campaigns, real clients, real revenue impact.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <ScrollExplosion
                  key={index}
                  particleCount={25}
                  useConfetti={true}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                      <ExplosiveCountUp
                        end={stat.decimals ? stat.value / 10 : stat.value}
                        prefix={stat.prefix}
                        suffix={stat.decimals ? `.${stat.value % 10}${stat.suffix}` : stat.suffix}
                        glowColor="hsl(320, 85%, 55%)"
                      />
                    </div>
                    <p className="text-sm md:text-base text-white/60 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                </ScrollExplosion>
              ))}
            </div>
          </div>
        </div>
      </ParallaxBackground>
    </section>
  );
};

export default ServiceStatsExplosion;
