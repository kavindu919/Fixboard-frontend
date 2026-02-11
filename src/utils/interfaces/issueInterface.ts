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
