/**
 * GROQ queries for the landing page. Every reference is dereferenced and
 * every image resolves to a plain URL so that components never need to know
 * about Sanity-specific shapes.
 */

const editableImageProjection = `{
  "url": image.asset->url,
  alt,
  caption,
  "mobileUrl": mobileImage.asset->url,
  darkOverlay,
  credit,
  isVisible
}`;

const editableIconProjection = `{
  mode,
  libraryKey,
  "uploadedAsset": mode == "upload" => {
    "url": uploadedAsset.asset->url,
    "alt": uploadedAssetAlt
  }
}`;

const ctaProjection = `{ label, href, isVisible }`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  companyLegalName,
  tradingName,
  "logo": logo${editableImageProjection},
  contactEmail,
  contactPhone,
  address,
  inquiryRecipientEmail,
  "headerCta": headerCta${ctaProjection},
  footerText,
  "seo": seo{
    title,
    description,
    keywords,
    "socialImage": socialImage${editableImageProjection}
  }
}`;

export const landingPageQuery = `*[_type == "landingPage"][0]{
  "navItems": navItems[]${ctaProjection},
  hero{
    isVisible, anchorId, eyebrow, headlineLine1, headlineLine2, supportingCopy,
    "primaryCta": primaryCta${ctaProjection},
    "secondaryCta": secondaryCta${ctaProjection},
    "image": image${editableImageProjection},
    textAlign, overlayStrength
  },
  stats{
    isVisible,
    "stats": stats[]{ value, label, "icon": icon${editableIconProjection} }
  },
  solutions{
    isVisible, anchorId, eyebrow, heading, supportingCopy,
    "sectionLink": sectionLink${ctaProjection},
    "cards": cards[]->{
      "id": _id, "icon": icon${editableIconProjection}, title, description,
      link, accentBackground, isVisible, sortOrder
    } | order(sortOrder asc)
  },
  about{
    isVisible, anchorId, eyebrow, heading, bodyCopy, trustPoints,
    "cta": cta${ctaProjection},
    "image": image${editableImageProjection},
    floatingCardEyebrow, floatingCardText
  },
  facility{
    isVisible, anchorId, eyebrow, heading, introCopy,
    "highlights": highlights[]->{
      "id": _id, title, description, technicalValue,
      "image": image${editableImageProjection},
      "icon": icon${editableIconProjection},
      link, isVisible, sortOrder
    } | order(sortOrder asc)
  },
  inventory{
    isVisible, anchorId, eyebrow, heading, copy, benefits,
    "cta": cta${ctaProjection},
    "image": image${editableImageProjection}
  },
  whyIfood{
    isVisible, anchorId, eyebrow, heading,
    "items": items[]{
      "id": _key, "icon": icon${editableIconProjection}, title, description, isVisible, sortOrder
    } | order(sortOrder asc)
  },
  industries{
    isVisible, anchorId, eyebrow, heading,
    "industries": industries[]->{
      "id": _id, name, "icon": icon${editableIconProjection},
      "image": image${editableImageProjection}, isVisible, sortOrder
    } | order(sortOrder asc)
  },
  process{
    isVisible, anchorId, eyebrow, heading,
    "steps": steps[]->{
      "id": _id, stepNumber, title, description, isVisible
    } | order(stepNumber asc),
    "cta": cta${ctaProjection}
  },
  partners{
    isVisible, anchorId, heading, supportingCopy,
    "partners": partners[]->{
      "id": _id, name, "logo": logo${editableImageProjection}, website,
      relationshipDescription, approvedForPublication, isVisible, sortOrder
    } | order(sortOrder asc),
    legalCaption
  },
  affiliates{
    isVisible, anchorId, heading, copy,
    "affiliates": affiliates[]->{
      "id": _id, name, "logo": logo${editableImageProjection},
      approvedForPublication, isVisible, sortOrder
    } | order(sortOrder asc)
  },
  expansion{
    isVisible, anchorId, eyebrow, heading, copy,
    "cta": cta${ctaProjection}
  },
  inquiry{
    isVisible, anchorId, heading, copy, reassurancePoints,
    submitLabel, reassuranceCopy, successMessage, errorMessage
  },
  faq{
    isVisible, anchorId, eyebrow, heading,
    "items": items[]->{
      "id": _id, question, answer, isVisible, sortOrder
    } | order(sortOrder asc)
  }
}`;
