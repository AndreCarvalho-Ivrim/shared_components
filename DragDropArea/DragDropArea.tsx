import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import File from "../../shared-components/assets/file.svg";
import { DeleteIcon, DownloadIcon, InfoIcon } from '../../components/SvgIcons';
import JSZip from "jszip";
import 'react-circular-progressbar/dist/styles.css';


interface CustomFile {
  file: File;
  selected: boolean;
  progress: number; // Adicionado o progresso do upload
  uploaded: boolean;
}

const DragDropArea = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<CustomFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<CustomFile | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<CustomFile[]>([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    const customFiles = droppedFiles.map((file) => ({
      file,
      selected: false,
      progress: 0,
      uploaded: false,
    }));

    setFiles((prevFiles) => [...prevFiles, ...customFiles]);
    if (customFiles.length > 0) {
      setUploadModalOpen(true); // Abre o modal quando arquivos são carregados
    }

    customFiles.forEach((file) => {
      simulateFileUpload(file.file, (progress) => {
        setFiles((prevFiles) =>
          prevFiles.map((prevFile) =>
            prevFile.file === file.file ? { ...prevFile, progress } : prevFile
          )
        );
      });
    });
  };


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    const customFiles = selectedFiles.map(file => ({
      file,
      selected: false,
      progress: 0,       // Definindo o progresso inicial como 0
      uploaded: false    // Definindo o status de uploaded como false
    }));
    setFiles(prevFiles => [...prevFiles, ...customFiles]);
  };


  const handleDownloadFile = (file: CustomFile) => {
    const url = URL.createObjectURL(file.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.file.name;
    link.click();
  };

  const handleFileSelect = (file: CustomFile) => {
    const isSelected = selectedFiles.some(selectedFile => selectedFile.file === file.file);
    if (isSelected) {
      const updatedSelectedFiles = selectedFiles.filter(selectedFile => selectedFile.file !== file.file);
      setSelectedFiles(updatedSelectedFiles);
    } else {
      setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, file]);
    }
  };

  const handleCheckboxChange = (file: CustomFile, checked: boolean) => {
    const updatedFiles = files.map(item => {
      if (item.file === file.file) {
        return {
          ...item,
          selected: checked
        };
      }
      return item;
    });
    setFiles(updatedFiles);
  };

  const handleDeleteConfirmation = (file: CustomFile) => {
    setSelectedFile(file);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteFile = () => {
    if (selectedFile) {
      setFiles(prevFiles => prevFiles.filter(file => file.file !== selectedFile.file));
      setSelectedFiles(prevSelectedFiles => prevSelectedFiles.filter(file => file.file !== selectedFile.file));
      setSelectedFile(null);
      setDeleteConfirmationOpen(false);
    }
  };

  const handleInformationFile = () => {
    // Implement your logic for handling information file
  };

  const handleDownloadSelectedFiles = async () => {
    const selectedFiles = files.filter(file => file.selected);
    if (selectedFiles.length > 0) {
      const zip = new JSZip();
      selectedFiles.forEach(file => {
        zip.file(file.file.name, file.file);
      });
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = "selected-files.zip";
      link.click();
    }
  };

  const handleDeleteSelectedFiles = () => {
    if (selectedFiles.length > 0) {
      setDeleteConfirmationOpen(true);
    }
  };

  const handleConfirmDeleteSelectedFiles = () => {
    const remainingFiles = files.filter(file => !selectedFiles.includes(file));
    setFiles(remainingFiles);
    setSelectedFiles([]);
    setSelectedFile(null);
    setDeleteConfirmationOpen(false);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
  };

  const simulateFileUpload = (file: File, onProgress: (progress: number) => void) => {
    const totalSize = file.size;
    let uploadedSize = 0;

    const intervalId = setInterval(() => {
      uploadedSize += totalSize / 10;
      const progress = Math.min((uploadedSize / totalSize) * 100, 100);

      onProgress(progress);

      if (progress >= 100) {
        clearInterval(intervalId);
      }
    }, 500);
  };

  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} bytes`;
    } else if (sizeInBytes < 1024 * 1024) {
      const sizeInKB = (sizeInBytes / 1024).toFixed(2);
      return `${sizeInKB} KB`;
    } else {
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      return `${sizeInMB} MB`;
    }
  };

  return (
    <>
      <h3 className="font-bold text-primary-700 mt-8 mb-3 mr-22 text-center text-lg">Lista de arquivos</h3>

      <div className='flex flex-row justify-between mb-4'>
        <div className="mt-8">
          <button
            className="px-4 py-2 bg-primary-500 text-white rounded-lg"
            onClick={handleDownloadSelectedFiles}
            disabled={selectedFiles.length === 0}
          >
            Baixar Selecionados
          </button>
        </div>

        <div className="mt-8">
          <button
            className="px-4 py-2 bg-primary-500 text-white rounded-lg"
            onClick={handleDeleteSelectedFiles}
            disabled={selectedFiles.length === 0}
          >
            Deletar Selecionados
          </button>
        </div>
      </div>

      <div
        className={`h-full ${dragging ? 'bg-primary-300/10 border border-primary-800 border-dashed' : ''
          }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {dragging ? (
          <div className="flex justify-center items-center text-sm py-4 text-emerald-600/80">Solte os arquivos aqui</div>
        ) : (
          <div className="flex justify-center items-center text-sm py-4 text-gray-500/80">Arraste arquivos aqui...</div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {files.length > 0 && (
          <div className="flex flex-col gap-3 pb-4">
            {files.map((file, index) => (
              <div
                className={`flex mt-2 bg-slate-200 hover:bg-primary-300/90 border border-primary-300/90 gap-3 rounded-sm text-sm p-4 items-start justify-start ${file.selected ? 'bg-gray-100' : ''
                  }`}
                key={index}
                onClick={() => handleFileSelect(file)}
              >
                <div className="flex-grow">
                  <label className="pr-2 flex flex-row">
                    <input
                      type="checkbox"
                      checked={file.selected}
                      onChange={(e) => handleCheckboxChange(file, e.target.checked)}
                      className='mr-3 mt-2.5'
                    />
                    <img
                      src={File}
                      alt="icone de pasta"
                      className="p-1.5 bg-primary-900 rounded-md"
                    />
                    <p className="font-bold text-xs flex justify-center text-primary-900 p-2.5">
                      {file.file.name}
                    </p>
                  </label>
                </div>

                <div className="flex flex-row gap-3 mt-2">
                  <button
                    className="transition-transform transform-gpu hover:scale-125"
                    onClick={() => handleDownloadFile(file)}
                  >
                    <DownloadIcon />
                  </button>

                  <button
                    className="transition-transform transform-gpu hover:scale-125"
                    onClick={() => handleDeleteConfirmation(file)}
                  >
                    <DeleteIcon />
                  </button>

                  <button
                    className="transition-transform transform-gpu hover:scale-125"
                    onClick={() => handleInformationFile()}
                  >
                    <InfoIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Componente de Modal para exibir informações dos arquivos carregados */}
        {uploadModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Arquivos Carregados</h2>
              <ul>
                {files.map((file, index) => (
                  <li key={index} className="mb-8">
                    <div className='flex flex-col'>
                      <div className='flex justify-between'>
                        <strong className='pt-2 text-sm'>{file.file.name}</strong>
                        <div className="flex items-center mt-1" style={{ width: '35px', height: '35px' }}>
                          <CircularProgressbar
                            value={file.progress}
                            text={`${file.progress.toFixed(1)}%`}
                            styles={buildStyles({
                              rotation: 0.25,
                              strokeLinecap: 'butt',
                              textSize: '18px',
                              pathTransitionDuration: 0.5,
                              pathColor: `#007bff`,
                              textColor: '#007bff',
                              trailColor: '#d6d6d6',
                              backgroundColor: '#3e98c7',
                            })}
                          />
                        </div>
                      </div>

                      <span className="text-primary-200 text-xs -mt-1">{formatFileSize(file.file.size)}</span>
                    </div>

                    {file.selected && (
                      <button
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg ml-4"
                        onClick={() => handleDownloadFile(file)}
                      >
                        Baixar
                      </button>
                    )}

                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-6">
                <button className="px-2 py-2 bg-primary-500 text-white text-sm rounded-lg" onClick={handleCloseUploadModal}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Componente de Modal para confirmação de exclusão */}
        {selectedFile && deleteConfirmationOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-80 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirmação de exclusão</h2>
              <p className="mb-4">Deseja realmente excluir o arquivo "{selectedFile.file.name}"?</p>
              <div className="flex justify-end">
                <button className="mr-2 px-4 py-2 bg-gray-200 rounded-lg" onClick={() => setDeleteConfirmationOpen(false)}>
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleDeleteFile}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Componente de Modal para confirmação de exclusão de mais de um arquivo */}
        {selectedFiles.length > 1 && deleteConfirmationOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-80 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirmação de exclusão</h2>
              <p className="mb-4">Deseja realmente excluir os arquivos selecionados?</p>
              <ul className='pb-4'>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.file.name}</li>
                ))}
              </ul>
              <div className="flex justify-end">
                <button className="mr-2 px-4 py-2 bg-gray-200 rounded-lg" onClick={() => setDeleteConfirmationOpen(false)}>
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={() => {
                    handleConfirmDeleteSelectedFiles();
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DragDropArea;
