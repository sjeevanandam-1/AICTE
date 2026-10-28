# AICTE SatyaVerify AI 🛡️
### AI-Powered Application Validation, Document Authentication & Regulatory Compliance Suite
**Smart India Hackathon (SIH 2026) | Problem Statement ID: SIH26261 | Organization: AICTE**

---

## 🌟 Executive Overview
Every year, the All India Council for Technical Education (AICTE) processes tens of thousands of institutional applications for **Extension of Approval (EoA)**, introduction of new courses, and intake increments. Manual evaluation of bulky physical and scanned dossiers (Land records, Fire NOCs, Building blueprints, Faculty payrolls) is slow, susceptible to human oversight, and vulnerable to deliberate forgeries and "ghost faculty" fraud.

**SatyaVerify AI** is an intelligent, high-throughput, explainable regulatory scrutiny platform designed to automate document authentication, detect image/PDF tampering, eliminate ghost faculty moonlighting, and enforce statutory norms according to the **AICTE Approval Process Handbook (APH 2024-2027)**.

---

## 🚀 Key Modules & Technological Innovations

### 1. 🔬 AI Forensic Document Inspector & Error Level Analysis (ELA)
- **Computer Vision & OCR Engine:** Utilizes layout-aware OCR (`PaddleOCR` / `LayoutLM`) to extract tables, stamps, dates, and acreage numbers.
- **Error Level Analysis (ELA):** Detects digital image manipulations (Photoshop clone stamps, pasted signatures, altered numbers) by measuring compression gradient anomalies across high-frequency pixel clusters.
- **Metadata Forensics:** Identifies authoring software traces (e.g. Canva/Photoshop), mismatch between digital timestamp vs scan timestamp, and clone tool artifacts.

### 2. 👥 Ghost Faculty & Cross-Institution Deduplication Radar
- Solves the critical issue where colleges fraudulently list professors already employed full-time elsewhere to meet the AICTE Student-to-Faculty Ratio (SFR 1:15).
- Employs **Salted SHA-256 Zero-Knowledge Hashes** for Aadhaar and PAN numbers to cross-reference national rosters while preserving personal data privacy.
- Visualizes concurrent appointments, overlapping salary disbursements, and automatically issues show-cause notifications.

### 3. 📜 AICTE APH 2024-27 Deterministic Rule Engine & Simulator
- Formulates statutory mathematical constraints:
  - **Student-to-Faculty Ratio (SFR):** Must be $\le 1:15$ for UG Engineering, $\le 1:12$ for PG, $\le 1:20$ for Polytechnic.
  - **Cadre Ratio:** Enforces $1 \text{ Professor} : 2 \text{ Associate} : 6 \text{ Assistant Professors}$.
  - **Land Sufficiency:** Minimum contiguous acreage ($7.5\text{ Acres}$ urban, $2.5\text{ Acres}$ mega-metro, $10.0\text{ Acres}$ rural).
  - **Built-up Carpet Area:** Minimum $4.0\text{ sq.m}$ per approved intake.
- Includes an **interactive live simulator** to model changing student intake and calculate requisite doctoral cadre requirements.

### 4. 📄 Verifiable Regulatory Audit Dossier (SHA-256 Stamp & QR)
- Generates evidence-linked regulatory audit summaries highlighting non-compliance reasons, clause numbers, and bounding-box evidence rather than a black-box verdict.
- Cryptographically signed with SHA-256 hashing for tamper-proof audit trails.

---

## 🛠️ Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **UI/UX:** High-tech government regulatory dark/light theme, responsive layout, interactive forensic heatmaps
- **Backend Microservice:** Python 3.13, FastAPI, Pydantic, Uvicorn
- **Computer Vision & Forensics:** Pillow (ELA), OpenCV, PaddleOCR, LayoutLMv3

---

## 💻 How to Run the Project

### Prerequisites
- Node.js (v18+ or v20+)
- Python (3.10+)

### Step 1: Start the Modern Frontend
```bash
# In the project root directory:
npm install
npm run dev
```
Open your browser at: `http://localhost:5173`

### Step 2: (Optional) Run the FastAPI Python Microservice
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend API interactive documentation (Swagger UI) will be available at: `http://127.0.0.1:8000/docs`

---

## 🎯 Evaluator Demo Presets (Included in Web App)
To allow instant demonstration to SIH judges without manual file preparation, 3 pre-configured institutional cases are accessible directly from the top bar:
1. **Case 1: Indian Institute of Engineering & Applied Tech (IIEAT)**
   - *Status:* **VERIFIED & COMPLIANT (Score: 97%)**
   - Clean genuine land deeds, valid fire NOC, zero duplicate faculty, optimal SFR 1:14.6.
2. **Case 2: Apex Global College of Engineering**
   - *Status:* **ACTION REQUIRED (Score: 58%)**
   - Expired Fire NOC (172 days lapse), severe senior professor cadre deficit.
3. **Case 3: Vanguard Technical Academy**
   - *Status:* **CRITICAL FRAUD FLAGGED (Score: 19%)**
   - Photoshop clone stamp detected on land acreage deed (ELA Score: 94), 3 Ghost Faculty members moonlighting across multiple universities concurrently.

---

## 🏆 Presentation Pitch Tips for SIH Judges
- **Highlight the National Impact:** Explain how ghost faculty and forged land deeds cause substandard engineering colleges to operate undetected.
- **Explainable AI (XAI):** Show how SatyaVerify AI doesn't just say "Rejected", but points directly to *Clause 7.1* of the AICTE Approval Process Handbook and shows the exact pixel alteration using the ELA Heatmap slider.
- **Privacy Compliance:** Mention that Aadhaar/PAN data is salted and hashed using SHA-256 so no sensitive biometric or personal identifiers are stored in plain text.
