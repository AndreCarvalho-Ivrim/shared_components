import { useEffect, useState } from "react";
import { filesize } from "filesize";
import moment from "moment";
import { GalleryItemType, User } from "../../../shared-types";
import { Modal } from "../../utils/Modal";
import { getGalleryItems } from "../../services/gallery";
import { useNotify } from "../../../contexts/NotifyContext";

interface ModalGalleryProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  external_id: string,
  onSelectFiles: (selecteds: GalleryItemType[]) => void,
  user?: User | undefined
}

export const GalleryModal = ({ isOpen, setIsOpen, external_id, onSelectFiles, user }: ModalGalleryProps) => {
  const [galleries, setGalleries] = useState<GalleryItemType[]>([]);
  const { toast } = useNotify();
  const [selectedFiles, setSelectedFiles] = useState<GalleryItemType[]>([]);

  useEffect(() => {
    if (!user) throw new Error("Usuário não encontrado!")
    if (isOpen) {
      setSelectedFiles([]);
      getGalleryItems(user.token, external_id, true).then(response => {
        setGalleries(response.result && response.data?.items ? response.data.items : [])
      }).catch(() => setGalleries([]));
    }
  }, [isOpen, user?.token]);

  async function handleSubmit() {
    if (selectedFiles.length === 0) {
      toast.error("Selecione pelo menos um arquivo")
      return
    }

    onSelectFiles(selectedFiles)
    setIsOpen(false)
  };

  function handleSelectFile(selectedFile: GalleryItemType) {
    if (!selectedFile) return;

    setSelectedFiles(prevState => prevState.some((state) => state.id === selectedFile.id) ? prevState.filter(
      (state) => state.id !== selectedFile.id
    ) : [...prevState, selectedFile]);
  }
  return (
    <Modal
      zIndex="z-50"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      options={{
        title: "Selecione os arquivos da galeria",
        size: 'sm:w-full sm:max-w-3xl',
        cancelButton: true,
        cancelButtonText: "Cancelar",
        actionButton: selectedFiles.length > 0 ? {
          theme: "primary",
          text: `Adicionar ${selectedFiles.length} arquivo(s)`,
          onClick: handleSubmit,
          autoClose: false,
        } : undefined,
      }}
    >
      <div className="my-6">
        <div className="overflow-x-auto sm:min-h-[40vh] max-h-[calc(100vh-15rem)] flex flex-col">
          {galleries.length === 0 ? (
            <p className="text-center p-9 my-auto text-gray-500 text-sm">Você não possui nenhum item na galeria</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-[10px] text-gray-500 uppercase bg-gray-100/50 border-y border-gray-100">
                <tr>
                  <th className="px-3 py-1 font-bold max-w-[14rem]">Nome</th>
                  <th className="px-3 py-1 font-bold">Tamanho</th>
                  <th className="px-3 py-1 font-bold">Criado em</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {galleries.map(gallery => (
                  <tr
                    className={`cursor-pointer hover:bg-gray-200/60 border-b border-gray-100 ${selectedFiles.some((state) => state.id === gallery.id) ? 'bg-gray-200/80' : ''}`}
                    key={`item-${gallery.id}`}
                    onClick={() => handleSelectFile(gallery)}
                  >
                    <td className="px-3 py-3 max-w-[12rem] truncate">{gallery.name}</td>
                    <td className="px-3 py-3">{filesize(gallery.size) as string}</td>
                    <td className="px-3 py-3">{moment(gallery.created_at).format('DD/MM/YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Modal>
  )
}
