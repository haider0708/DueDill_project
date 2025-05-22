import pdfplumber
import re
import csv

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def extract_questions_only(text):
    lines = text.split("\n")
    questions = []

    for line in lines:
        line = line.strip()
        if line.startswith("○"):
            question = line.lstrip("○").strip()
            questions.append(question)

    return questions

def print_questions(questions):
    for q in questions:
        print(q)

def save_questions_to_csv(questions, csv_path):
    with open(csv_path, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(["Question"])  # header
        for question in questions:
            writer.writerow([question])

# === RUN SCRIPT ===
pdf_path = "Questions Bank Example Due Diligence on Crypto Assets.pdf"  # Replace with your actual file path
csv_path = "extracted_questions.csv"

text = extract_text_from_pdf(pdf_path)
questions = extract_questions_only(text)
print_questions(questions)
save_questions_to_csv(questions, csv_path)




def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def extract_questions_only(text):
    lines = text.split("\n")
    questions = []
    for line in lines:
        line = line.strip()
        if line.startswith("○"):
            question = line.lstrip("○").strip()
            questions.append(question)
    return questions

def save_questions_to_csv(questions, csv_path):
    with open(csv_path, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(["Question"])
        for question in questions:
            writer.writerow([question])

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    # Save the uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_pdf:
        contents = await file.read()
        tmp_pdf.write(contents)
        tmp_pdf_path = tmp_pdf.name

    # Process the PDF and extract questions
    text = extract_text_from_pdf(tmp_pdf_path)
    questions = extract_questions_only(text)

    # Save to temporary CSV
    tmp_csv_path = tmp_pdf_path.replace(".pdf", ".csv")
    save_questions_to_csv(questions, tmp_csv_path)

    # Clean up the PDF file
    os.remove(tmp_pdf_path)

    # Return the CSV file as response
    return FileResponse(tmp_csv_path, filename="extracted_questions.csv", media_type='text/csv')