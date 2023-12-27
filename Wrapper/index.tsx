import { ReactNode, useEffect, useState } from "react";

import { HeaderBreadcrumbs, Wrapper as WrapperV3 } from "./v3/Wrapper";
import { AsideItems } from "./v3/Aside";
import { useAuth } from "../../contexts/AuthContext";
import {
  MoneyIcon,
  ProjectIcon,
  UploadIcon,
  UsersIcon,
  FileIcon,
  ConnectionIcon,
  CompanyIcon,
  SquareCheckedIcon,
  UserIcon,
  MyDocsIcon,
  NotificationIcon,
  LockIcon,
  DashboardImageIcon,
  IsacImageIcon,
  ReportImageIcon,
  VisionImageIcon,
  CobrançaIcon,
  GameIcon,
  CartIcon,
  IconProps,
  FlowIcon,
  TableIcon,
  PieChartIcon,
  CompassIcon,
  MyFinanceIcon,
  GameIconNew,
  CartIconNew,
} from "../utils/icons";

import {
  AvailableWorkflowThemeType,
  DashboardType,
  PossiblePermissions,
  User,
  WorkflowType,
} from "../../types";

import { getPublishedFlows } from "../services/workflow";
import { FooterAsideProps } from "./v3/Aside/FooterAside";
import { handleRegexUrl } from "../../shared-types/utils/routes";
import { getDashboards } from "../services/dashboard";

export interface WrapperProps {
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
  const [dashboards, setDashboards] = useState<DashboardType[]>([]);

  useEffect(() => {
    if (!user) return;
    if (module_name && [
      "Co-Pilot Dashboard", "System Architect", "Report"
    ].includes(module_name)){

      loadPublishedFlows();
      loadDashboards();
    }
  }, [user]);

  async function loadPublishedFlows() {
    if (!user) return;

    const res = await getPublishedFlows(user.token);
    if (res.result && res.data) setPublishedFlows(res.data);
  }

  async function loadDashboards(){
    if(!user) return;
  
    const res = await getDashboards(user.token, true);
    
    if(!res.result) return;
    if(!res.data) return;

    setDashboards(res.data);
  }

