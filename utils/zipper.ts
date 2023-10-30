import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadZip = async (files: { url: string | Blob, name: string }[], zipName?: string) => {
  const zip = new JSZip();
  const zipFilename = zipName ? `${zipName}.zip` : "download.zip";

  const addFileToZip = async (url: string | Blob, filename: string) => {
    // [ ] add tratamento de erro
    // [ ] add progress control
    let blob : Blob
    if(url instanceof Blob) blob = url
    else{
      const response = await fetch(url);
      blob = await response.blob();
    }

    const sanitizedFilename = filename.replace(/[^\w\d-_.]/gi, '_');

    zip.file(sanitizedFilename, blob);
  };

  await Promise.all(
    files.map((file) => addFileToZip(file.url, file.name))
  );

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, zipFilename);
  });
};

export const generateTxtFileToDownload = (content: string) => {
  return new Blob([content], { type: 'text/plain' });
}