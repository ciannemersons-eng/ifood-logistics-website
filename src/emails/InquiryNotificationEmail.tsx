import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import type { InquiryPayload } from "@/types/inquiry";

interface Props {
  referenceNumber: string;
  data: Omit<InquiryPayload, "turnstileToken">;
}

const row = (label: string, value?: string | number | boolean) => {
  if (value === undefined || value === null || value === "") return null;
  return (
    <Text key={label} style={{ margin: "2px 0", fontSize: 14, color: "#1F1D1D" }}>
      <strong>{label}:</strong> {String(value)}
    </Text>
  );
};

export default function InquiryNotificationEmail({ referenceNumber, data }: Props) {
  return (
    <Html>
      <Head />
      <Preview>New iFood Storage Inquiry — {data.companyName} — {referenceNumber}</Preview>
      <Body style={{ backgroundColor: "#F5FBFF", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ backgroundColor: "#FFFFFF", padding: 32, borderRadius: 12 }}>
          <Heading style={{ color: "#042B65", fontSize: 20 }}>New Storage Inquiry</Heading>
          <Text style={{ color: "#515151", fontSize: 14 }}>
            Reference number: <strong>{referenceNumber}</strong>
          </Text>
          <Hr />
          <Section>
            {row("Full name", data.fullName)}
            {row("Company", data.companyName)}
            {row("Work email", data.email)}
            {row("Mobile number", data.mobileNumber)}
            {row("Product type", data.productType)}
            {row("Required temperature", data.requiredTemperature)}
            {row("Estimated pallets", data.estimatedPallets)}
            {row("Expected arrival date", data.expectedArrivalDate)}
            {row("Storage duration", data.storageDuration)}
            {row("Dispatch frequency", data.dispatchFrequency)}
            {row("Handling requirements", data.handlingRequirements)}
            {row("Current location", data.currentLocation)}
            {row("Preferred contact method", data.preferredContactMethod)}
            {row("Best time to call", data.bestTimeToCall)}
            {row("How they heard about us", data.hearAboutUs)}
            {row("Message", data.message)}
          </Section>
          <Hr />
          <Section>
            <Text style={{ fontSize: 13, color: "#515151" }}>Quick actions:</Text>
            <Text style={{ fontSize: 13 }}>
              <Link href={`mailto:${data.email}`}>Reply to customer</Link>
              {" · "}
              <Link href={`tel:${data.mobileNumber}`}>Call customer</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
