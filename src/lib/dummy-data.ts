


export const dummyDoctors = [
    {
      "doctorId": "DOC-001",
      "name": "Dr. Asha Rao",
      "specialty": "General Physician",
      "hospitalId": "HOS-001",
      "contact": "+919876543210",
      "waitTime": "15 mins",
      "rating": 4.6
    },
    {
      "doctorId": "DOC-002",
      "name": "Dr. Neha Singh",
      "specialty": "Gynecologist",
      "hospitalId": "HOS-002",
      "contact": "+919876543211",
      "waitTime": "30 mins",
      "rating": 4.8
    },
    {
      "doctorId": "DOC-003",
      "name": "Dr. Priya Desai",
      "specialty": "Endocrinologist",
      "hospitalId": "HOS-003",
      "contact": "+919876543212",
      "waitTime": "20 mins",
      "rating": 4.7
    },
    {
      "doctorId": "DOC-004",
      "name": "Dr. Alok Gupta",
      "specialty": "Orthopedic Surgeon",
      "hospitalId": "HOS-003",
      "contact": "+919876543214",
      "waitTime": "25 mins",
      "rating": 4.6
    },
    { "doctorId": "DOC-006", "name": "Dr. Neha Kapoor", "specialty": "Pulmonologist", "hospitalId": "HOS-001", "contact": "+911122223333", "waitTime": "20 mins", "rating": 4.8 },
    { "doctorId": "DOC-007", "name": "Dr. Amit Verma", "specialty": "General Physician", "hospitalId": "HOS-002", "contact": "+911133334444", "waitTime": "10 mins", "rating": 4.6 },
    { "doctorId": "DOC-008", "name": "Dr. Ritu Malhotra", "specialty": "Emergency Medicine", "hospitalId": "HOS-003", "contact": "+911144445555", "waitTime": "5 mins", "rating": 4.7 },
    { "doctorId": "DOC-009", "name": "Dr. Priya Singh", "specialty": "Dermatologist", "hospitalId": "HOS-005", "contact": "+911166667777", "waitTime": "15 mins", "rating": 4.5 },
    { "doctorId": "DOC-010", "name": "Dr. Rajesh Mehra", "specialty": "Cardiologist", "hospitalId": "HOS-004", "contact": "+919876543215", "waitTime": "40 mins", "rating": 4.9 }
]

export const dummyHospitals = [
    {
        "hospitalId": "HOS-001",
        "name": "Apollo Hospital",
        "location": "New Delhi, DL",
        "contact": "+911145678901",
        "patientLoad": "12",
        "coordinates": {"lat": 28.7041, "lng": 77.1025}
    },
    {
        "hospitalId": "HOS-002",
        "name": "Fortis Hospital",
        "location": "Mumbai, MH",
        "contact": "+912226206666",
        "patientLoad": "8",
        "coordinates": {"lat": 19.0760, "lng": 72.8777}
    },
    {
        "hospitalId": "HOS-003",
        "name": "AIIMS",
        "location": "Bangalore, KA",
        "contact": "+918022221111",
        "patientLoad": "20",
        "coordinates": {"lat": 12.9716, "lng": 77.5946}
    },
    {
        "hospitalId": "HOS-004",
        "name": "Medanta",
        "location": "Hyderabad, TS",
        "contact": "+914023607777",
        "patientLoad": "15",
        "coordinates": {"lat": 17.3850, "lng": 78.4867}
    },
    {
        "hospitalId": "HOS-005",
        "name": "Max Healthcare",
        "location": "Chennai, TN",
        "contact": "+914428282828",
        "patientLoad": "10",
        "coordinates": {"lat": 13.0827, "lng": 80.2707}
    }
]

