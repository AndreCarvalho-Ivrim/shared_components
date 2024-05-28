# SHARED COMPONENTS

## Dependências

  Para que os componentes compartilhados funcionem como esperado é necessário:

  - Instalar a dependência ```slick-carousel``` e ```react-slick```
  - Configurar as variáveis no **Tailwindcss**
  - Instalar a dependência ```axios```
  - Ter o env configurado com no mínimo as variáveis a seguir:
    ```env
      -- PORTAL
      REACT_APP_WORKFLOW_MODULAR   # URL DO WF FRONTEND
      REACT_APP_API_WF_URL         # URL DO WF BACKEND
      REACT_APP_BASE_URL           # URL DO PORTAL BACKEND
    ```
    ```env
      -- WORKFLOW
      VITE_PORTAL_URL              # URL DO PORTAL FRONTEND
      VITE_BASE_URL                # URL DO WF BACKEND
      VITE_AUTH_URL                # URL DO PORTAL BACKEND
    ```