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
  },
  {
    feature: "Billing and Payment Processing",
    slug: generateSlug("Billing and Payment Processing"),
    description:
      "Patients can view their bills and pay online through the application.",
    subModules: ["Bill generation", "Payment processing", "Payment history"],
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
  },
  {
    feature: "Electronic Health Records",
    slug: generateSlug("Electronic Health Records"),
    description:
      "The application can store and manage electronic health records for patients, including medical history, diagnoses, and treatment plans.",
    subModules: ["EHR creation", "EHR updates", "EHR viewing"],
  },
  {
    feature: "Inventory Management",
    slug: generateSlug("Inventory Management"),
    description:
      "The application can manage inventory for medical supplies and equipment, including tracking usage and reordering as needed.",
    subModules: ["Inventory tracking", "Reorder management", "Usage reports"],
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
  },
  {
    feature: "Emergency Management",
    slug: generateSlug("Emergency Management"),
    description:
      "The application can provide emergency alerts and notifications to staff and patients in case of a crisis or disaster.",
    subModules: ["Emergency alerts", "Disaster management", "Crisis response"],
  },
];

export default hospitalFeatures;
