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

export const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyle = () => {
    switch (status?.toLowerCase()) {
      case 'open':
        return {
          className: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <FiCircle className="h-3 w-3" />,
          label: 'Open',
        };
      case 'in progress':
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
