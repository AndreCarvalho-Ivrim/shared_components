import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { PlusIcon } from "../../shared-components/utils/icons";

const DragDropArea = () => {
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]); // Adiciona o estado para os arquivos

    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // Adiciona os arquivos à lista existente
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Adiciona os arquivos à lista existente
    };

    return (
        <>
            <div
                className={`border-2 border-dashed border-primary-300 w-72 h-40 flex items-center justify-center mt-4 ml-80 text-sm hover:bg-gray-100 ${dragging ? 'bg-gray-100' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleButtonClick}
            >
                <div>
                    <PlusIcon className='h-6 w-6 ml-20 text-primary-500'  />
                    <p className="font-bold text-xs flex justify-center text-primary-500">Arraste e solte os arquivos aqui</p>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            <h3 className="font-bold text-primary-700 mt-8 text-center mr-28">Seus arquivos</h3>

            {files.length > 0 && (
                <div className="flex flex-col pb-4">
                    {files.map((file, index) => (
                        <div className="flex mt-8 bg-primary-500 hover:bg-primary-500/80 rounded-md text-sm p-4 items-start justify-start" key={index}>
                            <button className="pr-2">
                                <p className="font-bold text-xs flex justify-center text-white">{file.name}</p>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default DragDropArea;
