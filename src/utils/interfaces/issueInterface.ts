export interface IssueProps {
  id?: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  severity: 'minor' | 'major' | 'critical';
  tags?: string[];
  dueDate: Date | null;
  estimatedHours: number | null;
  actualHours?: number | null;
  assignedToId?: string | null;
  resolvedAt?: Date | null;
  closedAt?: Date | null;
  attachments?: { name: string; url: string; uploadedAt: string }[];
}

export interface IssuePageUserProps {
  id: string;
  name: string;
}

export interface AllIssuePageProps {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | '';
  priority: 'low' | 'medium' | 'high' | 'critical' | '';
  severity: 'minor' | 'major' | 'critical' | '';
  tags?: string[];
  dueDate: Date | null;
  estimatedHours: number | null;
  actualHours?: number | null;
  assignedToName?: string | null;
  createdAt?: Date | null;
}

export interface QueryProps {
  search?: string;
  status?: 'open' | 'in_progress' | 'resolved' | 'closed' | '';
  priority?: 'low' | 'medium' | 'high' | 'critical' | '';
  severity?: 'minor' | 'major' | 'critical' | '';
  assignedToName?: string | null;
  createdById?: string | null;
  page: number;
  limit: number;
  sortBy: 'createdAt';
  sortOrder: 'desc';
}

export interface PaginationProps {
  page: number;
  limit: number;
  total: number;
}

export interface IssueStatsProps {
  open: number;
  in_progress: number;
  resolved: number;
  closed: number;
}
interface PriorityStats {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

interface SeverityStats {
  minor: number;
  major: number;
  critical: number;
}

export interface ActivityItem {
  id: string;
  userName: string;
  action: 'created' | 'updated' | 'commented' | 'status_changed' | 'assigned';
  issueTitle: string;
  issueId: string;
  timeStamp: string;
  comment?: string;
}

export interface DashboardExtraProps {
  overdueCount: number;
  unassignedCount: number;
  priorityStats: PriorityStats;
  severityStats: SeverityStats;
  recentActivities: ActivityItem[];
  estimatedHoursTotal: number;
  actualHoursTotal: number;
}