export const dummyMedicines = [
    { "medicineId": "MED-001", "name": "Paracetamol", "chemical": "C8H9NO2", "usage": "Fever, Pain", "dosageForm": "Tablet", "prescribedBy": "DOC-007", "govtPrice": 2, "privatePrice": 12, "frequentlyUsed": true },
    { "medicineId": "MED-002", "name": "Cetirizine", "chemical": "C21H25ClN2O3", "usage": "Cold, Allergy", "dosageForm": "Tablet", "prescribedBy": "DOC-006", "govtPrice": 4, "privatePrice": 20, "frequentlyUsed": true },
    { "medicineId": "MED-003", "name": "Ibuprofen", "chemical": "C13H18O2", "usage": "Pain, Inflammation", "dosageForm": "Tablet", "prescribedBy": "DOC-004", "govtPrice": 5, "privatePrice": 30, "frequentlyUsed": true },
    { "medicineId": "MED-004", "name": "Amoxicillin", "chemical": "C16H19N3O5S", "usage": "Infection", "dosageForm": "Capsule", "prescribedBy": "DOC-008", "govtPrice": 15, "privatePrice": 75, "frequentlyUsed": false },
    { "medicineId": "MED-005", "name": "Azithromycin", "chemical": "C38H72N2O12", "usage": "Infection", "dosageForm": "Tablet", "prescribedBy": "DOC-009", "govtPrice": 25, "privatePrice": 120, "frequentlyUsed": false },
    { "medicineId": "MED-006", "name": "Metformin", "chemical": "C4H11N5", "usage": "Diabetes", "dosageForm": "Tablet", "prescribedBy": "DOC-003", "govtPrice": 3, "privatePrice": 15, "frequentlyUsed": true },
    { "medicineId": "MED-007", "name": "Amlodipine", "chemical": "C20H25ClN2O5", "usage": "Hypertension", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 5, "privatePrice": 25, "frequentlyUsed": true },
    { "medicineId": "MED-008", "name": "Atorvastatin", "chemical": "C33H35FN2O5", "usage": "High Cholesterol", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 8, "privatePrice": 50, "frequentlyUsed": false },
    { "medicineId": "MED-009", "name": "Omeprazole", "chemical": "C17H19N3O3S", "usage": "Acidity, GERD", "dosageForm": "Capsule", "prescribedBy": "DOC-007", "govtPrice": 6, "privatePrice": 35, "frequentlyUsed": true },
    { "medicineId": "MED-010", "name": "Salbutamol Inhaler", "chemical": "C13H21NO3", "usage": "Asthma, COPD", "dosageForm": "Inhaler", "prescribedBy": "DOC-006", "govtPrice": 50, "privatePrice": 250, "frequentlyUsed": true },
    { "medicineId": "MED-011", "name": "Levothyroxine", "chemical": "C15H11I4NO4", "usage": "Hypothyroidism", "dosageForm": "Tablet", "prescribedBy": "DOC-003", "govtPrice": 10, "privatePrice": 60, "frequentlyUsed": false },
    { "medicineId": "MED-012", "name": "D-Rise (Vitamin D)", "chemical": "C27H44O", "usage": "Vitamin D Deficiency", "dosageForm": "Capsule", "prescribedBy": "DOC-007", "govtPrice": 20, "privatePrice": 100, "frequentlyUsed": true },
    { "medicineId": "MED-013", "name": "Clopidogrel", "chemical": "C16H16ClNO2S", "usage": "Blood Thinner", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 12, "privatePrice": 70, "frequentlyUsed": false },
    { "medicineId": "MED-014", "name": "Prednisolone", "chemical": "C21H28O5", "usage": "Inflammation, Allergy", "dosageForm": "Tablet", "prescribedBy": "DOC-006", "govtPrice": 10, "privatePrice": 45, "frequentlyUsed": false },
    { "medicineId": "MED-015", "name": "Multivitamin", "chemical": "Varies", "usage": "Supplement", "dosageForm": "Tablet", "prescribedBy": "DOC-007", "govtPrice": 15, "privatePrice": 90, "frequentlyUsed": true },
    { "medicineId": "MED-016", "name": "Iron Folic Acid", "chemical": "Varies", "usage": "Anemia", "dosageForm": "Tablet", "prescribedBy": "DOC-002", "govtPrice": 7, "privatePrice": 40, "frequentlyUsed": false },
    { "medicineId": "MED-017", "name": "Ondansetron", "chemical": "C18H19N3O", "usage": "Nausea, Vomiting", "dosageForm": "Tablet", "prescribedBy": "DOC-008", "govtPrice": 8, "privatePrice": 40, "frequentlyUsed": false },
    { "medicineId": "MED-018", "name": "Loratadine", "chemical": "C22H23ClN2O2", "usage": "Allergy", "dosageForm": "Tablet", "prescribedBy": "DOC-009", "govtPrice": 5, "privatePrice": 25, "frequentlyUsed": false },
    { "medicineId": "MED-019", "name": "Diclofenac Gel", "chemical": "C14H11Cl2NO2", "usage": "Pain Relief (Topical)", "dosageForm": "Gel", "prescribedBy": "DOC-004", "govtPrice": 20, "privatePrice": 80, "frequentlyUsed": true },
    { "medicineId": "MED-020", "name": "Pantoprazole", "chemical": "C16H15F2N3O4S", "usage": "Acidity, GERD", "dosageForm": "Tablet", "prescribedBy": "DOC-007", "govtPrice": 7, "privatePrice": 45, "frequentlyUsed": false },
    { "medicineId": "MED-021", "name": "Telmisartan", "chemical": "C33H30N4O2", "usage": "Hypertension", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 9, "privatePrice": 60, "frequentlyUsed": false },
    { "medicineId": "MED-022", "name": "Rosuvastatin", "chemical": "C22H28FN3O6S", "usage": "High Cholesterol", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 10, "privatePrice": 70, "frequentlyUsed": false },
    { "medicineId": "MED-023", "name": "Glimpiride", "chemical": "C24H34N4O5S", "usage": "Diabetes", "dosageForm": "Tablet", "prescribedBy": "DOC-003", "govtPrice": 6, "privatePrice": 30, "frequentlyUsed": false },
    { "medicineId": "MED-024", "name": "Hydrochlorothiazide", "chemical": "C7H8ClN3O4S2", "usage": "Hypertension, Diuretic", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 4, "privatePrice": 20, "frequentlyUsed": false },
    { "medicineId": "MED-025", "name": "Montelukast", "chemical": "C35H36ClNO3S", "usage": "Asthma, Allergy", "dosageForm": "Tablet", "prescribedBy": "DOC-006", "govtPrice": 15, "privatePrice": 80, "frequentlyUsed": true },
    { "medicineId": "MED-026", "name": "Ciprofloxacin", "chemical": "C17H18FN3O3", "usage": "Infection", "dosageForm": "Tablet", "prescribedBy": "DOC-007", "govtPrice": 12, "privatePrice": 65, "frequentlyUsed": false },
    { "medicineId": "MED-027", "name": "Domperidone", "chemical": "C22H24ClN5O2", "usage": "Nausea, Vomiting", "dosageForm": "Tablet", "prescribedBy": "DOC-007", "govtPrice": 5, "privatePrice": 25, "frequentlyUsed": false },
    { "medicineId": "MED-028", "name": "Folic Acid", "chemical": "C19H19N7O6", "usage": "Supplement, Anemia", "dosageForm": "Tablet", "prescribedBy": "DOC-002", "govtPrice": 2, "privatePrice": 10, "frequentlyUsed": false },
    { "medicineId": "MED-029", "name": "Calcium Carbonate", "chemical": "CaCO3", "usage": "Supplement", "dosageForm": "Tablet", "prescribedBy": "DOC-004", "govtPrice": 3, "privatePrice": 15, "frequentlyUsed": false },
    { "medicineId": "MED-030", "name": "Tramadol", "chemical": "C16H25NO2", "usage": "Severe Pain", "dosageForm": "Injection", "prescribedBy": "DOC-008", "govtPrice": 20, "privatePrice": 100, "frequentlyUsed": false },
    { "medicineId": "MED-031", "name": "Miconazole Cream", "chemical": "C18H14Cl4N2O", "usage": "Fungal Infection", "dosageForm": "Cream", "prescribedBy": "DOC-009", "govtPrice": 25, "privatePrice": 90, "frequentlyUsed": false },
    { "medicineId": "MED-032", "name": "Losartan", "chemical": "C22H23ClN6O", "usage": "Hypertension", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 8, "privatePrice": 55, "frequentlyUsed": false },
    { "medicineId": "MED-033", "name": "Fluconazole", "chemical": "C13H12F2N6O", "usage": "Fungal Infection", "dosageForm": "Capsule", "prescribedBy": "DOC-009", "govtPrice": 10, "privatePrice": 50, "frequentlyUsed": false },
    { "medicineId": "MED-034", "name": "Bisoprolol", "chemical": "C18H31NO4", "usage": "Heart Conditions", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 7, "privatePrice": 40, "frequentlyUsed": false },
    { "medicineId": "MED-035", "name": "Doxycycline", "chemical": "C22H24N2O8", "usage": "Infection", "dosageForm": "Capsule", "prescribedBy": "DOC-007", "govtPrice": 9, "privatePrice": 60, "frequentlyUsed": false },
    { "medicineId": "MED-036", "name": "Esomeprazole", "chemical": "C17H19N3O3S", "usage": "Acidity, GERD", "dosageForm": "Capsule", "prescribedBy": "DOC-007", "govtPrice": 8, "privatePrice": 50, "frequentlyUsed": false },
    { "medicineId": "MED-037", "name": "Vildagliptin", "chemical": "C17H25N3O2", "usage": "Diabetes", "dosageForm": "Tablet", "prescribedBy": "DOC-003", "govtPrice": 10, "privatePrice": 75, "frequentlyUsed": false },
    { "medicineId": "MED-038", "name": "Tamsulosin", "chemical": "C20H28N2O5S", "usage": "Prostate", "dosageForm": "Capsule", "prescribedBy": "DOC-001", "govtPrice": 15, "privatePrice": 90, "frequentlyUsed": false },
    { "medicineId": "MED-039", "name": "Warfarin", "chemical": "C19H16O4", "usage": "Blood Thinner", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 5, "privatePrice": 30, "frequentlyUsed": false },
    { "medicineId": "MED-040", "name": "Digoxin", "chemical": "C41H64O14", "usage": "Heart Failure", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 6, "privatePrice": 40, "frequentlyUsed": false },
    { "medicineId": "MED-041", "name": "Spironolactone", "chemical": "C24H32O4S", "usage": "Diuretic, Heart Failure", "dosageForm": "Tablet", "prescribedBy": "DOC-010", "govtPrice": 7, "privatePrice": 45, "frequentlyUsed": false },
    { "medicineId": "MED-042", "name": "Allopurinol", "chemical": "C5H4N4O", "usage": "Gout", "dosageForm": "Tablet", "prescribedBy": "DOC-001", "govtPrice": 4, "privatePrice": 25, "frequentlyUsed": false },
    { "medicineId": "MED-043", "name": "Finasteride", "chemical": "C23H36N2O2", "usage": "Prostate, Hair Loss", "dosageForm": "Tablet", "prescribedBy": "DOC-009", "govtPrice": 20, "privatePrice": 120, "frequentlyUsed": false },
    { "medicineId": "MED-044", "name": "Sertraline", "chemical": "C17H17Cl2N", "usage": "Depression, Anxiety", "dosageForm": "Tablet", "prescribedBy": "DOC-001", "govtPrice": 10, "privatePrice": 70, "frequentlyUsed": false },
    { "medicineId": "MED-045", "name": "Alprazolam", "chemical": "C17H13ClN4", "usage": "Anxiety, Panic Disorder", "dosageForm": "Tablet", "prescribedBy": "DOC-001", "govtPrice": 8, "privatePrice": 50, "frequentlyUsed": false },
    { "medicineId": "MED-046", "name": "Phenytoin", "chemical": "C15H12N2O2", "usage": "Seizures", "dosageForm": "Tablet", "prescribedBy": "DOC-001", "govtPrice": 9, "privatePrice": 60, "frequentlyUsed": false },
    { "medicineId": "MED-047", "name": "Carbamazepine", "chemical": "C15H12N2O", "usage": "Seizures, Bipolar", "dosageForm": "Tablet", "prescribedBy": "DOC-001", "govtPrice": 11, "privatePrice": 80, "frequentlyUsed": false },
    { "medicineId": "MED-048", "name": "Gabapentin", "chemical": "C9H17NO2", "usage": "Nerve Pain, Seizures", "dosageForm": "Capsule", "prescribedBy": "DOC-004", "govtPrice": 14, "privatePrice": 95, "frequentlyUsed": false },
    { "medicineId": "MED-049", "name": "Pregabalin", "chemical": "C8H17NO2", "usage": "Nerve Pain, Fibromyalgia", "dosageForm": "Capsule", "prescribedBy": "DOC-004", "govtPrice": 18, "privatePrice": 110, "frequentlyUsed": false },
    { "medicineId": "MED-050", "name": "Insulin Glargine", "chemical": "C267H404N72O78S6", "usage": "Diabetes", "dosageForm": "Injection", "prescribedBy": "DOC-003", "govtPrice": 200, "privatePrice": 800, "frequentlyUsed": false }
];

