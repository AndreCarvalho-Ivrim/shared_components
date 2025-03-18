import React, { useEffect, useState } from "react";
import { Textarea, Spinner } from "flowbite-react";
import { useNotify } from "../../../contexts/NotifyContext";
import Dropzone from "react-dropzone";
import { uniqueId } from "lodash";
import { filesize } from "filesize";
import { portal, wf, headerBearer, handleErrorResultAndResponse } from "../../services/conn/api";
import { useAuth } from "../../../contexts/AuthContext";
import { FileList } from "./FileList";
import { User, WorkflowConfigFilterRefType, WorkflowConfigFilterType } from "../../../shared-types";
import { Modal } from "../../utils/Modal";
import { CreatePublicPostDataBody, requestPublicPost } from "../../../services/publicRoutes";
import { Dropdown } from "../../utils/Dropdown";
import { TableFooter } from "../../TableFooter";
import { ArrowRightIcon, EnvelopeIcon, EnvelopeOpenIcon, DropboxIcon, ArchiveIcon } from "../../utils/icons";
import moment from "moment";

interface FileListType{
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

interface FlowDataRequestFilter{
  view_mode?: string,
  excludeIds: string[],
  dynamicOrderBy?: Record<string, 'asc' | 'desc'>
  include?: { key: string, value: string },
  query?:   {
    ref: WorkflowConfigFilterRefType | WorkflowConfigFilterRefType[],
    value: any,
    type: WorkflowConfigFilterType['type']
  }[],
  pagination?: any
}

type CallStatusType = 'open' | 'in_progress' | 'finished'

export const ButtonHelp = () => {
  const [files, setFiles] = useState<FileListType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'inital' | 'create' | 'list'>('inital');

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<{ status: CallStatusType }>({ status: 'open' });
  const [totalPartial, setTotalPartial] = useState<Record<string, number>>({})
  const [total, setTotal] = useState<Record<CallStatusType, number | undefined>>({
    open: undefined,
    in_progress: undefined,
    finished: undefined
  });

  const [showingCalled, setShowingCalled] = useState<any[]>([]);
  const [openCalls, setOpenCalls] = useState<any[]>([]);
  const [callsInProgress, setCallsInProgress] = useState<any[]>([]);
  const [completedCalls, setCompletedCalls] = useState<any[]>([]);

  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 10;

  const { toast } = useNotify();
  const { user } = useAuth();

  useEffect(() => { onLoad() },[user])
  useEffect(() => {
    setShowingCalled(handleFilter())
  },[openCalls, callsInProgress, completedCalls, filter]);

  async function onLoad(){
    if(!user || isLoading) return;

    let targetNotifications : FlowData[] = filter.status === 'open' ? openCalls :
      filter.status === 'in_progress' ? callsInProgress :
      filter.status === 'finished' ? completedCalls : []
    const dispatcher = filter.status === 'open' ? setOpenCalls :
      filter.status === 'in_progress' ? setCallsInProgress :
      filter.status === 'finished' ? setCompletedCalls : undefined

    setIsLoading(true);
    await (async () => {
      const filters: FlowDataRequestFilter = {
        excludeIds: targetNotifications.map((n: any) => n._id),
        query: [
          { ref: '@user.email', type: 'list', value: user.email}
        ]
      };

      if (filter.status === 'open') {
        filters.query?.push({ ref: '@step_id', type: 'select', value: ['67cb372297f9c94d7e7e73be'] });
      } else if (filter.status === 'in_progress') {
        filters.query?.push({ ref: '@step_id', type: 'select', value: ['67cb372297f9c94d7e7e73be'] })
      } else if (filter.status === 'finished') {
        filters.query?.push({ ref: '@step_id', type: 'select', value: ['67cee063f760d12bf7379d12'] })
      }

      const res: any = await wf.post(`/flow-data/get/${'67cb372297f9c94d7e7e73bd'}`, filters, { ...(headerBearer(user!.token)) });
      console.log('RES', res);
      
      if(!res.result){
        toast.error(res.response)
        return;
      }

      if(!res.data) return;
      const { data } = res;
      console.log('dispatcher', dispatcher);
      if(dispatcher){
        const ids = data.datas.map((d: any) => d._id)
        dispatcher((prevState) => [
          ...prevState.filter(state => !ids.includes(state._id)),
          ...res.data!.datas
        ])
      }
      if(res.data.total > -1){
        setTotalPartial((prevState) => ({
          ...prevState,
          [`${filter.status}`]: res.data!.total
        }))
      }
    })()
    setIsLoading(false)
  }

  function handleFilter() : any[] {
    let targetNotifications : FlowData[] = filter.status === 'open' ? openCalls :
      filter.status === 'in_progress' ? callsInProgress :
      filter.status === 'finished' ? completedCalls : []

    if(targetNotifications.length < perPage){
      if(total[filter.status] === undefined || total[filter.status]! >= perPage){
        console.log('[handle-filter:on-load-called]')
        onLoad()
      }
    }
    console.log('targetNotifications', targetNotifications);
    
    return targetNotifications;
  }

  async function handleSubmit() {
    let el = document.getElementById('modal-help-textarea') as HTMLTextAreaElement;
    let body: CreatePublicPostDataBody = {
      data: {
        attachments: files.map((f) => ({
          url: f.url,
          id: f.id,
          name: f.name
        })),
        created_call_url: window.location.href
      }
    }
    if (el?.value) {
      body.data['description'] = el.value;
    }

    try {
      await requestPublicPost({
        flow_id: '67cb372297f9c94d7e7e73bd',
        variation: 'registration',
        fields: body
      });
      toast.success("Chamado enviado com sucesso");
      setIsOpen(false);
    } catch (e) {
      toast.error("Não foi possível enviar o chamado");
    }

    
    setIsOpen(false);
  }

  const renderContent = () => {
    switch (viewMode) {
      case 'create':
        return <CreateCallFormContent
          files={files}
          setFiles={setFiles}
          toast={toast}
          user={user}
        />;
      case 'list':
        return <ListCallsContent
          isLoading={isLoading}
          filter={filter}
          setFilter={setFilter}
          showingNotifications={showingCalled}
          pageIndex={pageIndex}
          perPage={perPage}
          total={total}
          totalPages={totalPages}
        />;
      default:
        return (
          <div className="flex justify-center items-center">
            <div className="flex gap-6 flex-wrap justify-center">
              <button
                onClick={() => setViewMode('create')}
                className={`
                  focus:ring-2 focus:ring-gray-300
                  flex flex-col w-64 text-left
                  border border-gray-300 rounded-2xl p-4
                  bg-white hover:bg-gray-100 shadow-sm transition-all duration-200
                `}
              >
                <strong className="text-base text-gray-800 mb-1">Criar Chamado</strong>
                <span className="text-sm text-gray-600 leading-snug">
                  Utilize esta opção para abrir um<br />
                  novo chamado para reportar uma solicitação ou problema.
                </span>
              </button>
          
              <button
                onClick={() => setViewMode('list')}
                className={`
                  focus:ring-2 focus:ring-gray-300
                  flex flex-col w-64 text-left
                  border border-gray-300 rounded-2xl p-4
                  bg-white hover:bg-gray-100 shadow-sm transition-all duration-200
                `}
              >
                <strong className="text-base text-gray-800 mb-1">Listar Chamados</strong>
                <span className="text-sm text-gray-600 leading-snug">
                  Visualize todos os chamados
                  criados, acompanhe o status e acesse os detalhes de cada solicitação.
                </span>
              </button>
            </div>
          </div>        
        );
    }
  };
  
  return (
    <>
      <button
        type="button"
        className={`
          bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white hover:bg-gradient-to-br
          w-12 h-12 flex items-center justify-center rounded-full
          self-end font-semibold text-xl
        `}
        onClick={() => setIsOpen(true)}
      >?</button>

      <Modal
        zIndex="z-50"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={{
          title: viewMode === 'inital' ? 'Selecione uma opção' : viewMode === 'create' ? 'Criar Chamado' : 'Listar Chamados',
          size: 'sm:w-full sm:max-w-3xl',
          cancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonFn() {
            if (viewMode === 'create' || viewMode === 'list') setViewMode('inital');
            else setIsOpen(false);
          },
          actionButton: viewMode === 'create' ? {
            theme: "primary",
            text: 'Criar Chamado',
            onClick: handleSubmit,
            autoClose: false,
          } : undefined
        }}
      >
        {renderContent()}
      </Modal>
    </>
  );
}

const CreateCallFormContent = ({
  files,
  setFiles,
  user,
  toast,
}: {
  files: FileListType[],
  setFiles: React.Dispatch<React.SetStateAction<FileListType[]>>,
  user: User | undefined,
  toast: any
}) => {    
  function handleUpload(selectedFiles: File[]) {
  
    const uploadedFiles: FileListType[] = selectedFiles.map<FileListType>(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size) as string,
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
    }));
    
    setFiles(prevState => [
      ...(prevState ?? []),
      ...uploadedFiles
    ]);
    
    uploadedFiles.forEach(processUpload);
  }

  async function processUpload(uploadedFile: FileListType) {
    if (!uploadedFile.file) return;

    const data = new FormData();

    data.append('file', uploadedFile.file, 'public-' + uploadedFile.name);
    data.append('external_id', '67cb372297f9c94d7e7e73bd');
    data.append('name', 'IAS Chamados');
    data.append('type', 'called');
    data.append('description', `public upload`);

    try {
      const { data: response } = await portal.post(`/gallery`, data, {
        ...(headerBearer(user!.token)),
        onUploadProgress: e => {
          const progress = e.total ? Math.round(
            (e.loaded * 100) / e.total
          ) : 0;

          setFiles((prevState) => prevState?.map((file) => file.id === uploadedFile.id ? {
            ...file,
            progress
          } : file));
        }
      });

      if (!response.result) throw new Error(
        response.response
      );

      setFiles((prevState) => prevState?.map((file) => file.id === uploadedFile.id ? {
        ...file,
        uploaded: true,
        id: response.data.id,
        url: `${import.meta.env.VITE_AUTH_URL}${response.data.src}`,
      } : file));
    } catch (err) {
      const error = handleErrorResultAndResponse(err, {
        result: false,
        response: `Não foi possível fazer o upload do arquivo ${uploadedFile.name}`
      });

      toast.error(error.response);

      setFiles((prevState) => prevState?.map((file) => file.id === uploadedFile.id ? {
        ...file,
        error: true
      } : file));
    }
  }

  function handleDelete(id: string) {
    // TODO EXCLUIR NA GALERIA DE ARQUIVOS
    setFiles(prevState => prevState.filter(f => f.id !== id))
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-3">
        Criar Chamado
      </p>
  
      <label htmlFor="modal-help-textarea" className="text-sm font-medium text-gray-700 block mb-1">
        Descrição do problema
      </label>
      <Textarea
        placeholder="Digite sua mensagem"
        required={true}
        className="mb-4"
        rows={4}
        id="modal-help-textarea"
      />
  
      <p className="text-sm text-gray-600 mb-4">
        Para nos ajudar a resolver:
        <br />- descreva de forma simples e objetiva o problema encontrado
      </p>
  
      <label htmlFor="file-upload" className="text-sm font-medium text-gray-700 block mb-1">
        Anexar arquivos (opcional)
      </label>
      <Dropzone onDropAccepted={handleUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
            {...getRootProps()}
            className={`
              dropzone
              border border-dashed 
              ${isDragActive ? 'border-emerald-600' : isDragReject ? 'border-red-400' : 'border-gray-400'}
              rounded cursor-pointer
            `}
            style={{ transition: "height 0.2s ease" }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex justify-center items-center text-sm py-8 text-emerald-600/80">Solte os arquivos aqui</div>
            ) : isDragReject ? (
              <div className="flex justify-center items-center text-sm py-8 text-red-500/80">Arquivo não suportado</div>
            ) : (
              <div className="flex justify-center items-center text-sm py-8 text-gray-500/80">Arraste arquivos aqui...</div>
            )}
          </div>
        )}
      </Dropzone>
      {files.length > 0 && <FileList files={files} onDelete={handleDelete} />}
    </div>
  )
}

