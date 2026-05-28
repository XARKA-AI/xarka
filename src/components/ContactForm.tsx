import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslation } from "react-i18next";

interface ContactFormProps {
  idPrefix?: string;
  messagePlaceholderKey?: string;
}

const ContactForm = ({ idPrefix = "form", messagePlaceholderKey = "contact.messagePlaceholder" }: ContactFormProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: t("contact.toastRequired"), variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phone, website }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Request failed");
      }

      toast({ title: t("contact.toastSuccess"), description: t("contact.toastSuccessDesc") });
      setForm({ name: "", email: "", company: "", message: "" });
      setPhone(undefined);
      setWebsite("");
    } catch {
      toast({
        title: t("contact.toastError"),
        description: t("contact.toastErrorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <Input
          id={`${idPrefix}-website`}
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="mb-2 block text-sm font-medium text-foreground">
            {t("contact.nameLabel")}
          </label>
          <Input
            id={`${idPrefix}-name`}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t("contact.namePlaceholder")}
            maxLength={100}
            className="bg-background"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="mb-2 block text-sm font-medium text-foreground">
            {t("contact.emailLabel")}
          </label>
          <Input
            id={`${idPrefix}-email`}
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={t("contact.emailPlaceholder")}
            maxLength={255}
            className="bg-background"
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-company`} className="mb-2 block text-sm font-medium text-foreground">
          {t("contact.companyLabel")}
        </label>
        <Input
          id={`${idPrefix}-company`}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder={t("contact.companyPlaceholder")}
          maxLength={100}
          className="bg-background"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`} className="mb-2 block text-sm font-medium text-foreground">
          {t("contact.phoneLabel")}
        </label>
        <PhoneInput
          international
          defaultCountry="IN"
          value={phone}
          onChange={setPhone}
          placeholder={t("contact.phonePlaceholder")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-message`} className="mb-2 block text-sm font-medium text-foreground">
          {t("contact.messageLabel")}
        </label>
        <Textarea
          id={`${idPrefix}-message`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={t(messagePlaceholderKey)}
          rows={5}
          maxLength={1000}
          className="resize-none bg-background"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
      >
        {isSubmitting ? t("contact.submitting") : t("contact.submitBtn")}
        <Send size={16} aria-hidden="true" />
      </Button>
      <p className="text-xs text-muted-foreground">{t("contact.privacy")}</p>
    </form>
  );
};

export default ContactForm;
