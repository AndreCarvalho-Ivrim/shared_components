export interface User{
  id: string;
  email: string,
  picture: string,
  active?: boolean,
  name: string,
  clients?: Client[],
  permitions?: Permition[],
  permitions_slug?: PossiblePermissions[],
  flow_permission?: string,
  flow_actions_permitted?: string[],
  client_name?: string,
  token: string,
  current_client: string,
  userCategories?: UserCategory[],
  userCategory?: UserCategory
}
export interface Client{
  id: string,
  cnpj: string,
  razao_social: string,
  nome_fantasia: string,
  picture: string,

  cep: string,
  logradouro: string,
  numero: string,
  bairro: string,
  cidade: string,
  estado: string,
  
  ddd: string,
  telefone: string,
  email: string,

  users?: User[],

  active?: boolean
}
export interface UserCategory{
  id: string,
  slug: string,
  name: string,
  description: string,
  clientId: string,
  permitions: Permition[] 
}
//#region PERIMTIONS
export enum PossiblePermissions {
  APPROVAL = 'aprovacao',
  ADMIN =  'admin',
  FINANCIAL_APPROVAL = 'aprovacao-financeiro',
  EXCLUSION = 'exclusao',
  EDITION = 'edicao',
  CONTAS_A_PAGAR = 'cap',
  GESTAO = 'gestao',
  PLANILHA = 'sheet',
  DASH= 'dash'
}
export interface PermissionType{
  name: string,
  actions: string[]
}
export interface Permition{
  id: string,
  name: string,
  slug?: string,
  description?: string,
}
//#endregion PERIMTIONS