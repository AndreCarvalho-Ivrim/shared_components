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
import { ChevronDownIcon, SupportAltIcon } from "../../utils/icons";
import moment from "moment";
import { AvailableRegexUrls, getDomain, getSupportKeys, handleRegexUrl } from "../../../shared-types/utils/routes";
import { CreatePublicPostDataBody, requestPublicGet, requestPublicPost } from "../../services/publicRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const supportKeys = getSupportKeys();
export const hardcodeSupport = {
  flow_id: supportKeys.flow_id || '67da4442d458ede945918d10',
  steps: {
    "open-request-called": supportKeys.steps["open-request-called"] || "67da4442d458ede945918d11",
    "internal-approval":   supportKeys.steps["internal-approval"]   || "67da4442d458ede945918d12",
    "in-progress":         supportKeys.steps["in-progress"]         || "67da4442d458ede945918d13",
    "internal-test":       supportKeys.steps["internal-test"]       || "67da4442d458ede945918d14",
    "approval-test":       supportKeys.steps["approval-test"]       || "67da4442d458ede945918d15",
    "called-closed":       supportKeys.steps["called-closed"]       || "67da4442d458ede945918d16"  
  }
}

export type CallStatusType = 'open' | 'in_progress' | 'finished'
export type TypeOfCallType = 'Dúvida' | 'Melhoria' | 'Problema'
export const translateCallStatus : Record<CallStatusType, string> = {
  open: 'Em Aberto',
  in_progress: 'Em Andamento',
  finished: 'Finalizados',
}
export interface ChatMessage {
  message: string,
  files?: {
    url: string,
    id: string,
    name: string
  }[], 
  date: string,
  username: string,
  is_support: boolean,
  id: string,  
}
export interface CalledType{
  _id: string,
  _user_id?: string,
  status: CallStatusType,
  process_number: string,
  current_step_id: string,
  created_at: string,
  updated_at: string,
  user: { id: string, name: string, email: string },
  client: { id: string, name: string },
  description: string,
  type_of_call: TypeOfCallType,
  attachments?: { id: string, name: string, url: string }[],
  internal_review_description?: string,
  created_call_url: string,
  conversations?: ChatMessage[]
}

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

interface OptionType{
  value: string,
  label: string,
}

