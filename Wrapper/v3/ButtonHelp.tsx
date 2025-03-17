import { Textarea } from "flowbite-react";
import { useNotify } from "../../../contexts/NotifyContext";
import { ModalOptionsType } from "../../utils/Modal";
import { CreatePublicPostDataBody, requestPublicPost } from "../../../services/publicRoutes";

export const handleHelp = (
  showMessage: (content: React.ReactNode, options: ModalOptionsType) => void,
  onCloseModal: () => void,
  toast: any
) => showMessage((
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

  </div>
), {
  title: 'Precisa de ajuda?',
  actionButton: {
    theme: 'primary',
    text: 'Enviar',
    autoClose: false,
    onClick: async () => {
      let el = document.getElementById('modal-help-textarea') as HTMLTextAreaElement;
      let body: CreatePublicPostDataBody = {
        data: {
          attachments: []
        }
      }

      if (el?.value) {
        console.log('val', el?.value);
        
        body.data['description'] = el.value;
      }

      try {
        await requestPublicPost({
          flow_id: '67cb372297f9c94d7e7e73bd',
          variation: 'registration',
          fields: body
        });
        toast.success("Chamado enviado com sucesso");
      } catch (e) {
        toast.error("Não foi possível enviar o chamado");
      }

      
      onCloseModal();
    }
  }
});

export const ButtonHelp = () => {
  const { showMessage, onCloseModal, toast } = useNotify();
  return (
    <button
      type="button"
      className={`
        bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white hover:bg-gradient-to-br
        w-12 h-12 flex items-center justify-center rounded-full
        self-end font-semibold text-xl
      `}
      onClick={() => handleHelp(showMessage, onCloseModal, toast)}
    >?</button>
  );
}