export const dummyAmbulances = [
  {"id": "AMB-001", "vehicle_no": "MH-12-AB-1234", "driver_name": "Ravi Kumar", "driver_phone": "+919876500001", "type": "Basic", "status": "available", "current_coords": {"lat": 19.0860, "lng": 72.8877}, "speed_kmph": 60, "hospital_id": "HOS-001"},
  {"id": "AMB-002", "vehicle_no": "DL-3C-CD-5678", "driver_name": "Sunita Sharma", "driver_phone": "+919876500002", "type": "ICU", "status": "available", "current_coords": {"lat": 28.7141, "lng": 77.1125}, "speed_kmph": 50, "hospital_id": "HOS-002"},
  {"id": "AMB-003", "vehicle_no": "TS-09-EF-9012", "driver_name": "Anil Yadav", "driver_phone": "+919876500003", "type": "Advanced Life Support", "status": "on-trip", "current_coords": {"lat": 17.4050, "lng": 78.4967}, "speed_kmph": 70, "hospital_id": "HOS-003"},
  {"id": "AMB-004", "vehicle_no": "KA-01-GH-3456", "driver_name": "Sunil Reddy", "driver_phone": "+919876500004", "type": "Basic", "status": "available", "current_coords": {"lat": 12.9816, "lng": 77.6046}, "speed_kmph": 55, "hospital_id": "HOS-004"},
  {"id": "AMB-005", "vehicle_no": "MH-14-IJ-7890", "driver_name": "Vijay Singh", "driver_phone": "+919876500005", "type": "ICU", "status": "offline", "current_coords": {"lat": 18.5304, "lng": 73.8667}, "speed_kmph": 0, "hospital_id": "HOS-005"},
  {"id": "AMB-006", "vehicle_no": "MH-12-KL-2468", "driver_name": "Deepak Sharma", "driver_phone": "+919876500006", "type": "Basic", "status": "available", "current_coords": {"lat": 19.0660, "lng": 72.8677}, "speed_kmph": 45, "hospital_id": "HOS-001"},
  {"id": "AMB-007", "vehicle_no": "DL-3C-MN-1357", "driver_name": "Manoj Tiwari", "driver_phone": "+919876500007", "type": "Advanced Life Support", "status": "on-trip", "current_coords": {"lat": 28.6941, "lng": 77.0925}, "speed_kmph": 65, "hospital_id": "HOS-002"},
  {"id": "AMB-008", "vehicle_no": "TS-09-OP-8642", "driver_name": "Rajesh Gupta", "driver_phone": "+919876500008", "type": "Basic", "status": "available", "current_coords": {"lat": 17.3750, "lng": 78.4767}, "speed_kmph": 58, "hospital_id": "HOS-003"},
  {"id": "AMB-009", "vehicle_no": "KA-01-QR-9753", "driver_name": "Naveen Gowda", "driver_phone": "+919876500009", "type": "ICU", "status": "offline", "current_coords": {"lat": 12.9616, "lng": 77.5846}, "speed_kmph": 0, "hospital_id": "HOS-04"},
  {"id": "AMB-010", "vehicle_no": "MH-14-ST-1928", "driver_name": "Prakash Joshi", "driver_phone": "+919876500010", "type": "Advanced Life Support", "status": "available", "current_coords": {"lat": 18.5104, "lng": 73.8467}, "speed_kmph": 52, "hospital_id": "HOS-005"}
];

