export const runtime = "nodejs";


export async function pdfParser({pdf,pdfUrl}:
    {
        pdf:FormDataEntryValue | null,
        pdfUrl:FormDataEntryValue | null,
    }){

    const { PDFParse } = require('pdf-parse');

    let pdfText = "";
    if (pdf) {
        // CASE 1: Uploaded file
        const file = pdf as File;
        const buffer = Buffer.from(await file.arrayBuffer());

        // Initialize parser with local data
        const parser = new PDFParse({ data: buffer });

        // Extract text
        const result = await parser.getText();
        pdfText = result.text ?? "";

        await parser.destroy();
    }
    else if (pdfUrl) {
        // CASE 2: URL-based PDF
        const pdfURL = pdfUrl?.toString();

        const parser = new PDFParse({ url: pdfURL });

        const result = await parser.getText();
        pdfText = result.text ?? "";

        await parser.destroy();
    }
    return pdfText;
}