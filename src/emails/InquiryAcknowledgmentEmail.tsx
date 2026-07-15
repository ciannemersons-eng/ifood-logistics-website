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
} from "@react-email/components";

interface Props {
  referenceNumber: string;
  fullName: string;
  companyContactEmail: string;
  companyContactPhone: string;
}

export default function InquiryAcknowledgmentEmail({
  referenceNumber,
  fullName,
  companyContactEmail,
  companyContactPhone,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>We received your iFood Logistics inquiry — {referenceNumber}</Preview>
      <Body style={{ backgroundColor: "#F5FBFF", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ backgroundColor: "#FFFFFF", padding: 32, borderRadius: 12 }}>
          <Heading style={{ color: "#042B65", fontSize: 20 }}>Thank you, {fullName}.</Heading>
          <Text style={{ color: "#1F1D1D", fontSize: 15, lineHeight: "1.6" }}>
            We have received your storage inquiry and a member of our team will review your requirements and
            contact you using the details you provided.
          </Text>
          <Section style={{ backgroundColor: "#F5FBFF", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <Text style={{ margin: 0, fontSize: 14, color: "#042B65" }}>
              <strong>Reference number:</strong> {referenceNumber}
            </Text>
          </Section>
          <Hr />
          <Text style={{ color: "#515151", fontSize: 13 }}>
            iFood Logistics — P. Remedio Street, Banilad, Mandaue City, Cebu, Philippines
            <br />
            {companyContactEmail} · {companyContactPhone}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