export const ButtonHelp = () => {
  const [files, setFiles] = useState<FileListType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'inital' | 'create' | 'list'>('inital');

  const { toast } = useNotify();
  const { user, client } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    let el = document.getElementById('modal-help-textarea') as HTMLTextAreaElement;
    let description = el?.value;
    if(!description){
      toast.error('É obrigatório preecher a descrição do chamado');
      return;
    }

    let element = document.getElementById("modal-help-select") as HTMLSelectElement;
    let type_of_call = element?.value;

    if (!type_of_call) {
      toast.error("É obrigatório selecionar uma opção em tipo de chamado");
      return;
    }

    let body: CreatePublicPostDataBody = {
      data: {
        type_of_call,
        description,
        created_call_url: window.location.href,
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email
        },
        client: {
          id: client?.id,
          name: client?.nome_fantasia
        },
        attachments: files.map((f) => ({
          url: f.url,
          id: f.id,
          name: f.name
        }))
      }
    }
    
    let successfully = false;
    try {
      const res = await requestPublicPost({
        flow_id: hardcodeSupport.flow_id,
        variation: 'registration',
        fields: body
      });

      successfully = res.result
      if(successfully){
        toast.success("Chamado enviado com sucesso");
        setFiles([]);
      }
      else toast.error(res.response);

    } catch (e) {
      toast.error("Não foi possível enviar o chamado");
    }
    
    if(successfully) setIsOpen(false);
  }
  function handleAccessCalled(_id?: string){
    let url : AvailableRegexUrls = '' as any;
    if(_id) url = `@hub:support.details(${_id})` as any;
    else url = '@hub:support.home';
    
    url = handleRegexUrl(url, user?.token) as any;
    if(url.slice(0,4) === 'http') window.location.href = url
    else navigate(url)
  }

  return (
    <>
      <button
        type="button"
        className={`
          bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white hover:bg-gradient-to-br
          w-11 h-11 flex items-center justify-center rounded-xl
          self-end font-semibold text-xl
        `}
        onClick={() => setIsOpen(true)}
      >
        <SupportAltIcon/>
      </button>

      <Modal
        zIndex="z-50"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={{
          title: viewMode === 'inital' ? 'Suporte' : viewMode === 'create' ? 'Abrir Chamado' : 'Chamados em Aberto',
          size: 'sm:w-full sm:max-w-3xl',
          cancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonFn() {
            if (viewMode === 'create' || viewMode === 'list') setViewMode('inital');
            else setIsOpen(false);
          },
          actionButton: viewMode === 'create' ? {
            theme: "primary",
            text: 'Abrir Chamado',
            onClick: handleSubmit,
            autoClose: false,
          } : viewMode === 'list' ? ({
            theme: 'primary',
            text: 'Ver Todos',
            onClick: () => handleAccessCalled()
          }):undefined
        }}
      >
        {viewMode === 'create' ? (
          <CreateCallFormContent
            files={files}
            setFiles={setFiles}
            toast={toast}
            user={user}
          />
        ): viewMode === 'list' ? (
          <ListCallsContent onAccess={handleAccessCalled}/>
        ):(
          <div className="flex justify-center items-center mt-6 mb-2">
            <div className="flex gap-6 flex-wrap justify-center">
              <button
                onClick={() => setViewMode('create')}
                className={`
                  focus:ring-2 focus:ring-gray-300
                  flex flex-col flex-1 text-left
                  border border-gray-300 rounded-2xl p-4
                  bg-white hover:bg-gray-100 shadow-sm transition-all duration-200
                `}
              >
                <strong className="text-sm text-gray-800 mb-1">Abrir Chamado</strong>
                <span className="text-xs text-gray-600 leading-snug">
                  Utilize esta opção para abrir um<br />
                  novo chamado para reportar uma solicitação ou problema.
                </span>
              </button>
          
              <button
                onClick={() => setViewMode('list')}
                className={`
                  focus:ring-2 focus:ring-gray-300
                  flex flex-col flex-1 text-left
                  border border-gray-300 rounded-2xl p-4
                  bg-white hover:bg-gray-100 shadow-sm transition-all duration-200
                `}
              >
                <strong className="text-sm text-gray-800 mb-1">Chamados em Aberto</strong>
                <span className="text-xs text-gray-600 leading-snug">
                  Visualize seus chamados em aberto, acompanhe o status e acesse os detalhes de cada solicitação.
                </span>
              </button>
            </div>
          </div>        
        )}
      </Modal>
    </>
  );
}

