import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionBand } from "@/components/ContentBand";

const Terms = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="Avorria's terms of service outline the rules and regulations for using our website and services."
        canonical="/terms"
        noindex
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "Terms of Service", url: "https://avorria.com/terms" }
      ]} />

      <div className="min-h-screen pt-24">
        <SectionBand background="dark" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-8">Terms of Service</h1>
              <p className="text-white/60 mb-12">Last updated: December 2024</p>
            </ScrollReveal>

            <div className="prose prose-invert prose-lg max-w-none">
              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                  <p className="text-white/80 leading-relaxed">
                    By accessing or using the Avorria website (avorria.com) and our services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our website or use our services.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Services</h2>
                  <p className="text-white/80 leading-relaxed">
                    Avorria provides digital marketing, SEO, web design, paid media, and related services. The specific scope, deliverables, and terms of any engagement will be outlined in a separate proposal or statement of work agreed between Avorria and the client.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Intellectual Property</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    The content on this website, including text, graphics, logos, images, and software, is the property of Avorria and is protected by copyright and other intellectual property laws.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    For client work, intellectual property rights and ownership will be specified in the relevant service agreement. Generally, upon full payment, clients receive ownership of custom work created specifically for them.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">4. User Responsibilities</h2>
                  <p className="text-white/80 leading-relaxed mb-4">When using our website and services, you agree to:</p>
                  <ul className="list-disc list-inside text-white/80 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Use the website and services only for lawful purposes</li>
                    <li>Not attempt to interfere with the proper working of the website</li>
                    <li>Not use the website in any way that could damage, disable, or impair it</li>
                    <li>Not attempt to gain unauthorised access to any systems or networks</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Payment Terms</h2>
                  <p className="text-white/80 leading-relaxed">
                    Payment terms for services will be specified in the relevant proposal or agreement. Unless otherwise stated, invoices are payable within 14 days of the invoice date. We reserve the right to suspend services for overdue accounts.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
                  <p className="text-white/80 leading-relaxed">
                    To the maximum extent permitted by law, Avorria shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising out of or in connection with these terms or the use of our services.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Disclaimer of Warranties</h2>
                  <p className="text-white/80 leading-relaxed">
                    Our website and services are provided "as is" without warranties of any kind, either express or implied. While we strive to achieve the best possible results for our clients, we cannot guarantee specific outcomes such as search rankings, traffic levels, or conversion rates, as these depend on many factors outside our control.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Confidentiality</h2>
                  <p className="text-white/80 leading-relaxed">
                    Both parties agree to maintain the confidentiality of any proprietary or confidential information shared during the course of our engagement. This obligation survives the termination of any agreement.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Termination</h2>
                  <p className="text-white/80 leading-relaxed">
                    Either party may terminate a service agreement as specified in the relevant contract. Upon termination, all outstanding fees become immediately due and payable. We will provide reasonable assistance in transitioning services where applicable.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to Terms</h2>
                  <p className="text-white/80 leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page with an updated date. Your continued use of the website after any changes constitutes acceptance of the new terms.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Governing Law</h2>
                  <p className="text-white/80 leading-relaxed">
                    These terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">12. Contact</h2>
                  <p className="text-white/80 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <p className="text-white/80 mt-4">
                    Email: legal@avorria.com<br />
                    Address: Avorria Ltd, Sheffield, UK
                  </p>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default Terms;
