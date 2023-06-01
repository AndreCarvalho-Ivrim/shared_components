import { ReactNode, useEffect, useState } from 'react';

import { HeaderBreadcrumbs, Wrapper as WrapperV3 } from './v3/Wrapper';
import { AsideItems } from './v3/Aside';
import { useAuth } from '../../contexts/AuthContext';
import { DetalistIcon, MoneyIcon, ProjectIcon, UsersIcon, WorkflowIcon } from '../utils/icons';
import { applicationRedirection } from '../MenuSlider';
import { AvailableWorkflowThemeType, PossiblePermissions, User, WorkflowType } from '../types';
import { getPublishedFlows } from '../services/workflow';

interface WrapperProps{
  v?: 3,
  children?: ReactNode,
  module_name?: string,
  isAdmin?: boolean,
  asideActive?: string | string[],
  breadcrumbs?: HeaderBreadcrumbs[] 
}
export function Wrapper({
  module_name,
  children,
  asideActive,
  breadcrumbs,
  isAdmin = false,
  v = 3,
} : WrapperProps){
  const { user } = useAuth();
  const [publishedFlows, setPublishedFlows] = useState<WorkflowType[]>([]);

  useEffect(() => {
    if(!user) return;  
    if(module_name === 'System Archictect') loadPublishedFlows()
  },[user]);

  async function loadPublishedFlows(){
    if(!user) return;
    
    const res = await getPublishedFlows(user.token, user.current_client);
    if(res.result && res.data) setPublishedFlows(res.data);
  }

  if(v === 3) return (
    <WrapperV3 breadcrumbs={[...[{ name: 'Home', href: '/' }], ...(breadcrumbs ?? [])]} {...{
      asideItems: getAsideItems({ user, isAdmin, module_name }),
      dynamicAsideItems: module_name === 'System Archictect' ? publishedFlows.map(flow => ({
        id: flow._id,
        href: `/modulo/${flow._id}`,
        icon: iconByTheme(flow.theme),
        name:  flow.title
      })):[],
      asideActive,
      module_name,
      children,
    }}/>
  );
  
  return <>{children}</>;
}
interface GetAsideItemsType{
  user?: User,
  isAdmin?: boolean,
  module_name?: string
}
export const getAsideItems = ({
  user, isAdmin = false, module_name
}: GetAsideItemsType) => {

  const canAccessAdminPanel = !!(
    user?.permitions_slug && user.permitions_slug.includes(PossiblePermissions.ADMIN)
  );
  const canManagement= !!(
    user?.permitions_slug && (
      user.permitions_slug.includes(PossiblePermissions.GESTAO) || 
      user.permitions_slug.includes(PossiblePermissions.PLANILHA)
    )
  );

  let asideItems : AsideItems[] = [];
  if(isAdmin) asideItems = [
    { 
      id: 'aside-item-admin-users', name: 'Admin Usuários',
      href: '/painel-adm',         disabled: !canAccessAdminPanel,
      icon: <UsersIcon w="22" h="22"/>
    },
    {
      id: 'aside-item-admin-datas', name: 'Admin Dados',
      icon: <ProjectIcon w="22" h="22"/>, disabled: !canAccessAdminPanel,
      items: [
        { 
          id: 'aside-subitem-projetos',   name: 'Projetos',
          href: '/painel-adm/projetos',disabled: !canAccessAdminPanel,
        },
        { 
          id: 'aside-subitem-gestao',     name: 'Dashboards',
          href: '/painel-adm/gestao',  disabled: !canManagement,
        },
      ]

    },
  ];
  else if(module_name === 'Co-Pilot Dashboard') asideItems = [
    { id: 'aside-item-finance', name: 'Financeiro',  href: '/co-pilot-dashboard/financeiro'  },
    { id: 'aside-item-finance', name: 'Comercial',   href: '/co-pilot-dashboard/comercial'   },
    { id: 'aside-item-finance', name: 'Operacional', href: '/co-pilot-dashboard/operacional' }
  ];
  else if(module_name === 'Configurações') asideItems = applicationRedirection(user);
  else if(module_name === 'System Archictect') asideItems = [
    { id: 'aside-item-workflows', href: '/', icon: <WorkflowIcon w={22} h={22}/>, name: 'Workflows' },
    { id: 'aside-item-template',  href: '/modelos', icon: <DetalistIcon w={22} h={22}/>, name: 'Modelos'}
  ];
  else asideItems = [
    { id: 'aside-item-compras-e-contas-a-pagar',              name: 'Contas a Pagar',
      items: [
        {
          id: 'aside-subitem-compras-e-contas-a-pagar',
          name: 'Contas a Pagar',
          href: '/compras-e-contas-a-pagar',
          disabled: !user?.permitions_slug?.includes(PossiblePermissions.CONTAS_A_PAGAR),
        },{
          id: 'aside-subitem-alertas',
          name: 'Alertas',
          href: '/alertas'
        },{
          id: 'aside-subitem-modelos-de-documentos',
          name: 'Modelos de Documentos',
          href: '/modelos-de-documentos'
        }
      ]
    },
  ];

  return asideItems
}
export const iconByTheme = (theme: AvailableWorkflowThemeType) => {
  switch(theme){
    case 'Cobrança':  return <MoneyIcon w={22} h={22}/>;
    case 'Comercial': return <WorkflowIcon w={22} h={22}/>;
  }
}