const CreateCallFormContent = ({
  files,
  setFiles,
  user,
  toast
}: {
  files: FileListType[],
  setFiles: React.Dispatch<React.SetStateAction<FileListType[]>>,
  user: User | undefined,
  toast: any
}) => {
  const options: OptionType[] = [
    { value: 'Dúvida', label: 'Dúvida' }, { value: 'Melhoria', label: 'Melhoria' }, { value: 'Problema', label: 'Problema' }
  ];
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
  function handleDelete(id: string) {
    setFiles(prevState => prevState.filter(f => f.id !== id))
  }
  async function processUpload(uploadedFile: FileListType) {
    if (!uploadedFile.file) return;

    const data = new FormData();

    data.append('file', uploadedFile.file, 'public-' + uploadedFile.name);
    data.append('external_id', hardcodeSupport.flow_id);
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
        url: `${getDomain('hub_back')}${response.data.src}`,
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

  return (
    <div>  
      <p className="text-xs text-gray-600 mb-4">
        Para nos ajudar a resolver:
        <br />- descreva de forma simples e objetiva o problema encontrado
        <br />- caso seja necessário adicione anexo(s) abaixo
      </p>

      <label htmlFor="modal-help-textarea" className="text-sm font-medium text-gray-700 block mb-1">
        Tipo de chamado
      </label>
      <select
        id="modal-help-select"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none mb-4 text-sm font-medium text-gray-700"
        required={true}
      >
        <option className="text-sm font-medium text-gray-700" value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} className="text-sm font-medium text-gray-700" value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="modal-help-textarea" className="text-sm font-medium text-gray-700 block mb-1">
        Descrição do problema
      </label>
      <Textarea
        placeholder="Digite sua mensagem"
        required={true}
        className="mb-4 text-sm"
        rows={4}
        id="modal-help-textarea"
      />
  
      
  
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

const ListCallsContent = ({ onAccess }:{ onAccess: (_id: string) => void }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [calleds, setCalleds] = useState<CalledType[]>([]);
  
  useEffect(() => { onLoad() },[user])

  async function onLoad(){
    if(!user || isLoading) return;

    setIsLoading(true);
    await (async () => {
      const res = await requestPublicGet({
        flow_id: hardcodeSupport.flow_id,
        variation: 'open-calls',
        params: { user_id: user.id, client_id: user.current_client }
      })
      
      if(!res.result){
        toast.error(res.response)
        return;
      }

      if(!res.data) return;
      const { data } = res;

      setCalleds(data.map((item) => ({
        ...item,
        status: hardcodeSupport.steps["open-request-called"] === item.current_step_id ? 'open': hardcodeSupport.steps['called-closed'] === item.current_step_id ? 'finished' : 'in_progress'
      })));
    })()
    setIsLoading(false)
  }

  return (
    <div className="mt-4 mb-6">
      <div className={`
        h-full min-h-[calc(20rem-3rem)]
        flex flex-col justify-between
      `}>
        {calleds.map(called => (
          <div className="
            focus:ring-2 focus:ring-gray-300      
            border border-gray-300 rounded-2xl shadow-sm transition-all duration-200
          hover:bg-gray-100 flex
          " key={called._id}>
            <div className="px-3 py-4 flex-1">
              <div className="flex items-center gap-2 max-w-full">
                <strong className="text-sm max-w-[calc(100%-2rem)] truncate flex items-center flex-wrap gap-2">
                  {called.process_number}
                  <span className={`font-semibold block text-[10px] leading-none uppercase py-0.5 px-2 rounded-lg text-gray-100 ${
                    called.status === 'open' ? 'text-gray-500 bg-gray-300' : 
                    called.status === 'in_progress' ? 'text-gray-100 bg-primary-500' :
                    called.status === 'finished' ? 'bg-green-500' : 'bg-gray-100'
                  }`}>
                    {translateCallStatus[called.status]}
                  </span>
                  <span className={`font-semibold block text-[10px] leading-none uppercase py-0.5 px-2 rounded-lg text-gray-100 ${
                    called.type_of_call === 'Melhoria' ? 'text-gray-100 bg-green-600' : 
                    called.type_of_call === 'Dúvida' ? 'text-gray-100 bg-primary-600' :
                    called.type_of_call === 'Problema' ? 'bg-red-500' : 'bg-gray-100'
                  }`}>
                    {called.type_of_call}
                  </span>
                </strong>
              </div>
              <div className="flex flex-col gap-2 mt-0.5">
                <span className="text-gray-500 text-xs font-normal">
                  {called.description.slice(0, 80) + (called.description.length > 80 ? '...':'')}
                </span>
                <span className="text-gray-400 text-xs">{moment(called.updated_at).format('DD/MM/YYYY H:mm')}</span>
              </div>
            </div>
            <div className="px-3 py-4 text-end flex items-center gap-2 justify-end">
              <button
                type="button"
                className="
                  rounded-lg border leading-none
                  shadow-sm hover:bg-gray-200
                  text-gray-500 font-semibold
                  focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                "
                onClick={() => onAccess(called._id)}
              ><ChevronDownIcon className="-rotate-90"/></button>
            </div>
          </div>
        ))}
        {calleds.length === 0 && (
          <div className="px-3 py-16 text-center bg-gray-100 rounded-2xl text-gray-500 text-sm">
            Não há nenhum chamado em aberto
          </div>
        )}  
      </div>
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-gray-50/75 flex items-center justify-center text-center">
          <Spinner
            aria-label="Carregando"
          />
        </div>
      )}
    </div>
  )
}