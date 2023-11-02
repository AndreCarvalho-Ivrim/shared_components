import { ReactNode, useEffect, useState } from "react";

import { HeaderBreadcrumbs, Wrapper as WrapperV3 } from "./v3/Wrapper";
import { AsideItems } from "./v3/Aside";
import { useAuth } from "../../contexts/AuthContext";
import {
  EnvelopeIcon,
  MoneyIcon,
  ProjectIcon,
  SettingIcon,
  UploadIcon,
  UsersIcon,
  FlowIcon,
  WorkflowIcon,
  FileIcon,
  ConnectionIcon,
  CompanyIcon,
  SquareCheckedIcon,
  UserIcon,
  MyDocsIcon,
  NotificationIcon,
  LockIcon,
} from "../utils/icons";

import {
  AvailableWorkflowThemeType,
  PossiblePermissions,
  User,
  WorkflowType,
} from "../../types";

import { getPublishedFlows } from "../services/workflow";
import { FooterAsideProps } from "./v3/Aside/FooterAside";
import { handleRegexUrl, hubRoutes, isacRoutes } from "../../shared-types/utils/routes";

interface WrapperProps {
  v?: 3;
  children?: ReactNode;
  module_name?: string;
  isAdmin?: boolean;
  asideActive?: string | string[];
  asideItems?: AsideItems[];
  footerItems?: FooterAsideProps["footerItems"];
  breadcrumbs?: HeaderBreadcrumbs[];
  omit?: ("button-help" | "header" | "aside")[];
}
export function Wrapper({
  module_name,
  children,
  asideActive,
  asideItems,
  breadcrumbs,
  footerItems,
  isAdmin = false,
  omit = [],
  v = 3,
}: WrapperProps) {
  const { user } = useAuth();
  const [publishedFlows, setPublishedFlows] = useState<WorkflowType[]>([]);

  useEffect(() => {
    if (!user) return;
    if (module_name === "System Archictect") loadPublishedFlows();
  }, [user]);

  async function loadPublishedFlows() {
    if (!user) return;

    const res = await getPublishedFlows(user.token);
    if (res.result && res.data) setPublishedFlows(res.data);
  }

  if (v === 3)
    return (
      <WrapperV3
        breadcrumbs={[...[{ name: "Home", href: "/" }], ...(breadcrumbs ?? [])]}
        {...{
          asideItems: [
            ...getAsideItems({ user, isAdmin, module_name }),
            ...(asideItems ? asideItems : []),
          ],
          dynamicAsideItems:
            module_name === "System Archictect"
              ? publishedFlows.map((flow) => ({
                id: flow._id,
                href: `/modulo/${flow._id}`,
                icon: iconByTheme(flow.theme),
                name: flow.title,
              }))
              : [],
          footerItems,
          asideActive,
          module_name,
          children,
          omit,
        }}
      />
    );

  return <>{children}</>;
}
interface GetAsideItemsType {
  user?: User;
  isAdmin?: boolean;
  module_name?: string;
}
export const getAsideItems = ({
  user,
  isAdmin = false,
  module_name,
}: GetAsideItemsType) => {
  const canAccessAdminPanel = !!(
    user?.permitions_slug &&
    user.permitions_slug.includes(PossiblePermissions.ADMIN)
  );
  const canManagement = !!(
    user?.permitions_slug &&
    user.permitions_slug.includes(PossiblePermissions.GESTAO)
  );
  const canAccessWhatsapp = !!(
    user?.permitions_slug &&
    user.permitions_slug.includes(PossiblePermissions.INTEGRATION_WHATSAPP)
  );

  let defaultAsideItems: AsideItems[] = [];

  if(module_name === "Configurações" || isAdmin){
    defaultAsideItems = [
      {
        id: "aside-item-perfil",
        name: "Perfil",
        href: hubRoutes.profile.home(),
        icon: <UserIcon w={22} h={22} />,
      },
      {
        id: "aside-item-gallery",
        name: "Meus Docs.",
        href: hubRoutes.gallery.home(),
        icon: <MyDocsIcon w={22} h={22} />,
      },
      {
        id: 'aside-item-notification',
        name: 'Notificações',
        icon: <NotificationIcon w={22} h={22} />,
        items: [
          {
            id: 'aside-subitem-all-notifications',
            name: 'Todas',
            href: hubRoutes.notification.all()
          },{
            id: 'aside-subitem-preferences',
            name: 'Preferências',
            href: hubRoutes.notification.preference()
          }, ...((
            user?.permitions_slug?.includes(PossiblePermissions.ADMIN_HUB) ||
            user?.permitions_slug?.includes(PossiblePermissions.MANAGE_NOTIFICATION)
          ) ? [{
            id: 'aside-subitem-create-notifications',
            name: 'Criar Notificações',
            href: hubRoutes.notification.create()
          }]:[])
        ]
      }
    ];
    
    if(user && user.permitions_slug){
      if(user.permitions_slug.includes(PossiblePermissions.ADMIN)) defaultAsideItems.push(...[
        {
          id: "aside-item-admin-users",
          name: "Admin Empresa",
          href: hubRoutes.admin_panel.client(),
          disabled: !canAccessAdminPanel,
          icon: <CompanyIcon w="22" h="22" />,
        },
        {
          id: "aside-item-admin-users",
          name: "Admin Usuários",
          href: hubRoutes.admin_panel.users(),
          disabled: !canAccessAdminPanel,
          icon: <UsersIcon w="22" h="22" />,
        },
        {
          id: "aside-item-admin-datas",
          name: "Admin Dados",
          icon: <ProjectIcon w="22" h="22" />,
          disabled: !canAccessAdminPanel,
          items: [
            {
              id: "aside-subitem-projetos",
              name: "Projetos",
              href: hubRoutes.admin_panel.projects(),
              disabled: !canAccessAdminPanel,
            },
            {
              id: "aside-subitem-dashboards",
              name: "Dashboards",
              href: hubRoutes.admin_panel.dashboards(),
              disabled: !canManagement,
            },
          ],
        },
        {
          id: "aside-item-admin-integracoes",
          name: "Admin Integrações",
          icon: <ConnectionIcon w="18" h="18" />,
          disabled: !canAccessAdminPanel,
          items: [
            {
              id: "aside-subitem-whatsapp",
              name: "Whatsapp",
              href: "/painel-adm/integracao-whatsapp",
              disabled: !canAccessWhatsapp,
            },
          ],
        },
      ]);
      if(user.permitions_slug.includes(PossiblePermissions.ADMIN_HUB)) defaultAsideItems.push({
        id: 'aside-admin-hub',
        name: 'Admin Hub',
        icon: <LockIcon w="22" h="22"/>,
        items: [
          {
            id: 'aside-subitem-admin-hub-wf',
            name: 'Workflows',
            href: handleRegexUrl('@isac:admin_hub.workflows', user.token)
          }
        ]  
      })
    }
  }
  else if (module_name === "System Archictect")
    defaultAsideItems = [
      {
        id: "aside-item-workflows",
        href: isacRoutes.workflow.home(),
        icon: <FlowIcon w={22} h={22} />,
        name: "Workflows",
      },
      {
        id: "aside-item-template",
        href: "/modelos",
        icon: <EnvelopeIcon w={22} h={22} />,
        name: "Modelos",
      },
    ];
  else if (module_name === "Ivrim Flows")
    defaultAsideItems = [
      {
        id: "aside-item-compras-e-contas-a-pagar",
        name: "Contas a Pagar",
        items: [
          {
            id: "aside-subitem-compras-e-contas-a-pagar",
            name: "Contas a Pagar",
            href: "/compras-e-contas-a-pagar",
            disabled: !user?.permitions_slug?.includes(
              PossiblePermissions.CONTAS_A_PAGAR
            ),
          },
          {
            id: "aside-subitem-alertas",
            name: "Alertas",
            href: "/alertas",
          },
          {
            id: "aside-subitem-modelos-de-documentos",
            name: "Modelos de Documentos",
            href: "/modelos-de-documentos",
          },
        ],
      },
    ];
  else if (module_name === "Ivrim Conciliation")
    defaultAsideItems = [
      {
        id: "aside-item-contas-a-receber-gerenciamento",
        icon: <UploadIcon w={22} h={22}/>,
        name: "Gerenciamento",
        href: "/conciliacao/gerenciamento",
        disabled: !user?.permitions_slug?.includes(
          PossiblePermissions.FINANCEIRO
        ),
      },{
        id: "aside-item-contas-a-receber-conciliacao",
        icon: <FileIcon  w={22} h={22} />,
        name: "Em Conciliação",
        href: "/conciliacao",
        disabled: !user?.permitions_slug?.includes(
          PossiblePermissions.FINANCEIRO
        ),
      },{
        id: "aside-item-contas-a-receber-conciliados",
        icon: <SquareCheckedIcon  w={22} h={22} />,
        name: "Conciliados",
        href: "/conciliacao/conciliados",
        disabled: !user?.permitions_slug?.includes(
          PossiblePermissions.FINANCEIRO
        ),
      }
    ];

  return defaultAsideItems;
};
export const iconByTheme = (theme: AvailableWorkflowThemeType) => {
  switch (theme) {
    case "Cobrança":   return <MoneyIcon    w={22} h={22}/>;
    case "Comercial":  return <WorkflowIcon w={22} h={22}/>;
    case "Financeiro": return <MoneyIcon    w={22} h={22}/>;
  }
};
