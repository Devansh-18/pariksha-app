import { extractText, getDocumentProxy } from 'unpdf'

export async function pdfParser(pdfUrl:string){
            
    let pdfText = "";
    if (pdfUrl) {
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
