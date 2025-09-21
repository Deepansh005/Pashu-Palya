"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "hi" | "mr"

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translate: (key: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<string, Record<Language, string>> = {
  // Dashboard Headers
  "Welcome Farmer": {
    en: "Welcome Farmer",
    hi: "किसान का स्वागत है",
    mr: "शेतकरी स्वागत आहे",
  },
  "Digital Twin": {
    en: "Digital Twin",
    hi: "डिजिटल ट्विन",
    mr: "डिजिटल ट्विन",
  },
  "Bio-Credit Wallet": {
    en: "Bio-Credit Wallet",
    hi: "बायो-क्रेडिट वॉलेट",
    mr: "बायो-क्रेडिट वॉलेट",
  },
  "AMU Monitoring": {
    en: "AMU Monitoring",
    hi: "एएमयू निगरानी",
    mr: "एएमयू निरीक्षण",
  },
  "AI & Vets": {
    en: "AI & Vets",
    hi: "एआई और पशु चिकित्सक",
    mr: "एआय आणि पशुवैद्य",
  },
  "Govt Subsidies": {
    en: "Govt Subsidies",
    hi: "सरकारी सब्सिडी",
    mr: "सरकारी अनुदान",
  },

  // MoFAHD Dashboard Headers
  "MoFAHD Admin Dashboard": {
    en: "MoFAHD Admin Dashboard",
    hi: "मोफाहड प्रशासन डैशबोर्ड",
    mr: "मोफाहड प्रशासन डॅशबोर्ड",
  },
  "Ministry of Fisheries, Animal Husbandry & Dairying - Analytics & Compliance": {
    en: "Ministry of Fisheries, Animal Husbandry & Dairying - Analytics & Compliance",
    hi: "मत्स्य पालन, पशुपालन और डेयरी मंत्रालय - विश्लेषण और अनुपालन",
    mr: "मत्स्यपालन, पशुपालन आणि दुग्धव्यवसाय मंत्रालय - विश्लेषण आणि अनुपालन",
  },
  "Export Report": {
    en: "Export Report",
    hi: "रिपोर्ट निर्यात करें",
    mr: "अहवाल निर्यात करा",
  },
  "Sign Out": {
    en: "Sign Out",
    hi: "साइन आउट",
    mr: "साइन आउट",
  },

  // Navigation Items
  Dashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    mr: "डॅशबोर्ड",
  },
  Analytics: {
    en: "Analytics",
    hi: "विश्लेषण",
    mr: "विश्लेषण",
  },
  "Interactive Map": {
    en: "Interactive Map",
    hi: "इंटरैक्टिव मैप",
    mr: "परस्परसंवादी नकाशा",
  },
  Leaderboard: {
    en: "Leaderboard",
    hi: "लीडरबोर्ड",
    mr: "लीडरबोर्ड",
  },
  "Audit Queue": {
    en: "Audit Queue",
    hi: "ऑडिट क्यू",
    mr: "ऑडिट रांग",
  },
  "Purchase Records": {
    en: "Purchase Records",
    hi: "खरीद रिकॉर्ड",
    mr: "खरेदी नोंदी",
  },

  // Digital Twin Section
  "Digital Twin Dashboard": {
    en: "Digital Twin Dashboard",
    hi: "डिजिटल ट्विन डैशबोर्ड",
    mr: "डिजिटल ट्विन डॅशबोर्ड",
  },
  "Monitor your livestock health and compliance status": {
    en: "Monitor your livestock health and compliance status",
    hi: "अपने पशुधन के स्वास्थ्य और अनुपालन स्थिति की निगरानी करें",
    mr: "आपल्या पशुधनाच्या आरोग्य आणि अनुपालन स्थितीचे निरीक्षण करा",
  },
  "3D Animal Model - Cow #A001": {
    en: "3D Animal Model - Cow #A001",
    hi: "3डी पशु मॉडल - गाय #A001",
    mr: "3डी प्राणी मॉडेल - गाय #A001",
  },
  "Interactive digital twin of your livestock": {
    en: "Interactive digital twin of your livestock",
    hi: "आपके पशुधन का इंटरैक्टिव डिजिटल ट्विन",
    mr: "आपल्या पशुधनाचे परस्परसंवादी डिजिटल ट्विन",
  },
  "Animal Details": {
    en: "Animal Details",
    hi: "पशु विवरण",
    mr: "प्राणी तपशील",
  },
  "Health Status": {
    en: "Health Status",
    hi: "स्वास्थ्य स्थिति",
    mr: "आरोग्य स्थिती",
  },
  Healthy: {
    en: "Healthy",
    hi: "स्वस्थ",
    mr: "निरोगी",
  },
  "Recent Medicines": {
    en: "Recent Medicines",
    hi: "हाल की दवाएं",
    mr: "अलीकडील औषधे",
  },
  "Upload Evidence": {
    en: "Upload Evidence",
    hi: "सबूत अपलोड करें",
    mr: "पुरावा अपलोड करा",
  },

  // MRL Monitoring
  "MRL Monitoring": {
    en: "MRL Monitoring",
    hi: "एमआरएल निगरानी",
    mr: "एमआरएल निरीक्षण",
  },
  "Maximum Residue Limit compliance status": {
    en: "Maximum Residue Limit compliance status",
    hi: "अधिकतम अवशेष सीमा अनुपालन स्थिति",
    mr: "कमाल अवशेष मर्यादा अनुपालन स्थिती",
  },
  "Milk Products": {
    en: "Milk Products",
    hi: "दूध उत्पाद",
    mr: "दूध उत्पादने",
  },
  "Safe for consumption": {
    en: "Safe for consumption",
    hi: "सेवन के लिए सुरक्षित",
    mr: "सेवनासाठी सुरक्षित",
  },
  "Withdrawal period: Complete": {
    en: "Withdrawal period: Complete",
    hi: "निकासी अवधि: पूर्ण",
    mr: "काढण्याचा कालावधी: पूर्ण",
  },
  Safe: {
    en: "Safe",
    hi: "सुरक्षित",
    mr: "सुरक्षित",
  },
  "Meat Products": {
    en: "Meat Products",
    hi: "मांस उत्पाद",
    mr: "मांस उत्पादने",
  },
  "Withdrawal period active": {
    en: "Withdrawal period active",
    hi: "निकासी अवधि सक्रिय",
    mr: "काढण्याचा कालावधी सक्रिय",
  },
  "Days remaining: 3": {
    en: "Days remaining: 3",
    hi: "शेष दिन: 3",
    mr: "उरलेले दिवस: 3",
  },
  Caution: {
    en: "Caution",
    hi: "सावधानी",
    mr: "सावधगिरी",
  },

  // AMU Monitoring
  "Track antimicrobial usage and compliance": {
    en: "Track antimicrobial usage and compliance",
    hi: "रोगाणुरोधी उपयोग और अनुपालन को ट्रैक करें",
    mr: "प्रतिजैविक वापर आणि अनुपालन ट्रॅक करा",
  },
  "Current AMU Rate": {
    en: "Current AMU Rate",
    hi: "वर्तमान एएमयू दर",
    mr: "सध्याचा एएमयू दर",
  },
  "↓ 15% from last month": {
    en: "↓ 15% from last month",
    hi: "↓ पिछले महीने से 15%",
    mr: "↓ गेल्या महिन्यापासून 15%",
  },
  "Baseline Target": {
    en: "Baseline Target",
    hi: "आधारभूत लक्ष्य",
    mr: "आधारभूत लक्ष्य",
  },
  "36% below target": {
    en: "36% below target",
    hi: "लक्ष्य से 36% कम",
    mr: "लक्ष्यापेक्षा 36% कमी",
  },
  "Compliance Score": {
    en: "Compliance Score",
    hi: "अनुपालन स्कोर",
    mr: "अनुपालन स्कोअर",
  },
  "Excellent compliance": {
    en: "Excellent compliance",
    hi: "उत्कृष्ट अनुपालन",
    mr: "उत्कृष्ट अनुपालन",
  },
  "AMU Usage Over Time": {
    en: "AMU Usage Over Time",
    hi: "समय के साथ एएमयू उपयोग",
    mr: "कालांतराने एएमयू वापर",
  },
  "Monthly antimicrobial usage trends": {
    en: "Monthly antimicrobial usage trends",
    hi: "मासिक रोगाणुरोधी उपयोग रुझान",
    mr: "मासिक प्रतिजैविक वापराचे ट्रेंड",
  },
  "Recent Dosage History": {
    en: "Recent Dosage History",
    hi: "हाल का खुराक इतिहास",
    mr: "अलीकडील डोस इतिहास",
  },
  "Last administered medicines and dosages": {
    en: "Last administered medicines and dosages",
    hi: "अंतिम प्रशासित दवाएं और खुराक",
    mr: "शेवटची दिलेली औषधे आणि डोस",
  },

  // AI & Vets Section
  "Get AI recommendations and vet verification": {
    en: "Get AI recommendations and vet verification",
    hi: "एआई सिफारिशें और पशु चिकित्सक सत्यापन प्राप्त करें",
    mr: "एआय शिफारसी आणि पशुवैद्य सत्यापन मिळवा",
  },
  "Describe Your Animal's Condition": {
    en: "Describe Your Animal's Condition",
    hi: "अपने पशु की स्थिति का वर्णन करें",
    mr: "आपल्या प्राण्याच्या स्थितीचे वर्णन करा",
  },
  "Choose your preferred input method": {
    en: "Choose your preferred input method",
    hi: "अपनी पसंदीदा इनपुट विधि चुनें",
    mr: "आपली पसंतीची इनपुट पद्धत निवडा",
  },
  Text: {
    en: "Text",
    hi: "पाठ",
    mr: "मजकूर",
  },
  Voice: {
    en: "Voice",
    hi: "आवाज़",
    mr: "आवाज",
  },
  Image: {
    en: "Image",
    hi: "छवि",
    mr: "प्रतिमा",
  },
  "Describe symptoms or concerns": {
    en: "Describe symptoms or concerns",
    hi: "लक्षण या चिंताओं का वर्णन करें",
    mr: "लक्षणे किंवा चिंतांचे वर्णन करा",
  },
  "e.g., Animal showing signs of lethargy, reduced appetite, slight fever...": {
    en: "e.g., Animal showing signs of lethargy, reduced appetite, slight fever...",
    hi: "जैसे, पशु सुस्ती, भूख में कमी, हल्का बुखार के लक्षण दिखा रहा है...",
    mr: "उदा., प्राणी सुस्ती, भूक कमी, हलका ताप दाखवत आहे...",
  },
  "Click to start voice recording": {
    en: "Click to start voice recording",
    hi: "आवाज़ रिकॉर्डिंग शुरू करने के लिए क्लिक करें",
    mr: "आवाज रेकॉर्डिंग सुरू करण्यासाठी क्लिक करा",
  },
  "Start Recording": {
    en: "Start Recording",
    hi: "रिकॉर्डिंग शुरू करें",
    mr: "रेकॉर्डिंग सुरू करा",
  },
  "Upload images of your animal": {
    en: "Upload images of your animal",
    hi: "अपने पशु की छवियां अपलोड करें",
    mr: "आपल्या प्राण्याच्या प्रतिमा अपलोड करा",
  },
  "Choose Files": {
    en: "Choose Files",
    hi: "फ़ाइलें चुनें",
    mr: "फाइल्स निवडा",
  },
  "Get AI Recommendation": {
    en: "Get AI Recommendation",
    hi: "एआई सिफारिश प्राप्त करें",
    mr: "एआय शिफारस मिळवा",
  },
  "Vet Review Panel": {
    en: "Vet Review Panel",
    hi: "पशु चिकित्सक समीक्षा पैनल",
    mr: "पशुवैद्य पुनरावलोकन पॅनेल",
  },
  "AI prescriptions pending vet verification": {
    en: "AI prescriptions pending vet verification",
    hi: "पशु चिकित्सक सत्यापन लंबित एआई नुस्खे",
    mr: "पशुवैद्य सत्यापन प्रलंबित एआय प्रिस्क्रिप्शन",
  },
  "AI Prescription #001": {
    en: "AI Prescription #001",
    hi: "एआई नुस्खा #001",
    mr: "एआय प्रिस्क्रिप्शन #001",
  },
  "Submitted 2 hours ago": {
    en: "Submitted 2 hours ago",
    hi: "2 घंटे पहले सबमिट किया गया",
    mr: "2 तासांपूर्वी सबमिट केले",
  },
  "Pending Review": {
    en: "Pending Review",
    hi: "समीक्षा लंबित",
    mr: "पुनरावलोकन प्रलंबित",
  },
  Recommendation: {
    en: "Recommendation",
    hi: "सिफारिश",
    mr: "शिफारस",
  },
  "twice daily for 5 days": {
    en: "twice daily for 5 days",
    hi: "5 दिनों के लिए दिन में दो बार",
    mr: "5 दिवसांसाठी दिवसातून दोनदा",
  },
  Reason: {
    en: "Reason",
    hi: "कारण",
    mr: "कारण",
  },
  "Respiratory infection symptoms": {
    en: "Respiratory infection symptoms",
    hi: "श्वसन संक्रमण के लक्षण",
    mr: "श्वसन संसर्गाची लक्षणे",
  },
  "AI Prescription #002": {
    en: "AI Prescription #002",
    hi: "एआई नुस्खा #002",
    mr: "एआय प्रिस्क्रिप्शन #002",
  },
  "Verified by Dr. Smith": {
    en: "Verified by Dr. Smith",
    hi: "डॉ. स्मिथ द्वारा सत्यापित",
    mr: "डॉ. स्मिथ यांनी सत्यापित केले",
  },
  Approved: {
    en: "Approved",
    hi: "स्वीकृत",
    mr: "मंजूर",
  },
  "Final Prescription": {
    en: "Final Prescription",
    hi: "अंतिम नुस्खा",
    mr: "अंतिम प्रिस्क्रिप्शन",
  },
  "once daily for 3 days": {
    en: "once daily for 3 days",
    hi: "3 दिनों के लिए दिन में एक बार",
    mr: "3 दिवसांसाठी दिवसातून एकदा",
  },
  "Vet Notes": {
    en: "Vet Notes",
    hi: "पशु चिकित्सक नोट्स",
    mr: "पशुवैद्य नोट्स",
  },
  "Reduced dosage recommended due to animal weight": {
    en: "Reduced dosage recommended due to animal weight",
    hi: "पशु के वजन के कारण कम खुराक की सिफारिश",
    mr: "प्राण्याच्या वजनामुळे कमी डोसची शिफारस",
  },

  // Bio-Credit Wallet
  "Earn and trade credits for sustainable practices": {
    en: "Earn and trade credits for sustainable practices",
    hi: "टिकाऊ प्रथाओं के लिए क्रेडिट अर्जित करें और व्यापार करें",
    mr: "शाश्वत पद्धतींसाठी क्रेडिट्स मिळवा आणि व्यापार करा",
  },
  "Current Balance": {
    en: "Current Balance",
    hi: "वर्तमान शेष",
    mr: "सध्याची शिल्लक",
  },
  credits: {
    en: "credits",
    hi: "क्रेडिट",
    mr: "क्रेडिट्स",
  },
  "+156 this month": {
    en: "+156 this month",
    hi: "+156 इस महीने",
    mr: "+156 या महिन्यात",
  },
  "Credits Earned": {
    en: "Credits Earned",
    hi: "अर्जित क्रेडिट",
    mr: "मिळवलेले क्रेडिट्स",
  },
  "Total lifetime earnings": {
    en: "Total lifetime earnings",
    hi: "कुल जीवनकाल की कमाई",
    mr: "एकूण जीवनकाळातील कमाई",
  },
  "Market Value": {
    en: "Market Value",
    hi: "बाजार मूल्य",
    mr: "बाजार मूल्य",
  },
  "@ ₹15 per credit": {
    en: "@ ₹15 per credit",
    hi: "@ ₹15 प्रति क्रेडिट",
    mr: "@ ₹15 प्रति क्रेडिट",
  },
  "Credit Earning Activities": {
    en: "Credit Earning Activities",
    hi: "क्रेडिट अर्जन गतिविधियां",
    mr: "क्रेडिट कमावण्याच्या क्रियाकलाप",
  },
  "How you earn bio-credits for sustainable practices": {
    en: "How you earn bio-credits for sustainable practices",
    hi: "टिकाऊ प्रथाओं के लिए आप बायो-क्रेडिट कैसे अर्जित करते हैं",
    mr: "शाश्वत पद्धतींसाठी तुम्ही बायो-क्रेडिट्स कसे मिळवता",
  },
  "AMU Below Baseline": {
    en: "AMU Below Baseline",
    hi: "आधारभूत से कम एएमयू",
    mr: "आधारभूतपेक्षा कमी एएमयू",
  },
  "36% reduction from target": {
    en: "36% reduction from target",
    hi: "लक्ष्य से 36% कमी",
    mr: "लक्ष्यापेक्षा 36% कपात",
  },
  "credits/month": {
    en: "credits/month",
    hi: "क्रेडिट/महीना",
    mr: "क्रेडिट्स/महिना",
  },
  "Organic Feed Usage": {
    en: "Organic Feed Usage",
    hi: "जैविक फ़ीड उपयोग",
    mr: "सेंद्रिय खाद्य वापर",
  },
  "85% organic feed this month": {
    en: "85% organic feed this month",
    hi: "इस महीने 85% जैविक फ़ीड",
    mr: "या महिन्यात 85% सेंद्रिय खाद्य",
  },
  "Preventive Care": {
    en: "Preventive Care",
    hi: "निवारक देखभाल",
    mr: "प्रतिबंधात्मक काळजी",
  },
  "Regular health monitoring": {
    en: "Regular health monitoring",
    hi: "नियमित स्वास्थ्य निगरानी",
    mr: "नियमित आरोग्य निरीक्षण",
  },
  "Trading Options": {
    en: "Trading Options",
    hi: "व्यापार विकल्प",
    mr: "व्यापार पर्याय",
  },
  "Sell your bio-credits in the marketplace": {
    en: "Sell your bio-credits in the marketplace",
    hi: "बाज़ार में अपने बायो-क्रेडिट बेचें",
    mr: "बाजारपेठेत आपले बायो-क्रेडिट्स विका",
  },
  "Instant Sale": {
    en: "Instant Sale",
    hi: "तत्काल बिक्री",
    mr: "तत्काळ विक्री",
  },
  "Sell immediately at current market rate": {
    en: "Sell immediately at current market rate",
    hi: "वर्तमान बाजार दर पर तुरंत बेचें",
    mr: "सध्याच्या बाजार दरावर लगेच विका",
  },
  "Rate: ₹15/credit": {
    en: "Rate: ₹15/credit",
    hi: "दर: ₹15/क्रेडिट",
    mr: "दर: ₹15/क्रेडिट",
  },
  "Available now": {
    en: "Available now",
    hi: "अभी उपलब्ध",
    mr: "आता उपलब्ध",
  },
  "Sell Credits": {
    en: "Sell Credits",
    hi: "क्रेडिट बेचें",
    mr: "क्रेडिट्स विका",
  },
  "Future Contract": {
    en: "Future Contract",
    hi: "भविष्य अनुबंध",
    mr: "भविष्यातील करार",
  },
  "Lock in higher rates for future delivery": {
    en: "Lock in higher rates for future delivery",
    hi: "भविष्य की डिलीवरी के लिए उच्च दरों को लॉक करें",
    mr: "भविष्यातील वितरणासाठी उच्च दर लॉक करा",
  },
  "Rate: ₹18/credit": {
    en: "Rate: ₹18/credit",
    hi: "दर: ₹18/क्रेडिट",
    mr: "दर: ₹18/क्रेडिट",
  },
  "30-day contract": {
    en: "30-day contract",
    hi: "30-दिन का अनुबंध",
    mr: "30-दिवसांचा करार",
  },
  "Create Contract": {
    en: "Create Contract",
    hi: "अनुबंध बनाएं",
    mr: "करार तयार करा",
  },

  // Government Subsidies
  "Available subsidies and eligibility status": {
    en: "Available subsidies and eligibility status",
    hi: "उपलब्ध सब्सिडी और पात्रता स्थिति",
    mr: "उपलब्ध अनुदान आणि पात्रता स्थिती",
  },
  "Recommended Subsidies": {
    en: "Recommended Subsidies",
    hi: "अनुशंसित सब्सिडी",
    mr: "शिफारस केलेले अनुदान",
  },
  "AI-recommended subsidies based on your profile": {
    en: "AI-recommended subsidies based on your profile",
    hi: "आपकी प्रोफ़ाइल के आधार पर एआई-अनुशंसित सब्सिडी",
    mr: "आपल्या प्रोफाइलवर आधारित एआय-शिफारस केलेले अनुदान",
  },
  "Organic Farming Incentive": {
    en: "Organic Farming Incentive",
    hi: "जैविक खेती प्रोत्साहन",
    mr: "सेंद्रिय शेती प्रोत्साहन",
  },
  "Livestock Insurance Subsidy": {
    en: "Livestock Insurance Subsidy",
    hi: "पशुधन बीमा सब्सिडी",
    mr: "पशुधन विमा अनुदान",
  },
  "AMU Reduction Bonus": {
    en: "AMU Reduction Bonus",
    hi: "एएमयू कमी बोनस",
    mr: "एएमयू कपात बोनस",
  },
  Eligible: {
    en: "Eligible",
    hi: "पात्र",
    mr: "पात्र",
  },
  Qualified: {
    en: "Qualified",
    hi: "योग्य",
    mr: "योग्य",
  },
  pending: {
    en: "pending",
    hi: "लंबित",
    mr: "प्रलंबित",
  },
  approved: {
    en: "approved",
    hi: "स्वीकृत",
    mr: "मंजूर",
  },
  available: {
    en: "available",
    hi: "उपलब्ध",
    mr: "उपलब्ध",
  },
  "View Status": {
    en: "View Status",
    hi: "स्थिति देखें",
    mr: "स्थिती पहा",
  },
  "Apply Now": {
    en: "Apply Now",
    hi: "अभी आवेदन करें",
    mr: "आता अर्ज करा",
  },
  "Eligibility Checker": {
    en: "Eligibility Checker",
    hi: "पात्रता जांचकर्ता",
    mr: "पात्रता तपासणीकर्ता",
  },
  "Check your eligibility for additional subsidies": {
    en: "Check your eligibility for additional subsidies",
    hi: "अतिरिक्त सब्सिडी के लिए अपनी पात्रता जांचें",
    mr: "अतिरिक्त अनुदानासाठी आपली पात्रता तपासा",
  },
  "Farm Size": {
    en: "Farm Size",
    hi: "खेत का आकार",
    mr: "शेताचा आकार",
  },
  "5+ acres": {
    en: "5+ acres",
    hi: "5+ एकड़",
    mr: "5+ एकर",
  },
  "Livestock Count": {
    en: "Livestock Count",
    hi: "पशुधन संख्या",
    mr: "पशुधन संख्या",
  },
  "10+ animals": {
    en: "10+ animals",
    hi: "10+ पशु",
    mr: "10+ प्राणी",
  },
  "A+ Grade": {
    en: "A+ Grade",
    hi: "ए+ ग्रेड",
    mr: "ए+ ग्रेड",
  },
  "Organic Certification": {
    en: "Organic Certification",
    hi: "जैविक प्रमाणन",
    mr: "सेंद्रिय प्रमाणन",
  },
  Pending: {
    en: "Pending",
    hi: "लंबित",
    mr: "प्रलंबित",
  },
  "Check New Subsidies": {
    en: "Check New Subsidies",
    hi: "नई सब्सिडी जांचें",
    mr: "नवीन अनुदान तपासा",
  },
  "Download Eligibility Report": {
    en: "Download Eligibility Report",
    hi: "पात्रता रिपोर्ट डाउनलोड करें",
    mr: "पात्रता अहवाल डाउनलोड करा",
  },

  // Media Upload Dialog
  "Upload photo or video evidence of medicine administration": {
    en: "Upload photo or video evidence of medicine administration",
    hi: "दवा प्रशासन का फोटो या वीडियो सबूत अपलोड करें",
    mr: "औषध प्रशासनाचा फोटो किंवा व्हिडिओ पुरावा अपलोड करा",
  },
  "Take Photo": {
    en: "Take Photo",
    hi: "फोटो लें",
    mr: "फोटो घ्या",
  },
  "Record Video": {
    en: "Record Video",
    hi: "वीडियो रिकॉर्ड करें",
    mr: "व्हिडिओ रेकॉर्ड करा",
  },
  "Or drag and drop files here": {
    en: "Or drag and drop files here",
    hi: "या यहाँ फ़ाइलें खींचें और छोड़ें",
    mr: "किंवा येथे फाइल्स ड्रॅग आणि ड्रॉप करा",
  },
  "Upload Evidence": {
    en: "Upload Evidence",
    hi: "सबूत अपलोड करें",
    mr: "पुरावा अपलोड करा",
  },
  Cancel: {
    en: "Cancel",
    hi: "रद्द करें",
    mr: "रद्द करा",
  },

  // MoFAHD Dashboard Specific
  "Filters:": {
    en: "Filters:",
    hi: "फ़िल्टर:",
    mr: "फिल्टर:",
  },
  "All States": {
    en: "All States",
    hi: "सभी राज्य",
    mr: "सर्व राज्ये",
  },
  Maharashtra: {
    en: "Maharashtra",
    hi: "महाराष्ट्र",
    mr: "महाराष्ट्र",
  },
  Punjab: {
    en: "Punjab",
    hi: "पंजाब",
    mr: "पंजाब",
  },
  Gujarat: {
    en: "Gujarat",
    hi: "गुजरात",
    mr: "गुजरात",
  },
  "Tamil Nadu": {
    en: "Tamil Nadu",
    hi: "तमिल नाडु",
    mr: "तमिळनाडू",
  },
  "Last Month": {
    en: "Last Month",
    hi: "पिछला महीना",
    mr: "गेला महिना",
  },
  "Last 3 Months": {
    en: "Last 3 Months",
    hi: "पिछले 3 महीने",
    mr: "गेले 3 महिने",
  },
  "Last 6 Months": {
    en: "Last 6 Months",
    hi: "पिछले 6 महीने",
    mr: "गेले 6 महिने",
  },
  "Last Year": {
    en: "Last Year",
    hi: "पिछला साल",
    mr: "गेले वर्ष",
  },
  "National AMU Rate": {
    en: "National AMU Rate",
    hi: "राष्ट्रीय एएमयू दर",
    mr: "राष्ट्रीय एएमयू दर",
  },
  "Total Farmers": {
    en: "Total Farmers",
    hi: "कुल किसान",
    mr: "एकूण शेतकरी",
  },
  "Active Vets": {
    en: "Active Vets",
    hi: "सक्रिय पशु चिकित्सक",
    mr: "सक्रिय पशुवैद्य",
  },
  "Compliance Rate": {
    en: "Compliance Rate",
    hi: "अनुपालन दर",
    mr: "अनुपालन दर",
  },
  "Interactive India Map": {
    en: "Interactive India Map",
    hi: "इंटरैक्टिव भारत मानचित्र",
    mr: "परस्परसंवादी भारत नकाशा",
  },
  "State-wise AMU intensity visualization": {
    en: "State-wise AMU intensity visualization",
    hi: "राज्यवार एएमयू तीव्रता दृश्यीकरण",
    mr: "राज्यनिहाय एएमयू तीव्रता दृश्यीकरण",
  },
  "Low AMU": {
    en: "Low AMU",
    hi: "कम एएमयू",
    mr: "कमी एएमयू",
  },
  "Medium AMU": {
    en: "Medium AMU",
    hi: "मध्यम एएमयू",
    mr: "मध्यम एएमयू",
  },
  "High AMU": {
    en: "High AMU",
    hi: "उच्च एएमयू",
    mr: "उच्च एएमयू",
  },
  "State Overview": {
    en: "State Overview",
    hi: "राज्य अवलोकन",
    mr: "राज्य विहंगावलोकन",
  },
  districts: {
    en: "districts",
    hi: "जिले",
    mr: "जिल्हे",
  },
  Compliance: {
    en: "Compliance",
    hi: "अनुपालन",
    mr: "अनुपालन",
  },
  "Purchase Records Verification": {
    en: "Purchase Records Verification",
    hi: "खरीद रिकॉर्ड सत्यापन",
    mr: "खरेदी नोंदी सत्यापन",
  },
  "Cross-check invoices against farmer usage logs": {
    en: "Cross-check invoices against farmer usage logs",
    hi: "किसान उपयोग लॉग के विरुद्ध चालान की जांच करें",
    mr: "शेतकरी वापर लॉगच्या विरुद्ध बीजक तपासा",
  },
  "Invoice Search & Verification": {
    en: "Invoice Search & Verification",
    hi: "चालान खोज और सत्यापन",
    mr: "बीजक शोध आणि सत्यापन",
  },
  "Search for specific invoices and compare with usage logs": {
    en: "Search for specific invoices and compare with usage logs",
    hi: "विशिष्ट चालान खोजें और उपयोग लॉग के साथ तुलना करें",
    mr: "विशिष्ट बीजक शोधा आणि वापर लॉगशी तुलना करा",
  },
  "Search Invoice": {
    en: "Search Invoice",
    hi: "चालान खोजें",
    mr: "बीजक शोधा",
  },
  "Enter invoice number, farmer ID, or medicine name...": {
    en: "Enter invoice number, farmer ID, or medicine name...",
    hi: "चालान संख्या, किसान आईडी, या दवा का नाम दर्ज करें...",
    mr: "बीजक क्रमांक, शेतकरी आयडी, किंवा औषधाचे नाव प्रविष्ट करा...",
  },
  Search: {
    en: "Search",
    hi: "खोजें",
    mr: "शोधा",
  },
  "Mismatch Detected": {
    en: "Mismatch Detected",
    hi: "बेमेल का पता चला",
    mr: "विसंगती आढळली",
  },
  "Purchase Record": {
    en: "Purchase Record",
    hi: "खरीद रिकॉर्ड",
    mr: "खरेदी नोंद",
  },
  "Medicine:": {
    en: "Medicine:",
    hi: "दवा:",
    mr: "औषध:",
  },
  "Quantity:": {
    en: "Quantity:",
    hi: "मात्रा:",
    mr: "प्रमाण:",
  },
  "Date:": {
    en: "Date:",
    hi: "दिनांक:",
    mr: "दिनांक:",
  },
  "Usage Logs": {
    en: "Usage Logs",
    hi: "उपयोग लॉग",
    mr: "वापर लॉग",
  },
  "Logged Usage:": {
    en: "Logged Usage:",
    hi: "लॉग किया गया उपयोग:",
    mr: "लॉग केलेला वापर:",
  },
  "Period:": {
    en: "Period:",
    hi: "अवधि:",
    mr: "कालावधी:",
  },
  "Discrepancy:": {
    en: "Discrepancy:",
    hi: "विसंगति:",
    mr: "विसंगती:",
  },
  "Farmer logged 5 more doses than purchased. This indicates potential over-reporting or unreported purchases.": {
    en: "Farmer logged 5 more doses than purchased. This indicates potential over-reporting or unreported purchases.",
    hi: "किसान ने खरीदे गए से 5 अधिक खुराक लॉग की। यह संभावित अधिक रिपोर्टिंग या अनरिपोर्टेड खरीदारी का संकेत देता है।",
    mr: "शेतकऱ्याने खरेदी केलेल्यापेक्षा 5 अधिक डोस लॉग केले. हे संभाव्य अधिक अहवाल किंवा अनरिपोर्ट केलेल्या खरेदीचे संकेत देते.",
  },
  "Request Additional Invoices": {
    en: "Request Additional Invoices",
    hi: "अतिरिक्त चालान का अनुरोध करें",
    mr: "अतिरिक्त बीजकांची विनंती करा",
  },
  "Flag for Audit": {
    en: "Flag for Audit",
    hi: "ऑडिट के लिए फ्लैग करें",
    mr: "ऑडिटसाठी फ्लॅग करा",
  },
  "View Details": {
    en: "View Details",
    hi: "विवरण देखें",
    mr: "तपशील पहा",
  },
  Verified: {
    en: "Verified",
    hi: "सत्यापित",
    mr: "सत्यापित",
  },
  "Status:": {
    en: "Status:",
    hi: "स्थिति:",
    mr: "स्थिती:",
  },
  "Purchase and usage records match within acceptable range. 1 dose remaining in inventory.": {
    en: "Purchase and usage records match within acceptable range. 1 dose remaining in inventory.",
    hi: "खरीद और उपयोग रिकॉर्ड स्वीकार्य सीमा के भीतर मेल खाते हैं। इन्वेंटरी में 1 खुराक शेष।",
    mr: "खरेदी आणि वापर नोंदी स्वीकार्य श्रेणीत जुळतात. इन्व्हेंटरीमध्ये 1 डोस शिल्लक.",
  },
  "Mark as Verified": {
    en: "Mark as Verified",
    hi: "सत्यापित के रूप में चिह्नित करें",
    mr: "सत्यापित म्हणून चिन्हांकित करा",
  },

  // Common UI Elements
  "View Details": {
    en: "View Details",
    hi: "विवरण देखें",
    mr: "तपशील पहा",
  },
  "Upload Photo": {
    en: "Upload Photo",
    hi: "फ़ोटो अपलोड करें",
    mr: "फोटो अपलोड करा",
  },
  "Book Now": {
    en: "Book Now",
    hi: "अभी बुक करें",
    mr: "आता बुक करा",
  },
  "Call Emergency": {
    en: "Call Emergency",
    hi: "आपातकाल कॉल करें",
    mr: "आपत्कालीन कॉल करा",
  },
  "Check Status": {
    en: "Check Status",
    hi: "स्थिति जांचें",
    mr: "स्थिती तपासा",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "hi", "mr"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const translate = (key: string): string => {
    if (language === "en") return key

    // Return translation if available, otherwise return original key
    return translations[key]?.[language] || key
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setIsLoading(true)
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)

    // Simulate brief loading for UI feedback
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleLanguageChange,
        translate,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
