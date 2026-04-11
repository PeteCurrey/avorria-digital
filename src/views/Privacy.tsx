
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionBand } from "@/components/ContentBand";

const Privacy = () => {
  return (
    <>
      
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "Privacy Policy", url: "https://avorria.com/privacy" }
      ]} />

      <div className="min-h-screen pt-24">
        <SectionBand background="dark" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-8">Privacy Policy</h1>
              <p className="text-white/60 mb-12">Last updated: December 2024</p>
            </ScrollReveal>

            <div className="prose prose-invert prose-lg max-w-none">
              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                  <p className="text-white/80 leading-relaxed">
                    Avorria ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website avorria.com, use our services, or interact with us in any way.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                  <h3 className="text-xl font-medium text-white mb-3">Personal Information</h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                    <li>Fill out a contact form or request information</li>
                    <li>Subscribe to our newsletter or email list</li>
                    <li>Request a quote or consultation</li>
                    <li>Engage our services</li>
                  </ul>
                  <p className="text-white/80 leading-relaxed">
                    This information may include your name, email address, phone number, company name, and any other information you choose to provide.
                  </p>

                  <h3 className="text-xl font-medium text-white mb-3 mt-6">Automatically Collected Information</h3>
                  <p className="text-white/80 leading-relaxed">
                    When you visit our website, we automatically collect certain information including your IP address, browser type, device type, pages visited, time spent on pages, and referring URL. We use analytics tools to help us understand how visitors use our site.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                  <p className="text-white/80 leading-relaxed mb-4">We use the information we collect to:</p>
                  <ul className="list-disc list-inside text-white/80 space-y-2">
                    <li>Respond to your enquiries and provide customer support</li>
                    <li>Deliver the services you have requested</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Analyse usage trends and user behaviour</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies and Tracking</h2>
                  <p className="text-white/80 leading-relaxed">
                    We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are small files placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our website may not function properly.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Disclosure</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    We do not sell your personal information. We may share your information with:
                  </p>
                  <ul className="list-disc list-inside text-white/80 space-y-2">
                    <li>Service providers who assist us in operating our business (e.g., hosting, analytics)</li>
                    <li>Professional advisors such as lawyers and accountants</li>
                    <li>Law enforcement or regulatory authorities when required by law</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Data Security</h2>
                  <p className="text-white/80 leading-relaxed">
                    We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Under UK GDPR, you have the right to:
                  </p>
                  <ul className="list-disc list-inside text-white/80 space-y-2">
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Request restriction of processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
                  <p className="text-white/80 leading-relaxed">
                    We retain personal information for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
                  <p className="text-white/80 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <p className="text-white/80 mt-4">
                    Email: privacy@avorria.com<br />
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

export default Privacy;