const ListCallsContent = ({ isLoading, filter, setFilter, showingNotifications, pageIndex, perPage, total, totalPages }: {
  isLoading: boolean,
  filter: { status: CallStatusType },
  setFilter: React.Dispatch<React.SetStateAction<{ type?: string, status: CallStatusType }>>,
  showingNotifications: any[],
  pageIndex: number,
  perPage: number,
  total: Record<CallStatusType, number | undefined>,
  totalPages: number
}) => {
  console.log('show', showingNotifications);
  const [hasSelected, setHasSelected] = useState(false);
  
  const [isFiltering, setIsFiltering] = useState(false);
  const [canPreviousPage, setCanPreviousPage] = useState(false);
  const [canNextPage, setCanNextPage] = useState(false);

  const callStatus : Record<CallStatusType, string> = {
    open: 'Em Aberto',
    in_progress: 'Em Andamento',
    finished: 'Finalizados',
  }

  return (
    <div className="mb-6">
        <div className="bg-gradient-light backdrop-blur-[25px] rounded-lg flex justify-between gap-2 mt-4 mb-4 px-4 text-primary-700 relative z-10">
          <div className="md:hidden max-sm:w-full">
            <Dropdown
              classNames={{ list: `
                absolute right-0 z-10
                -mt-1 w-56 origin-top-right rounded-md
                bg-gray-100/40 backdrop-blur-[25px] shadow-lg
                ring-1 ring-black ring-opacity-5
                focus:outline-none pb-2
              `, button: 'max-sm:w-full', wrapper: 'relative inline-block text-left group max-sm:w-full' }}
              trigger={
                <div
                  className="my-3 w-40 max-sm:w-full h-10 border border-gray-50/10 flex items-center justify-between p-4 rounded-md bg-gray-100/5 text-sm backdrop-blur-[25px] font-semibold"
                >
                  
                  {callStatus[filter.status] ?? 'Status de Notificação'}
                  <ArrowRightIcon className="rotate-90 group-data-[headlessui-state=open]:-rotate-90"/>
                </div>
              }
            >
              {Object.entries(callStatus).map(([status, name]) => (
                <button
                  className="text-gray-700 font-semibold text-sm rounded-lg backdrop-blur-[25px] w-full text-start p-2 hover:bg-gray-50/30"
                  onClick={() => setFilter((prevState) => ({
                    ...prevState,
                    status: status as CallStatusType
                  }))}
                  key={status}
                >{name}</button>
              ))}
            </Dropdown>
          </div>
          <ul className="hidden md:flex gap-4 text-sm h-16 text-primary-700">
            {Object.entries(callStatus).map(([status, name]) => (
              <li className={`group ${filter.status === status ? 'active':''}`} key={status}>
                <button
                  type="button"
                  className={`
                    relative h-full px-2 text-center font-semibold
                    
                    after:w-full after:h-1
                    after:-bottom-0.5 after:left-0
                    after:rounded-lg

                    group-[.active]:after:content['']
                    group-[.active]:after:absolute 
                    group-[.active]:after:block 
                    group-[.active]:after:bg-[#6DBFFF] group-[.active]:after:shadow-[0_1px_20px_#6DBFFF]

                    hover:after:content['']
                    hover:after:absolute 
                    hover:after:block 
                    hover:after:bg-[#6DBFFF30]
                    hover:text-primary-500/80
                  `}
                  onClick={() => setFilter((prevState) => ({
                    ...prevState,
                    status: status as CallStatusType
                  }))}
                >{name}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className={`
          h-full min-h-[calc(20rem-3rem)]
          flex flex-col justify-between
        `}>
          <div>
            <div className="overflow-x-auto rounded-lg border border-gray-300 bg-gradient-glass backdrop-blur-[25px]">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs  text-primary-800 uppercase bg-primary-500/5">
                  <tr>
                    <th className="px-3 py-2 font-bold">Chamados {callStatus[filter.status]}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {showingNotifications.slice(
                    pageIndex * perPage,
                    (pageIndex + 1) * perPage
                  ).map(notification => (
                    <tr className="hover:bg-gray-200/80 border-b last:border-none" key={notification.id}>
                      <td className="px-3 py-4 w-5">
                        <input
                          type="checkbox"
                          id={`check-row-home-table-${notification.id}`}
                          className={`check-row-home-table bg-transparent border-2`}
                          data-name={notification.title}
                          value={notification.id}
                          onClick={(e) => {
                            let hasAtLeast1Checked = document.querySelectorAll(`.check-row-home-table:checked`).length > 0;
                            let checkAll = document.getElementById(`check-row-home-table`) as HTMLInputElement;

                            if(hasAtLeast1Checked){
                              setHasSelected(true);

                              checkAll.checked = document.querySelectorAll(
                                `.check-row-home-table:not(:checked)`
                              ).length === 0;
                            }
                            else{
                              setHasSelected(false);
                              checkAll.checked = false;
                            }
                          }}
                        />
                      </td>                            

                      <td
                        className="px-3 py-4 cursor-pointer"
                        onClick={() => {}}
                      >

                        <div className="flex items-center gap-2 max-w-full">
                          <strong className="text-sm max-w-[calc(100%-2rem)] truncate">{notification.title}</strong>
                        </div>
                        <div className="flex flex-col gap-2 mt-0.5">
                          <span className="text-gray-500 text-xs font-normal">
                            {notification.description.slice(0, 80) + (notification.description.length > 80 ? '...':'')}
                          </span>
                          <span className="text-gray-400 text-xs">{moment(notification.schedule).format('DD/MM/YYYY H:mm')}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 cursor-pointer text-end">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            type="button"
                            className="
                              rounded-lg border leading-none
                              shadow-sm hover:bg-gray-200
                              text-gray-500 font-semibold
                              focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                            "
                            onClick={() => {}}
                          >
                            {notification.viewed ? (
                              <EnvelopeIcon w={20} h={20}/>
                            ):(
                              <EnvelopeOpenIcon w={20} h={20}/>
                            )}
                          </button>
                          <button
                            type="button"
                            className="
                              rounded-lg border leading-none
                              shadow-sm hover:bg-gray-200
                              text-gray-500 font-semibold
                              focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                            "
                            onClick={() => {}}
                          >
                            {notification.is_archived ? (
                              <DropboxIcon w={20} h={20}/>
                            ):(
                              <ArchiveIcon w={20} h={20}/>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {showingNotifications.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-3 py-10 text-center"
                      >
                        {isFiltering ? (
                          'Não há notificações com esse filtro'
                        ):(
                          filter.status === 'open' ? 'Todas as notificações já foram visualizadas' :
                          filter.status === 'in_progress' ? 'Não há notificações visualizadas' :
                          filter.status === 'finished' ? 'Não há notificações arquivadas':'...'
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <TableFooter
            perPage={perPage}
            pageIndex={pageIndex}
            totalPages={isFiltering ? Math.ceil(showingNotifications.length / perPage) : totalPages}
            total={isFiltering ? showingNotifications.length : total[filter.status] ?? 0}

            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}

            goToPage={() => {}}
            previousPage={() => {}}
            nextPage={() => {}}

            isFiltering={isFiltering}
          />
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-gray-50/75">
              <Spinner
                aria-label="Carregando"
              />
            </div>
          )}
        </div>
      </div>
  )
}