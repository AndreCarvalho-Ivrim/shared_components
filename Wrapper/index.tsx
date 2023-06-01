import { ReactNode, useEffect, useState } from 'react';

import { HeaderBreadcrumbs, Wrapper as WrapperV3 } from './v3/Wrapper';
import { AsideItems } from './v3/Aside';
import { useAuth } from '../../contexts/AuthContext';
import { ProjectIcon, UsersIcon } from '../utils/icons';
import { applicationRedirection } from '../MenuSlider';
import { PossiblePermissions } from '../types';

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

  const [canAccessAdminPanel, setCanAccessAdminPanel] = useState(false);
  const [canManagement, setCanManagement] = useState(false);    
  
  useEffect(() => {
    if(!user) return;

    setCanAccessAdminPanel(
      !!(user.permitions_slug && user.permitions_slug.includes(PossiblePermissions.ADMIN))
    );
    setCanManagement(
      !!user.permitions_slug?.includes(PossiblePermissions.GESTAO) || !!user.permitions_slug?.includes(PossiblePermissions.PLANILHA)
    );
  }, [user])

  if(v === 3){
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

    return (
      <WrapperV3 breadcrumbs={[...[{ name: 'Home', href: '/' }], ...(breadcrumbs ?? [])]} {...{
        asideItems,
        asideActive,
        children,
        module_name
      }}/>
    )
  }
  
  return <>{children}</>;
}