  if (v === 3)
    return (
      <WrapperV3
        breadcrumbs={[...[{ name: "Home", href: "/" }], ...(breadcrumbs ?? [])]}
        {...{
          asideItems: [
            ...getAsideItems({
              user,
              isAdmin,
              module_name,
              dashboards,
              publishedFlows
            }),
            ...(asideItems ? asideItems : []),
          ],
          dynamicAsideItems: [],
          // [ ] OS FLUXOS PUBLICADOS FORAM MOVIDOS PARA DENTRO DO ITEM ISAC
          // module_name === "System Architect" ? publishedFlows.map((flow) => ({
          //   id: flow._id,
          //   href: handleRegexUrl(`@isac:workflow.exec(${flow._id})` as any, user?.token),
          //   icon: iconByTheme(flow.theme),
          //   name: flow.title,
          // })) : [],
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
  dashboards?: DashboardType[];
  publishedFlows?: WorkflowType[]
}
export const getAsideItems = ({
  user,
  isAdmin = false,
  module_name,
  dashboards,
  publishedFlows
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
        href: handleRegexUrl('@hub:profile.home', user?.token),
        icon: <UserIcon w={22} h={22} />,
      },
      {
        id: "aside-item-gallery",
        name: "Meus Docs.",
        href: handleRegexUrl('@hub:gallery.home', user?.token),
        icon: <MyDocsIcon w={22} h={22} />,
      },
      {
        id: "aside-item-gallery",
        name: "Fechamentos Finan.",
        href: handleRegexUrl('@hub:closing_folder.home', user?.token),
        icon: <MyFinanceIcon w={22} h={22} />,
      },
      {
        id: 'aside-item-notification',
        name: 'Notificações',
        icon: <NotificationIcon w={22} h={22} />,
        items: [
          {
            id: 'aside-subitem-all-notifications',
            name: 'Todas',
            href: handleRegexUrl('@hub:notification.all', user?.token)
          },{
            id: 'aside-subitem-preferences',
            name: 'Preferências',
            href: handleRegexUrl('@hub:notification.preference', user?.token)
          }, ...((
            user?.permitions_slug?.includes(PossiblePermissions.ADMIN_HUB) ||
            user?.permitions_slug?.includes(PossiblePermissions.MANAGE_NOTIFICATION)
          ) ? [{
            id: 'aside-subitem-create-notifications',
            name: 'Criar Notificações',
            href: handleRegexUrl('@hub:notification.create', user.token)
          }]:[])
        ]
      }
    ];
    
    if(user && user.permitions_slug){
      if(user.permitions_slug.includes(PossiblePermissions.ADMIN)) defaultAsideItems.push(...[
        {
          id: "aside-item-admin-users",
          name: "Admin Empresa",
          href: handleRegexUrl('@hub:admin_panel.client', user.token),
          disabled: !canAccessAdminPanel,
          icon: <CompanyIcon w="22" h="22" />,
        },
        {
          id: "aside-item-admin-users",
          name: "Admin Usuários",
          href: handleRegexUrl('@hub:admin_panel.users', user.token),
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
              href: handleRegexUrl('@hub:admin_panel.projects', user.token),
              disabled: !canAccessAdminPanel,
            },
            {
              id: "aside-subitem-dashboards",
              name: "Dashboards",
              href: handleRegexUrl('@hub:admin_panel.dashboards', user.token),
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
              href: handleRegexUrl('@hub:admin_panel.integrations.whatsapp', user.token),
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
  }else
  if(module_name){
    if(['Co-Pilot Dashboard', 'System Architect', 'Report'].includes(module_name)) defaultAsideItems = [
      {
        id: 'aside-item-isac',
        name: 'ISAC',
        icon: <FlowIcon w={22} h={22}/>,
        disabled: !user?.permitions_slug?.includes(
          PossiblePermissions.ISAC
        ),
        items: [...(user?.permitions_slug?.includes(
          PossiblePermissions.ISAC
        ) ? [
          {
            id: 'aside-subitem-workflows',
            name: 'Workflows',
            href: handleRegexUrl('@isac:workflow.home', user?.token),
          },{
            id: 'aside-subitem-templates',
            name: 'Modelos',
            href: handleRegexUrl('@isac:template', user?.token),
          }
        ]:[]), ...(publishedFlows ? publishedFlows.map((flow) => ({
          id: flow._id,
          href: handleRegexUrl(`@isac:workflow.exec(${flow._id})` as any, user?.token),
          icon: (
            <IconByTheme theme={flow.theme}>
              <span className="uppercase text-white font-semibold text-xl">{(flow.title ?? '').slice(0,2)}</span>
            </IconByTheme>
          ),
          name: flow.title,
        })): [])]
      },{
        id: 'vision',
        href: '#',
        name: 'Vision',
        icon: <CompassIcon w={22} h={22}/>,
        disabled: true
      },{
        id: 'report',
        href: handleRegexUrl('@isac:report.home', user?.token),
        name: 'Report',
        icon: <TableIcon w={22} h={22}/>,
        disabled: !user?.permitions_slug?.includes(PossiblePermissions.REPORT)
      },{
        id: 'aside-item-dashboard',
        name: 'Dashboard',
        icon: <PieChartIcon w={22} h={22}/>,
        disabled: !user?.permitions_slug?.includes(
          PossiblePermissions.DASH
        ),
        items: user?.permitions_slug?.includes(
          PossiblePermissions.DASH
        ) ? [
          {
            id: 'aside-subitem-dashboard-all',
            name: 'Todas',
            href: handleRegexUrl('@hub:dashboard.home', user.token),
          },
          ...(canManagement ? [
            {
            id: 'aside-subitem-dashboard-manage',
            name: 'Gerenciar',
            href: handleRegexUrl('@hub:admin_panel.dashboards', user.token)
            }
          ]:[]),
          ...(dashboards ? dashboards.map((dash) => ({
            id: `aside-subitem-dashboard-${dash.id}`,
            name: dash.title,
            href: handleRegexUrl(`@hub:dashboard.show(${dash.slug})` as any)
          })):[])
        ] : undefined,
      },
    ]
    else if (module_name === "Ivrim Flows") defaultAsideItems = [
      {
        id: "aside-item-compras-e-contas-a-pagar",
        name: "Contas a Pagar",
        items: [
          {
            id: "aside-subitem-compras-e-contas-a-pagar",
            name: "Contas a Pagar",
            href: handleRegexUrl('@hub:old_cap.home', user?.token),
            disabled: !user?.permitions_slug?.includes(
              PossiblePermissions.CONTAS_A_PAGAR
            ),
          },
          {
            id: "aside-subitem-alertas",
            name: "Alertas",
            href: handleRegexUrl('@hub:old_cap.alert', user?.token),
          },
          {
            id: "aside-subitem-modelos-de-documentos",
            name: "Modelos de Documentos",
            href: handleRegexUrl('@hub:old_cap.models', user?.token),
          },
        ],
      },
    ];
    else if (module_name === "Ivrim Conciliation") defaultAsideItems = [
      {
        id: "aside-item-contas-a-receber-gerenciamento",
        icon: <UploadIcon w={22} h={22}/>,
        name: "Gerenciamento",
        href: handleRegexUrl('@hub:reconciliation.manage', user?.token),
        disabled: !user?.permitions_slug?.includes(
          PossiblePermissions.FINANCEIRO
        ),
      },{
        id: "aside-item-contas-a-receber-conciliacao",
        icon: <FileIcon  w={22} h={22} />,
        name: "Em Conciliação",
        href: handleRegexUrl('@hub:reconciliation.home', user?.token),
        disabled: !user?.permitions_slug?.includes(
          PossiblePermissions.FINANCEIRO
        ),
      },{
        id: "aside-item-contas-a-receber-conciliados",
        icon: <SquareCheckedIcon  w={22} h={22} />,
        name: "Conciliados",
        href: handleRegexUrl('@hub:reconciliation.history', user?.token),
        disabled: !user?.permitions_slug?.includes(
          PossiblePermissions.FINANCEIRO
        ),
      }
    ];
  }

  return defaultAsideItems;
};
export const IconByTheme = ({ theme, props = {}, children } : {
  theme: AvailableWorkflowThemeType,
  children: ReactNode,
  props?: IconProps
}) => {
  switch (theme) {
    case "Cobrança":   return  <CobrançaIcon {...{ ...props, w: props.w ?? 22, h: props.h ?? 22 }}/>;
    case "Comercial":  return  <CartIconNew  {...{ ...props, w: props.w ?? 22, h: props.h ?? 22 }}/>;
    case "Financeiro": return  <CobrançaIcon {...{ ...props, w: props.w ?? 22, h: props.h ?? 22 }}/>;
    case "Gamificação": return <GameIconNew  {...{ ...props, w: props.w ?? 22, h: props.h ?? 22 }}/>;
    default: return <>{children}</>;
  }
};
