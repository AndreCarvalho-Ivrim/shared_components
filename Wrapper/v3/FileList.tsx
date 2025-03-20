import { CheckedCircleIcon, DownloadAltIcon, ErrorCircleIcon, TrashIcon } from "../../utils/icons";

import { CircularProgressbar } from "react-circular-progressbar";

export interface FileListType{
  file: File | null,
  id: string,
  name: string,
  readableSize: string,
  preview: string,
  progress: number,
  uploaded: boolean,
  error: boolean,
  url?: string
}

interface FileListProps{
  files: FileListType[],
  onDelete: (id: string) => void
}
export const FileList = ({ files, onDelete }: FileListProps) => (
  <ul className="mt-1 px-2">
    {files.map(uploadedFile => (
      <li className="flex justify-between items-center text-gray-500 mt-4" key={uploadedFile.id}>
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-md bg-no-repeat border bg-gray-200 shadow-lg bg-cover mr-2.5" style={{ 
            backgroundImage: `url(${uploadedFile.preview})`,
            backgroundPosition: '50% 50%'
          }}/>
          <div className="flex flex-col">
            <strong className="truncate block text-ellipsis max-w-[14rem]">{uploadedFile.name}</strong>
            <span className="text-xs text-gray-500 mt-1.5 flex items-center">
              {uploadedFile.readableSize}{" "}
              {!!uploadedFile.url && (
                <button
                  type="button"
                  className="
                    text-red-500/80 ml-1.5 cursor-pointer
                    w-4 h-4 flex items-center justify-center
                    rounded-lg border leading-none
                    shadow-sm hover:bg-gray-200
                    text-gray-500 font-semibold
                    focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                  "
                  onClick={() => onDelete(uploadedFile.id)}
                ><TrashIcon w="16" h="16"/></button>
              )}
            </span>
          </div>
        </div>

        <div className="flex gap-1">
          {!uploadedFile.uploaded &&
            !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#225397" },
                  trail:{ stroke: "#ccc" }
                }}
                strokeWidth={10}
                value={uploadedFile.progress}
              />
            )}

          {uploadedFile.url && (
            <a
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadAltIcon className="mr-2" w={24} h={24}/>
            </a>
          )}

          {uploadedFile.uploaded && <CheckedCircleIcon w={24} h={24} color="rgba(5,150,105,.8)"/>}
          {uploadedFile.error && <ErrorCircleIcon w={24} h={24} color="rgb(249,128,128)" />}
        </div>
      </li>
    ))}
  </ul>
)