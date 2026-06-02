import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Privacy Policy | XARKA AI</title>
        <meta
          name="description"
          content="Privacy policy for XARKA AI - Learn how we collect, use, and protect your personal information."
        />
        <link rel="canonical" href="/privacy" />
      </Helmet>
      
      <section className="section-padding border-b border-border bg-background">
        <div className="container-narrow">
          <SectionHeader
            eyebrow="Legal & Compliance"
            title="Privacy Policy"
            description="We are committed to protecting your privacy and being transparent about how we handle your data."
          />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">1. Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Welcome to XARKA AI ("we," "us," or "our"). We are committed to protecting your privacy and being transparent about how we collect, use, and safeguard your personal information. This Privacy Policy explains how we handle your data when you interact with our website, platforms, and services.
                  </p>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">2. What Information We Collect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Personal Information</h4>
                      <p className="text-muted-foreground">
                        We may collect the following types of personal information:
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                        <li>Contact Information: Name, email address, phone number, company name</li>
                        <li>Account Information: User credentials, profile information</li>
                        <li>Communication Data: Messages, inquiries, and correspondence</li>
                        <li>Usage Data: Information about how you use our services and website</li>
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div>
                      <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                      <p className="text-muted-foreground">
                        We collect information automatically when you visit our website:
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                        <li>Technical Data: IP address, browser type, device information, operating system</li>
                        <li>Usage Data: Pages visited, time spent on pages, click patterns</li>
                        <li>Location Data: General location information (based on IP address)</li>
                        <li>Cookies and Similar Technologies: Data stored on your device</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">3. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We use your information for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li>Provide and improve our services</li>
                    <li>Process your inquiries and requests</li>
                    <li>Communicate with you about our products and services</li>
                    <li>Ensure website security and prevent fraud</li>
                    <li>Comply with legal obligations</li>
                    <li>Research and development of AI technologies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">4. AI-Specific Data Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    As an AI company, we handle data differently:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li><strong>Training Data:</strong> We use anonymized and aggregated data to train our AI models</li>
                    <li><strong>Algorithm Development:</strong> Data helps us improve the accuracy and effectiveness of our AI solutions</li>
                    <li><strong>Quality Assurance:</strong> We continuously improve our AI systems based on usage patterns</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">5. Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We implement robust security measures to protect your information:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li><strong>Encryption:</strong> Data is encrypted in transit and at rest</li>
                    <li><strong>Access Controls:</strong> Strict access controls and authentication mechanisms</li>
                    <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
                    <li><strong>Compliance:</strong> Industry-standard security practices</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">6. Your Rights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                    <li><strong>Portability:</strong> Receive your data in a structured format</li>
                    <li><strong>Objection:</strong> Object to certain processing activities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">7. Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you have questions about this Privacy Policy or our data practices, please contact us:
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

              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-xl">© 2024 XARKA AI Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All rights reserved. This Privacy Policy constitutes the entire agreement between you and XARKA AI regarding privacy matters.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Privacy;