import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { IssuePageUserProps, IssueProps } from '../../../utils/interfaces/issueInterface';
import FormInput from '../../../components/FormInput';
import FormDropdown from '../../../components/FormDropdown';
import TextArea from '../../../components/TextArea';
import TagInput from '../../../components/TagInput';
import {
  createIssue,
  getAllUsers,
  getIssueById,
  updateIssue,
} from '../../../services/issueservice';
import toast from 'react-hot-toast';
import FormButton from '../../../components/FormButton';
import { issueSchema } from '../../../utils/validation/issueSchema';
import { ZodError } from 'zod';
import CloudinaryUploader from '../../../components/CloudinaryUploader';
import { useParams } from 'react-router-dom';

const EditIssue = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IssuePageUserProps[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
    fetchIssue();
  }, []);

  const [data, setData] = useState<IssueProps>({
    id: '',
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    severity: 'minor',
    tags: [],
    dueDate: null,
    estimatedHours: null,
    actualHours: null,
    assignedToId: null,
    attachments: [],
  });

  const fetchIssue = async () => {
    console.log('fetchUsers running');
    console.log('id', id);
    if (!id) {
      return;
    }
    try {
      const res = await getIssueById(id);
      if (res.data.success) {
        const issue = res.data.data;
        setData({
          id: issue.id,
          title: issue.title,
          description: issue.description,
          status: issue.status,
          priority: issue.priority,
          severity: issue.severity,
          tags: issue.tags || [],
          dueDate: issue.dueDate ? new Date(issue.dueDate) : null,
          estimatedHours: issue.estimatedHours,
          actualHours: issue.actualHours,
          assignedToId: issue.assignedToId,
          attachments: issue.attachments || [],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load issue details');
    }
  };

  const handleChnage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const validData = issueSchema.parse(data);
      const res = await updateIssue(validData);
      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          title: '',
          description: '',
          status: 'open',
          priority: 'medium',
          severity: 'minor',
          tags: [],
          dueDate: null,
          estimatedHours: null,
          actualHours: null,
          assignedToId: null,
          attachments: [],
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log(error);
        toast.error(error.issues[0]?.message);
        return;
      }
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Login failed');
      } else {
        console.log(error);
        toast.error('Unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  console.log('data', data);
  return (
    <form className="min-h-screen w-full space-y-4 pb-24" onSubmit={handleSubmit}>
      <header className="flex flex-col gap-3">
        <h5 className="text-xs text-slate-500 uppercase">
          {pathname.substring(1).split('/').join(' / ')}
        </h5>
      </header>

      <div className="flex w-full flex-1 flex-col gap-3 md:flex-row">
        <div className="flex w-full flex-col gap-3 md:w-3/4">
          <div className="flex h-full w-full flex-col gap-3 rounded-lg border-2 border-slate-300 px-3 py-4">
            <header className="flex flex-col items-start justify-start gap-1">
              <h4 className="text-base font-medium">Issue Details</h4>
              <h5 className="text-sm font-normal text-slate-400">
                Provide a clear and concise description of the issue.
              </h5>
            </header>
            <section className="flex flex-col gap-3">
              <FormInput
                label="Issue Title"
                name="title"
                type="text"
                value={data.title}
                placeholder="e.g. Login button not working on mobile"
                onChange={handleChnage}
                disabled={loading}
              />
              <TextArea
                name="description"
                placeholder="Describe the issue in detail..."
                onChange={(e) => {
                  setData({
                    ...data,
                    description: e.target.value,
                  });
                }}
                value={data.description}
                disabled={loading}
              />
            </section>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 rounded-lg border-2 border-slate-300 px-3 py-4 md:w-1/4">
          <header className="flex flex-col items-start justify-start gap-1">
            <h4 className="text-base font-medium">Basic Issue Information</h4>
            <h5 className="text-sm font-normal text-slate-400">
              Define the foundational details of your issue
            </h5>
          </header>
          <section className="grid w-full grid-cols-1 gap-3 md:grid-cols-1">
            <FormDropdown
              label="Status"
              name="status"
              options={[
                {
                  value: 'open',
                  label: 'Open',
                },
                {
                  value: 'in_progress',
                  label: 'In Progress',
                },
                {
                  value: 'resolved',
                  label: 'Resolved',
                },
                {
                  value: 'closed',
                  label: 'Closed',
                },
              ]}
              value={data.status}
              onChange={handleChnage}
              disabled={loading}
            />
            <section className="flex flex-row items-center justify-between gap-1.5">
              <FormDropdown
                label="Priority"
                name="priority"
                options={[
                  {
                    value: 'low',
                    label: 'Low',
                  },
                  {
                    value: 'medium',
                    label: 'Medium',
                  },
                  {
                    value: 'high',
                    label: 'High',
                  },
                  {
                    value: 'critical',
                    label: 'Critical',
                  },
                ]}
                value={data.priority}
                onChange={handleChnage}
                disabled={loading}
              />
              <FormDropdown
                label="Severity"
                name="severity"
                options={[
                  {
                    value: 'minor',
                    label: 'Minor',
                  },
                  {
                    value: 'major',
                    label: 'Major',
                  },
                  {
                    value: 'critical',
                    label: 'Critical',
                  },
                ]}
                value={data.severity}
                onChange={handleChnage}
                disabled={loading}
              />
            </section>
            <TagInput
              label="Tag"
              onTagsChange={(tags) => {
                setData({
                  ...data,
                  tags: tags,
                });
              }}
              disabled={loading}
              value={data.tags}
            />
            <FormDropdown
              label="Assigned To"
              name="assignedToId"
              options={users.map((items) => ({
                value: items.id,
                label: items.name,
              }))}
              onChange={handleChnage}
              value={data.assignedToId ?? ''}
              disabled={loading}
              placeholder="Select a user"
            />
          </section>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col gap-3 md:flex-row">
        <div className="flex w-full flex-col gap-3 md:w-3/4">
          <div className="flex h-full w-full flex-col gap-3 rounded-lg border-2 border-slate-300 px-3 py-4">
            <header className="flex flex-col items-start justify-start gap-1">
              <h4 className="text-base font-medium">Uploads</h4>
              <h5 className="text-sm font-normal text-slate-400">
                Upload files related to this issue
              </h5>
            </header>
            <section className="w-full">
              <CloudinaryUploader
                name="attachments"
                label="Attachments"
                value={data.attachments || []}
                onChange={(urls) => {
                  setData({
                    ...data,
                    attachments: urls,
                  });
                }}
              />
            </section>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 rounded-lg border-2 border-slate-300 px-3 py-4 md:w-1/4">
          <header className="flex flex-col items-start justify-start gap-1">
            <h4 className="text-base font-medium">Timeline</h4>
            <h5 className="text-sm font-normal text-slate-400">Set time estimates</h5>
          </header>
          <section className="grid w-full grid-cols-1 gap-3">
            <FormInput
              label="Due Date"
              name="dueDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              placeholder="Select due date"
              onChange={(e) => {
                setData({
                  ...data,
                  dueDate: e.target.value ? new Date(e.target.value) : null,
                });
              }}
              value={data.dueDate ? data.dueDate.toISOString().split('T')[0] : ''}
              disabled={loading}
            />
            <FormInput
              label="Estimated Hours"
              name="estimatedHours"
              type="number"
              min={0}
              placeholder="e.g. 8"
              onChange={(e) => {
                const value = e.target.value;
                setData({
                  ...data,
                  estimatedHours: value === '' ? null : Number(value),
                });
              }}
              value={data.estimatedHours !== null ? data.estimatedHours : ''}
              disabled={loading}
            />
            <FormInput
              label="Actual Hours"
              name="actualHours"
              type="number"
              min={0}
              placeholder="e.g. 10"
              onChange={(e) => {
                const value = e.target.value;
                setData({
                  ...data,
                  actualHours: value === '' ? null : Number(value),
                });
              }}
              value={data.actualHours !== null ? data.actualHours : ''}
              disabled={loading}
            />
          </section>
        </div>
      </div>

      <div className="flex w-full flex-row items-center justify-end px-1.5">
        <FormButton text="Save" type="submit" isLoading={loading} disabled={loading} />
      </div>
    </form>
  );
};

export default EditIssue;
