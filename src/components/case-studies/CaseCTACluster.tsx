import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, MessageSquare, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaseCTAClusterProps {
  onDownloadPDF?: () => void;
  relatedSlugs?: string[];
}

export const CaseCTACluster = ({ onDownloadPDF, relatedSlugs }: CaseCTAClusterProps) => {
  return (
    <section className="py-24 px-6 section-mesh relative">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Ready to achieve similar results?
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your digital presence and drive measurable growth.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Book Teardown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to="/agency-teardown"
                className="group block p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-accent/30 transition-all h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/20 transition-colors">
                  <MessageSquare className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Book a Teardown</h3>
                <p className="text-sm text-white/50 mb-4">
                  Get a free analysis of your current digital marketing setup
                </p>
                <span className="inline-flex items-center text-accent text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                  Book now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Send Brief */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/contact"
                className="group block p-6 bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-xl hover:bg-accent/20 transition-all h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 mx-auto">
                  <FileText className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Send Your Brief</h3>
                <p className="text-sm text-white/50 mb-4">
                  Tell us about your project and we'll get back to you within 24 hours
                </p>
                <span className="inline-flex items-center text-accent text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                  Get in touch
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Similar Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/case-studies"
                className="group block p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-accent/30 transition-all h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/20 transition-colors">
                  <Layers className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">See Similar Projects</h3>
                <p className="text-sm text-white/50 mb-4">
                  Explore more case studies in similar industries or services
                </p>
                <span className="inline-flex items-center text-accent text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                  View all
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Download PDF option */}
          {onDownloadPDF && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Button
                variant="outline"
                onClick={onDownloadPDF}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <FileText size={18} className="mr-2" />
                Download Case Study PDF
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
