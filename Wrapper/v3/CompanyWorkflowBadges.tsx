import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useNotify } from "../../../contexts/NotifyContext";
import { requestFnException } from "../../../services/fnException";
import { handleHubUrl } from "../../../services/utils";
import { isacRoutes } from "../../../shared-types/utils/routes";
import { Client } from "../../../types";
import logo from '../../assets/default-client.jpg';
import axios from "axios";

const MAX_VISIBLE = 4;

const CompanyAvatar = ({ picture, name }: { picture?: string; name: string }) => (
  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white font-semibold text-sm text-gray-700 uppercase shrink-0">
    <img
      src={handleHubUrl(picture)}
      alt={name}
      className="object-cover min-w-[100%] w-full h-full rounded-md"
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        if (img.src !== logo) img.src = logo;
      }}
    />
  </div>
);

const CountBadge = ({ count, loading }: { count: number; loading: boolean }) => {
  if (loading) return (
    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
  );
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1 -right-1 bg-primary-800 text-white text-[9px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center px-0.5">
      {count > 99 ? '99+' : count}
    </span>
  );
};

const BadgeButton = ({
  client,
  count,
  loadingCounts,
  isActive,
  onClick,
}: {
  client: Client;
  count: number;
  loadingCounts: boolean;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    title={client.nome_fantasia}
    disabled={isActive}
    onClick={onClick}
    className={`relative focus:outline-none disabled:cursor-default ${isActive ? 'ring-2 ring-primary-500 ring-offset-1 rounded-full' : ''}`}
  >
    <CompanyAvatar picture={client.picture} name={client.nome_fantasia} />
    <CountBadge count={count} loading={loadingCounts} />
  </button>
);

export const CompanyWorkflowBadges = () => {
  const { user, changeClient } = useAuth();
  const { toast } = useNotify();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loadingCounts, setLoadingCounts] = useState(false);
  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  const [flowIds, setFlowIds] = useState<Record<string, string>>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; right: number } | null>(null);

  useEffect(() => {
    setOrderedIds([]);
    setCounts({});
    setFlowIds({});
    if (!user?.clients?.length) return;
    loadCounts();
  }, [user?.current_client]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  async function loadCounts() {
    if (!user?.clients?.length) return;
    setLoadingCounts(true);

    const mainServerClients = user.clients.filter(
      c => !c.dedicated_server || c.dedicated_server.includes('isac.ivrim.com.br')
    );

    const dedicatedServerClients = new Map<string, typeof user.clients>();
    user.clients
      .filter(c => c.dedicated_server && !c.dedicated_server.includes('isac.ivrim.com.br'))
      .forEach(c => {
        const backend_url = c.dedicated_server!.replace('ivrim.com.br', 'ivrim.tech');
        if (!dedicatedServerClients.has(backend_url)) dedicatedServerClients.set(backend_url, []);
        dedicatedServerClients.get(backend_url)!.push(c);
      });

    try {
      const allData: { client_id: string; flow_id: string; count: number }[] = [];

      if (mainServerClients.length > 0) {
        const mainRes = await requestFnException(
          'isac-project-management-nav-badges',
          { client_ids: mainServerClients.map(c => c.id) },
          user.token
        );
        if (mainRes.result && Array.isArray(mainRes.data)) {
          allData.push(...mainRes.data);
        }
      }

      const dedicatedPromises = Array.from(dedicatedServerClients.entries()).map(
        async ([backend_url, clients]) => {
          try {
            const { data: response } = await axios.post(
              `${backend_url}/fn-exceptions/isac-project-management-nav-badges`,
              { client_ids: clients.map(c => c.id) },
              { headers: { Authorization: `Bearer ${user.token}` } }
            );
            if (response.result && Array.isArray(response.data)) {
              return response.data;
            }
          } catch (err) {
            console.error(`Falha ao buscar badges do servidor ${backend_url}`, err);
          }
          return [];
        }
      );

      const dedicatedResults = await Promise.all(dedicatedPromises);
      dedicatedResults.forEach(arr => allData.push(...arr));


      const countMap: Record<string, number> = {};
      const flowIdMap: Record<string, string> = {};
      const idsSet = new Set<string>();

      allData.sort((a, b) => (b.count ?? 0) - (a.count ?? 0));

      for (const item of allData) {
        countMap[item.client_id] = (countMap[item.client_id] ?? 0) + item.count;
        if (!flowIdMap[item.client_id]) flowIdMap[item.client_id] = item.flow_id;
        idsSet.add(item.client_id);
      }

      setCounts(countMap);
      setFlowIds(flowIdMap);
      setOrderedIds(Array.from(idsSet));
    } catch {
      console.error('Falha ao buscar badges');
    } finally {
      setLoadingCounts(false);
    }
  }

  async function handleSwitch(client_id: string, client_name: string) {
    if (!user || client_id === user.current_client) return;
    setDropdownOpen(false);
    const res = await toast.promise(
      changeClient(client_id, client_name, user.token),
      { pending: 'Alterando empresa...', success: 'Empresa alterada', error: 'Erro ao alterar empresa' },
    );
    const targetFlowId = flowIds[client_id];
    if (res?.result && targetFlowId) navigate(isacRoutes.workflow.exec(targetFlowId));
  }

  const sorted = orderedIds
    .map(id => (user?.clients ?? []).find(c => c.id === id))
    .filter((c): c is Client => !!c && c.id !== user?.current_client);

  if (!sorted.length) return null;

  const visible = sorted.slice(0, MAX_VISIBLE);
  const overflow = sorted.slice(MAX_VISIBLE);

  return (
    <div className="flex items-center gap-1">
      {visible.map(client => (
        <BadgeButton
          key={client.id}
          client={client}
          count={counts[client.id] ?? 0}
          loadingCounts={loadingCounts}
          isActive={false}
          onClick={() => handleSwitch(client.id, client.nome_fantasia)}
        />
      ))}

      {overflow.length > 0 && (
        <div ref={dropdownRef}>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => {
              if (dropdownOpen) {
                setDropdownOpen(false);
              } else {
                const rect = buttonRef.current?.getBoundingClientRect();
                if (rect) setDropdownPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
                setDropdownOpen(true);
              }
            }}
            className="w-6 h-6 rounded-full bg-gray-200/60 text-gray-600 text-[9px] font-bold flex items-center justify-center hover:bg-gray-300/60 focus:outline-none"
          >
            +{overflow.length}
          </button>

          {dropdownOpen && dropdownPos && (
            <div
              style={{ position: 'fixed', top: dropdownPos.top, right: dropdownPos.right, zIndex: 9999 }}
              className="bg-white rounded-lg shadow-lg py-1 min-w-[176px]"
            >
              {overflow.map(client => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => handleSwitch(client.id, client.nome_fantasia)}
                  className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-gray-100 text-left"
                >
                  <div className="relative shrink-0">
                    <CompanyAvatar picture={client.picture} name={client.nome_fantasia} />
                    <CountBadge count={counts[client.id] ?? 0} loading={loadingCounts} />
                  </div>
                  <span className="text-xs text-gray-700 font-medium truncate">{client.nome_fantasia}</span>
                  {(counts[client.id] ?? 0) > 0 && (
                    <span className="ml-auto text-[10px] font-bold text-primary-600 shrink-0">
                      {counts[client.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
