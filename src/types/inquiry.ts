export type InquiryStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal_sent"
  | "won"
  | "lost"
  | "spam";

export interface InquiryPayload {
  fullName: string;
  companyName: string;
  email: string;
  mobileNumber: string;
  productType: string;
  requiredTemperature?: string;
  estimatedPallets?: number;
  expectedArrivalDate?: string;
  storageDuration?: string;
  dispatchFrequency?: string;
  handlingRequirements?: string;
  currentLocation?: string;
  preferredContactMethod?: string;
  bestTimeToCall?: string;
  hearAboutUs?: string;
  message?: string;
  consentPrivacy: boolean;
  turnstileToken: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

export interface InquiryRecord extends Omit<InquiryPayload, "turnstileToken"> {
  id: string;
  referenceNumber: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface InquiryApiSuccessResponse {
  success: true;
  referenceNumber: string;
}

export interface InquiryApiErrorResponse {
  success: false;
  message: string;
  fieldErrors?: Record<string, string>;
}

export type InquiryApiResponse =
  | InquiryApiSuccessResponse
  | InquiryApiErrorResponse;
