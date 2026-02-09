export interface IssueProps {
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
