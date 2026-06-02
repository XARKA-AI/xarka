import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Terms of Service | XARKA AI</title>
        <meta
          name="description"
          content="Terms of Service for XARKA AI - Legal terms and conditions for using our AI platforms and services."
        />
        <link rel="canonical" href="/terms" />
      </Helmet>
      
      <section className="section-padding border-b border-border bg-background">
        <div className="container-narrow">
          <SectionHeader
            eyebrow="Legal & Compliance"
            title="Terms of Service"
            description="Please read these terms carefully before using XARKA AI services and platforms."
          />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    By accessing and using XARKA AI's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                  </p>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">2. Description of Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    XARKA AI provides artificial intelligence platforms and services including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li>Legal intelligence platforms (LawgicHub)</li>
                    <li>Medical excellence systems (MediCore)</li>
                    <li>Financial technology solutions (FinTech Pulse)</li>
                    <li>Enterprise automation services</li>
                    <li>AI consulting and development services</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">3. User Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Users are responsible for:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li>Providing accurate and complete information</li>
                    <li>Maintaining the confidentiality of account credentials</li>
                    <li>Complying with all applicable laws and regulations</li>
                    <li>Not using the services for illegal or unauthorized purposes</li>
                    <li>Respecting intellectual property rights</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">4. Service Limitations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    XARKA AI services are provided on an "as-is" and "as-available" basis. We do not guarantee:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li> uninterrupted or error-free service</li>
                    <li> that defects will be corrected</li>
                    <li> the accuracy or reliability of AI outputs</li>
                    <li> compatibility with all systems and devices</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">5. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All content, features, and functionality on XARKA AI platforms are owned by XARKA AI and are protected by intellectual property laws. Users are granted a limited, non-exclusive, non-transferable license to use the services for their intended purposes.
                  </p>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">6. Data Usage and AI Outputs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Users acknowledge that:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li>AI outputs may not always be accurate or complete</li>
                    <li>Users should independently verify critical information</li>
                    <li>XARKA AI is not liable for decisions based on AI outputs</li>
                    <li>Data provided to train AI models may be anonymized and aggregated</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">7. Prohibited Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Users may not:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li>Use the services for illegal or harmful purposes</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                    <li>Interfere with the proper functioning of the services</li>
                    <li>Upload malicious code or viruses</li>
                    <li>Violate the privacy or rights of others</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">8. Termination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    XARKA AI reserves the right to terminate or suspend access to services immediately, without notice, for any reason including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li>Breach of these terms of service</li>
                    <li>Suspicion of fraudulent activity</li>
                    <li>Non-payment of fees (for paid services)</li>
                    <li>Legal requirements or government requests</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">9. Disclaimer of Warranties</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    XARKA AI services are provided without warranties of any kind, either express or implied, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li>Merchantability or fitness for a particular purpose</li>
                    <li>Accuracy, reliability, or completeness of services</li>
                    <li>Freedom from viruses or other harmful components</li>
                    <li>Continuous availability of the services</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">10. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    In no event shall XARKA AI be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li>Loss of profits, revenue, or data</li>
                    <li>Business interruption</li>
                    <li>Damage to reputation</li>
                    <li>Cost of substitute goods or services</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">11. Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    XARKA AI reserves the right to modify these terms at any time. Continued use of the services after any changes constitutes acceptance of the new terms.
                  </p>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">12. Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    These terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law principles.
                  </p>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">XARKA AI Technologies</h4>
                      <p className="text-muted-foreground">Email: support@xarka.in</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Last Updated</h4>
                      <p className="text-muted-foreground">January 1, 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Terms;