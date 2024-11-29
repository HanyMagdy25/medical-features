import Icon1 from "./src/assets/iconCard (1).svg";
import Icon2 from "./src/assets/iconCard (2).svg";
import Icon3 from "./src/assets/iconCard (3).svg";
import Icon4 from "./src/assets/iconCard (4).svg";
import Icon5 from "./src/assets/iconCard (5).svg";
import Icon6 from "./src/assets/iconCard (6).svg";
import Icon7 from "./src/assets/iconCard (7).svg";
import Icon8 from "./src/assets/iconCard (8).svg";
import Icon9 from "./src/assets/iconCard (9).svg";
import Icon10 from "./src/assets/iconCard (10).svg";
import Icon11 from "./src/assets/iconCard (11).svg";
const generateSlug = (feature) => {
  return feature
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-alphanumeric characters (except hyphens)
    .replace(/--+/g, "-"); // Replace multiple hyphens with one
};
const hospitalFeatures = [
  {
    feature: "Patient Registration",
    slug: generateSlug("Patient Registration"),
    description:
      "Patients can register and create their profiles, including personal information, medical history, and insurance details.",
    subModules: [
      "Registration form",
      "Insurance verification",
      "Medical history form",
    ],
    icon: Icon1,
  },
  {
    feature: "Appointment Scheduling",
    slug: generateSlug("Appointment Scheduling"),
    description:
      "Patients can schedule appointments with doctors and view their appointment history. Doctors can view their schedule and update their availability.",
    subModules: [
      "Appointment booking",
      "Appointment reminders",
      "Doctor schedule management",
    ],
    icon: Icon2,
  },
  {
    feature: "Medical Record Management",
    slug: generateSlug("Medical Record Management"),
    description:
      "Doctors can manage patient records and update them as needed.",
    subModules: [
      "Patient record creation",
      "Medical history updates",
      "Prescription management",
    ],
    icon: Icon3,
  },
  {
    feature: "Billing and Payment Processing",
    slug: generateSlug("Billing and Payment Processing"),
    description:
      "Patients can view their bills and pay online through the application.",
    subModules: ["Bill generation", "Payment processing", "Payment history"],
    icon: Icon4,
  },
  {
    feature: "Reports and Analytics",
    slug: generateSlug("Reports and Analytics"),
    description:
      "The application can generate reports and analytics to provide insights into patient demographics, appointment history, and revenue.",
    subModules: [
      "Patient demographics report",
      "Appointment history report",
      "Revenue report",
    ],
    icon: Icon5,
  },
  {
    feature: "Prescription Management",
    slug: generateSlug("Prescription Management"),
    description:
      "Doctors can create and manage prescriptions for patients. Patients can view their prescriptions and request refills.",
    subModules: [
      "Prescription creation",
      "Prescription history",
      "Refill requests",
    ],
    icon: Icon6,
  },
  {
    feature: "Lab and Test Results",
    slug: generateSlug("Lab and Test Results"),
    description:
      "Patients can view their lab and test results through the application. Doctors can view and manage the results as needed.",
    subModules: [
      "Test result upload",
      "Test result viewing",
      "Result management",
    ],
    icon: Icon7,
  },
  {
    feature: "Electronic Health Records",
    slug: generateSlug("Electronic Health Records"),
    description:
      "The application can store and manage electronic health records for patients, including medical history, diagnoses, and treatment plans.",
    subModules: ["EHR creation", "EHR updates", "EHR viewing"],
    icon: Icon8,
  },
  {
    feature: "Inventory Management",
    slug: generateSlug("Inventory Management"),
    description:
      "The application can manage inventory for medical supplies and equipment, including tracking usage and reordering as needed.",
    subModules: ["Inventory tracking", "Reorder management", "Usage reports"],
    icon: Icon9,
  },
  {
    feature: "Staff Management",
    slug: generateSlug("Staff Management"),
    description:
      "The application can manage staff schedules, payroll, and performance evaluations.",
    subModules: [
      "Staff scheduling",
      "Payroll management",
      "Performance evaluation",
    ],
    icon: Icon10,
  },
  {
    feature: "Telemedicine",
    slug: generateSlug("Telemedicine"),
    description:
      "The application can support telemedicine appointments, allowing patients to connect with doctors remotely.",
    subModules: [
      "Telemedicine appointment booking",
      "Video conferencing",
      "Remote diagnosis",
    ],
    icon: Icon11,
  },
  {
    feature: "Emergency Management",
    slug: generateSlug("Emergency Management"),
    description:
      "The application can provide emergency alerts and notifications to staff and patients in case of a crisis or disaster.",
    subModules: ["Emergency alerts", "Disaster management", "Crisis response"],
    icon: Icon3,
  },
];

export default hospitalFeatures;
