import {
  FiCircle,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiChevronDown,
  FiMinus,
  FiChevronUp,
  FiAlertTriangle,
} from 'react-icons/fi';
import type { ActivityItem } from '../interfaces/issueInterface';

export const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyle = () => {
    switch (status?.toLowerCase()) {
      case 'open':
        return {
          className: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <FiCircle className="h-3 w-3" />,
          label: 'Open',
        };
      case 'in_progress':
        return {
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <FiClock className="h-3 w-3" />,
          label: 'In Progress',
        };
      case 'resolved':
        return {
          className: 'bg-green-100 text-green-800 border-green-200',
          icon: <FiCheckCircle className="h-3 w-3" />,
          label: 'Resolved',
        };
      case 'closed':
        return {
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <FiXCircle className="h-3 w-3" />,
          label: 'Closed',
        };
      default:
        return {
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null,
          label: status || '-',
        };
    }
  };

  const style = getStatusStyle();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${style.className}`}
    >
      {style.icon ?? ''}
      {style.label ? style.label : '-'}
    </span>
  );
};

export const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityStyle = () => {
    switch (priority?.toLowerCase()) {
      case 'low':
        return {
          className: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: <FiChevronDown className="h-3 w-3" />,
          label: 'Low',
        };
      case 'medium':
        return {
          className: 'bg-orange-100 text-orange-700 border-orange-200',
          icon: <FiMinus className="h-3 w-3" />,
          label: 'Medium',
        };
      case 'high':
        return {
          className: 'bg-red-100 text-red-700 border-red-200',
          icon: <FiChevronUp className="h-3 w-3" />,
          label: 'High',
        };
      case 'critical':
        return {
          className: 'bg-red-200 text-red-900 border-red-300',
          icon: <FiAlertTriangle className="h-3 w-3" />,
          label: 'Critical',
        };
      default:
        return {
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null,
          label: priority || '-',
        };
    }
  };

  const style = getPriorityStyle();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${style.className}`}
    >
      {style.icon ?? ''}
      {style.label ? style.label : '-'}
    </span>
  );
};

export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-slate-700">{payload[0].name}</p>
        <p className="text-xs text-slate-500">
          Count: <span className="font-bold text-slate-800">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const STATUS_COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#94a3b8'];
export const PRIORITY_COLORS = ['#ef4444', '#f97316', '#eab308', '#94a3b8'];
export const SEVERITY_COLORS = ['#e11d48', '#8b5cf6', '#38bdf8'];
export const actionColor: Record<ActivityItem['action'], string> = {
  created: 'bg-blue-100 text-blue-700',
  updated: 'bg-yellow-100 text-yellow-700',
  commented: 'bg-purple-100 text-purple-700',
  status_changed: 'bg-orange-100 text-orange-700',
  assigned: 'bg-green-100 text-green-700',
};

export function timeFormatter(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
