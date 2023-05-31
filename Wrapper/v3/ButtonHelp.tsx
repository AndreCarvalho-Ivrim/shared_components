import { Textarea } from "flowbite-react";
import { useNotify } from "../../../contexts/NotifyContext";
import { ModalOptionsType } from "../../utils/Modal";

export const handleHelp = (
  showMessage: (content: React.ReactNode, options: ModalOptionsType) => void,
  onCloseModal: () => void
) => showMessage((
  <div>
    <p className="text-sm text-gray-600 mb-3">
      Envie um email para nossa equipe de suporte que logo entraremos em contato.
    </p>
    <Textarea
      placeholder="Digite sua mensagem"
      required={true}
      className="mb-3"
      rows={4}
      id="modal-help-textarea"
    />
    <p className="text-sm text-gray-600">
      Para nos ajudar a resolver:<br/>
      - insira o link da pagina onde o problema foi identificado<br/>
      - informe o numero da PO e seu usuário<br/>
      - descreva de forma simples e objetiva o problema encontrado
    </p>
  </div>
), {
  title: 'Precisa de ajuda?',
  actionButton: {
    theme: 'primary',
    text: 'Enviar',
    autoClose: false,
    onClick: () => {
      let el = document.getElementById('modal-help-textarea') as HTMLTextAreaElement;
      let body = '';

      if(el?.value){
        body = encodeURIComponent(el.value);
        el.value = '';
      }
      
      window.location.href = `mailto:suportesistemas@ivrim.com.br?subject=${encodeURIComponent('Suporte Portal')}&body=${body}`;
      onCloseModal();
    }
  }
});

export const ButtonHelp = () => {
  const { showMessage, onCloseModal } = useNotify();
  return (
    <button
      type="button"
      className={`
        bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white hover:bg-gradient-to-br
        w-12 h-12 flex items-center justify-center rounded-full
        self-end font-semibold text-xl
      `}
      onClick={() => handleHelp(showMessage, onCloseModal)}
    >?</button>
  );
}