export const dummyPatients = [
  {
    "patientId": "P-102345",
    "name": "Rahul Sharma",
    "phone": "+919876543210",
    "email": "rahul.sharma@example.com",
    "dob": "1992-07-22",
    "gender": "Male",
    "aadhaar": "XXXX-XXXX-1234",
    "address": { "street": "45, Green Park", "city": "New Delhi", "state": "DL", "zip": "110016" },
    "bloodGroup": "O+",
    "healthOverview": {
      "status": "Good",
      "riskLevel": "Medium",
      "chronicConditions": "Mild asthma",
      "allergies": "Seasonal pollen (hay fever)",
      "latestNotes": "2025-09-28: BP borderline high; lifestyle measures advised. 2025-09-20: Occasional shortness of breath; spirometry advised."
    },
    "emergencyContact": { "name": "Priya Sharma", "phone": "+919888800001" },
    "insurance": { "provider": "Star Health", "policyId": "INS-A01" },
    "vitals": {
      "heartRate": [78, 80, 81, 79, 85, 82, 82],
      "bloodPressure": ["125/80","126/82","128/81","127/83","130/85","128/84","128/84"],
      "bloodSugar": [95, 98, 100, 97, 96, 99, 101],
      "oxygenSaturation": [97, 97, 98, 97, 96, 98, 97],
      "temperature": 36.7,
      "bmi": 24.3,
      "sleepHours": [6, 7, 6.5, 7, 6, 6.5, 7]
    },
    "lifestyle": {
      "smoking": "No",
      "alcohol": "Occasional social drinking",
      "exercise": "3-4 times/week (light jogging and yoga)",
      "diet": "Vegetarian, balanced diet",
    },
    "appointments": [
      {"appointmentId": "APP-001", "date": "2025-10-20T10:00:00Z", "doctorId": "DOC-006", "hospitalId": "HOS-001", "status": "booked", "urgent": false},
      {"appointmentId": "APP-002", "date": "2025-09-15T14:30:00Z", "doctorId": "DOC-007", "hospitalId": "HOS-002", "status": "completed", "urgent": false}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [80, 81, 79, 82, 83, 81, 80], "bloodPressure": ["128/82","127/81","129/83","130/84","128/82","129/83","128/82"]},
      "appointmentProbability": [0.3,0.4,0.3,0.5,0.4,0.3,0.4],
      "medicationAdherence": [0.95,0.97,0.93,0.96,0.94,0.95,0.96],
      "risk": {
        "hypertension": "Medium",
        "diabetes": "Low",
        "heartDisease": "Medium"
      },
      "preventiveMeasures": "Daily 30 min cardio, Reduce refined sugar intake, Monthly BP checks."
    },
    "medicalEncounters": [
      {
        "encounterId": "ENC-001",
        "date": "2024-03-01",
        "department": "Pulmonology",
        "doctor": "Dr. Neha Kapoor",
        "reason": "Seasonal Asthma flare, shortness of breath, wheezing",
        "findings": "Wheezing, RR 18/min, SpO₂ 96%",
        "investigations": "Spirometry, Chest X-ray",
        "treatment": "Salbutamol inhaler 2 puffs PRN, Prednisolone 20 mg daily x5 days",
        "dischargeNotes": "Follow-up in 1 month. Outcome: Symptoms improved."
      },
      {
        "encounterId": "ENC-002",
        "date": "2025-01-15",
        "department": "General Medicine",
        "doctor": "Dr. Amit Verma",
        "reason": "Routine Annual Checkup",
        "findings": "BP 130/84, HR 80, BMI 24.1",
        "investigations": "Fasting glucose 92 mg/dL, Lipid profile, ECG",
        "treatment": "Lifestyle counseling (diet & exercise)",
        "dischargeNotes": "Monthly BP monitoring. Outcome: Stable."
      },
      {
        "encounterId": "ENC-003",
        "date": "2025-09-12",
        "department": "Emergency",
        "doctor": "Dr. Ritu Malhotra",
        "reason": "Acute shortness of breath after running",
        "findings": "Tachycardia 110 bpm, SpO₂ 95%",
        "investigations": "ECG, Peak flow, Chest auscultation",
        "treatment": "Nebulized bronchodilator, Observation 4 hours",
        "dischargeNotes": "Follow-up with Pulmonology if recurs. Outcome: Symptoms improved."
      },
      {
        "encounterId": "ENC-004",
        "date": "2025-09-28",
        "department": "Cardiology",
        "doctor": "Dr. Rajesh Mehra",
        "reason": "Follow-up for borderline high BP",
        "findings": "BP 128/84. No other significant findings.",
        "investigations": "2D Echocardiogram, Stress Test",
        "treatment": "Advised DASH diet, increase cardio exercise to 5x/week.",
        "dischargeNotes": "Re-check BP in 3 months. No medication needed at this time. Outcome: Monitoring."
      },
      {
        "encounterId": "ENC-005",
        "date": "2025-10-05",
        "department": "Dermatology",
        "doctor": "Dr. Priya Singh",
        "reason": "Minor skin rash on arm",
        "findings": "Mild contact dermatitis, likely from a new detergent.",
        "investigations": "None",
        "treatment": "Topical hydrocortisone cream 1% for 1 week.",
        "dischargeNotes": "Avoid new detergent. Follow-up if rash persists. Outcome: Improving."
      }
    ],
    "medications": {
      "current": [
        {"medicineId": "MED-010", "name": "Salbutamol Inhaler", "dosage": "100 mcg/puff, 2 puffs PRN", "reason": "Asthma (rescue)", "type": "current"},
        {"medicineId": "MED-015", "name": "Multivitamin", "dosage": "Once daily", "reason": "Supplement", "type": "current"}
      ],
      "past": [
        {"medicineId": "MED-014", "name": "Prednisolone", "dosage": "20 mg, 5 days, oral", "reason": "Asthma exacerbation", "type": "past"},
        {"medicineId": "MED-005", "name": "Azithromycin", "dosage": "500 mg, 3 days, oral", "reason": "Respiratory infection", "type": "past"}
      ],
      "otc": [
        {"name": "Paracetamol", "dosage": "500mg PRN", "reason": "Headache/Fever", "type": "otc"},
        {"name": "Cough lozenges", "dosage": "PRN", "reason": "Sore throat", "type": "otc"}
      ]
    },
    "investigations": [
      {"investigationId": "INV-001", "date": "2024-03-02", "type": "Spirometry", "summary": "Mild reversible obstructive pattern.", "doctor": "Dr. Neha Kapoor"},
      {"investigationId": "INV-002", "date": "2024-03-02", "type": "Chest X-ray", "summary": "Clear lung fields, no acute abnormalities.", "doctor": "Dr. Neha Kapoor", "imageUrl": "https://picsum.photos/seed/rad1/600/400"},
      {"investigationId": "INV-003", "date": "2025-01-16", "type": "Blood Test", "summary": "FBG 92 mg/dL; Lipid profile borderline.", "doctor": "Dr. Amit Verma"},
      {"investigationId": "INV-004", "date": "2025-09-12", "type": "ECG", "summary": "Transient sinus tachycardia; no ischemia.", "doctor": "Dr. Ritu Malhotra"},
      {"investigationId": "INV-005", "date": "2025-09-30", "type": "Ultrasound", "summary": "2D Echo: Structurally normal heart, EF 60%.", "doctor": "Dr. Rahul Mehra", "imageUrl": "https://picsum.photos/seed/rad2/600/400"},
      {"investigationId": "INV-006", "date": "2025-09-30", "type": "MRI", "summary": "Stress Test: Negative for inducible ischemia.", "doctor": "Dr. Rahul Mehra"}
    ],
    "vaccinations": ["COVID-19 (2 doses + booster)", "Tetanus (Up to date)", "Annual flu vaccine"],
    "carePlan": {
      "shortTerm": "Use inhaler PRN; peak flow twice daily for 2 weeks; follow-up Pulmonology if recurrence.",
      "longTerm": "30 min cardio 3-5x/week; reduce refined sugars; monthly BP checks; annual flu vaccine; up-to-date COVID boosters.",
      "nextFollowUp": "Pulmonology - 2025-10-20"
    },
    "currentStatus": {
      "clinicalStatus": "Stable with intermittent exertional dyspnea",
      "workRestrictions": "None; avoid smoke/dust"
    }
  },
  {
    "patientId": "PAT-20251001-0002",
    "name": "Anjali Verma",
    "phone": "+919999900002",
    "email": "anjali.verma@example.com",
    "dob": "1992-08-20",
    "gender": "Female",
    "aadhaar": "XXXX-XXXX-2345",
    "address": { "street": "45, GK-1", "city": "New Delhi", "state": "DL", "zip": "110048" },
    "bloodGroup": "A+",
    "healthOverview": {
      "status": "Good",
      "riskLevel": "Low",
      "chronicConditions": "Vitamin D deficiency",
      "allergies": "None",
      "latestNotes": "Follow-up for Vitamin D levels in 3 months."
    },
    "emergencyContact": { "name": "Rohan Verma", "phone": "+919888800002" },
    "insurance": { "provider": "ICICI Lombard", "policyId": "INS-B02" },
    "vitals": {
      "heartRate": [78, 80, 77, 79, 78, 80, 81],
      "bloodPressure": ["118/76","120/78","119/77","118/76","119/77","120/78","121/79"],
      "bloodSugar": [90, 92, 91, 93, 92, 94, 95],
      "oxygenSaturation": [96, 97, 96, 95, 97, 96, 97],
      "temperature": 36.8,
      "bmi": 22.1,
      "sleepHours": [7, 8, 7.5, 8, 7, 7.5, 8]
    },
     "lifestyle": {
      "smoking": "No",
      "alcohol": "No",
      "exercise": "5 times/week (Yoga and walking)",
      "diet": "Non-vegetarian, balanced diet",
    },
    "appointments": [
      {"appointmentId": "APP-003", "date": "2025-10-07T11:00:00Z", "doctorId": "DOC-002", "hospitalId": "HOS-002", "status": "booked", "urgent": false }
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [79,78,80,81,79,78,80], "bloodPressure": ["119/77","120/78","118/76","119/77","120/78","119/77","118/76"]},
      "appointmentProbability": [0.85,0.8,0.75,0.9,0.85,0.8,0.9],
      "medicationAdherence": [0.97,0.96,0.95,0.98,0.97,0.96,0.97],
      "risk": {
        "hypertension": "Low",
        "diabetes": "Low",
        "heartDisease": "Low"
      },
       "preventiveMeasures": "Continue Vitamin D supplements, regular sun exposure."
    },
    "medicalEncounters": [
        {"encounterId": "ENC-006", "date": "2025-09-15", "department": "General Medicine", "doctor": "Dr. Amit Verma", "reason": "Follow-up for Vitamin D deficiency.", "findings": "Levels improving.", "investigations": "Vitamin D test", "treatment": "Continue supplements", "dischargeNotes": "Re-check in 3 months."}
    ],
    "medications": {
        "current": [{"medicineId": "MED-012", "name": "D-Rise (Vitamin D)", "dosage": "1 tablet weekly", "reason": "Vitamin D deficiency", "type": "current"}],
        "past": [],
        "otc": []
    },
    "investigations": [
        {"investigationId": "INV-007", "date": "2025-09-15", "type": "Blood Test", "summary": "Vitamin D levels at 25 ng/mL (previously 10 ng/mL).", "doctor": "Dr. Amit Verma"}
    ],
    "vaccinations": ["COVID-19 (2 doses + booster)", "Tetanus (Up to date)"],
    "carePlan": {
        "shortTerm": "Continue Vitamin D supplement weekly.",
        "longTerm": "Annual health checkups.",
        "nextFollowUp": "General Medicine - 2025-12-15"
    },
    "currentStatus": {
        "clinicalStatus": "Stable and healthy",
        "workRestrictions": "None"
    }
  }
];

export type Patient = typeof dummyPatients[0];
export type Doctor = typeof dummyDoctors[0];
export type Hospital = typeof dummyHospitals[0];
export type Medicine = typeof dummyMedicines[0];
export type Ambulance = typeof dummyAmbulances[0];
export type MedicalEncounter = Patient["medicalEncounters"][0];
export type Investigation = Patient["investigations"][0];

    
