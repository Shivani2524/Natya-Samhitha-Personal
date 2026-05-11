"""
Generate a sample Natya Shastra PDF for pipeline testing.
Contains real shlokas from Chapters 1-2 of the Natya Shastra in IAST.

Usage:
    cd NatyaSamhita  (project root)
    python -m ai_core.generate_sample_pdf
"""
from fpdf import FPDF

SAMPLE_SHLOKAS = [
    {
        "chapter": "Chapter 1 - Natyotpatti (Origin of Drama)",
        "verses": [
            "natyasastram pravaksyami brahmana yadudahrtam\nkramaso yathayogam ca tattvarthavistaratatah",
            "purvam krtayuge raja devatanam puramdharah\nsandhyam kridyam prakurvaiti yathavaditi cintayan",
            "jagraho pathyam rgvedatsaman ca yajaratah\nrasanatharvavededca tatha natyavedah krtah",
            "itihasa-samutthanam idam anyat prthak kalah\nvedopanisadam srestham natyam etanmayakrtam",
            "sarvaSAstram sarvasilpam sarvakarma sarvakriyah\nasmin natye samalokya tasmattadetadvedasamjnitam",
        ]
    },
    {
        "chapter": "Chapter 2 - Mandapavidhana (Construction of the Playhouse)",
        "verses": [
            "natyamandapaniryuktim tasya caivadhivasanam\nupasthapanasamyuktam sampravaksyami tattvatatah",
            "purvamasmaistathakrtva natyam yatprathitam bhuvi\ntatsamupasthitam caiva yatha devo mahesvarah",
            "jagatyuttaravistaram vikrstam tu tatha bhavet\nmadhyamam tu bhavennaryam tad vidvadbhirviniScitam",
            "chatvarimsat karah dirgham vimsatistathaiva tu\nvistaram tasya kartavyam mandapam dvijasattamah",
            "stambha vimsatiriksya rangam ca prathamottaram\nkuryat dvibahavistaram natyamandapasampade",
        ]
    },
    {
        "chapter": "Chapter 3 - Pujana (Worship in the Theatre)",
        "verses": [
            "purvarangavidhim krsnam pujanam ca prakirtitam\npravaksyami yathanyayam natyam arabhya sattamah",
            "prathamam jarjaram krsnam adhivasyantu devatah\ntatastu purvam rangasya pujanam parikalpayet",
            "rangadvaram ca kartavyam suklavarno 'tra niscitah\nkaryah samyagatah sthanam purvarangah svayambhuvah",
            "nandi pratimukhenaiva sthapanottara eva ca\ndvau catvarimsat angani purvarangasya nirdiset",
        ]
    },
    {
        "chapter": "Chapter 4 - Tandava Laksana (Description of the Tandava Dance)",
        "verses": [
            "nrttam tandavalaksanam ca karananam vistarasah\npravaksyami yathanyayam varnayisye svarupatatah",
            "sasthottarasatam jneyam karananam prayogatah\nangavislesanamjneyam nrttakarmavidhau budhah",
            "talapustapakam caiva tathaivavartitam punah\nrecitam svastikam caiva tathaiva mandalam param",
            "angaharastathaivatra caturvimsatisankhyakah\npinditaistairvidhanaistesam angaharasampade",
            "samanakham tatha hasta udvestita tathaiva ca\nalolam svastikaScaiva nrttahastavidhikrame",
        ]
    },
]


def generate_pdf(output_path: str):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)

    # Title page
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 24)
    pdf.cell(0, 40, "Natya Shastra", new_x="LMARGIN", new_y="NEXT", align="C")
    pdf.set_font("Helvetica", "I", 14)
    pdf.cell(0, 10, "Bharata Muni", new_x="LMARGIN", new_y="NEXT", align="C")
    pdf.cell(0, 10, "Sample Chapters 1-4 (IAST Transliteration)", new_x="LMARGIN", new_y="NEXT", align="C")
    pdf.ln(20)
    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(0, 6, (
        "This is a sample document containing selected verses from the first four chapters "
        "of the Natya Shastra in IAST transliteration. This sample is intended for testing "
        "the Natya Samhitha RAG pipeline and is not a complete academic edition."
    ))

    # Content pages
    for chapter_data in SAMPLE_SHLOKAS:
        pdf.add_page()
        pdf.set_font("Helvetica", "B", 16)
        pdf.cell(0, 12, str(chapter_data["chapter"]), new_x="LMARGIN", new_y="NEXT")
        pdf.ln(5)

        for i, verse in enumerate(chapter_data["verses"], 1):
            pdf.set_font("Helvetica", "B", 10)
            pdf.cell(0, 8, f"Verse {i}", new_x="LMARGIN", new_y="NEXT")
            pdf.set_font("Helvetica", "", 11)
            pdf.multi_cell(0, 6, verse)
            pdf.ln(6)

    pdf.output(output_path)
    print(f"Generated sample PDF: {output_path}")


if __name__ == "__main__":
    generate_pdf("backend/data/sample_natyashastra.pdf")
