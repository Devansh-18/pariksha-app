import { extractText, getDocumentProxy } from 'unpdf'

export async function pdfParser({pdf,pdfUrl}:
    {
        pdf:FormDataEntryValue | null,
        pdfUrl:FormDataEntryValue | null,
    }){
            
    let pdfText = "";
    if (pdf) {
        // CASE 1: Uploaded file
        const file = pdf as File;
        const buffer = Buffer.from(await file.arrayBuffer());

        const bufferedPDF = await getDocumentProxy(new Uint8Array(buffer));

        // Extract text
        const { text } = await extractText(bufferedPDF, { mergePages: true })
        pdfText = text ?? "";
    }
    else if (pdfUrl) {
        // CASE 2: URL-based PDF
        const pdfURL = pdfUrl?.toString();

        const buffer = await fetch(pdfURL)
        .then(res => res.arrayBuffer())

        const bufferedPDF = await getDocumentProxy(new Uint8Array(buffer));

        // Extract text
        const { text } = await extractText(bufferedPDF, { mergePages: true })
        pdfText = text ?? "";
    }
    return pdfText;
}
