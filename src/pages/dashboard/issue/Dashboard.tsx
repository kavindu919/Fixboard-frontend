import React, { useEffect, useState } from 'react';
import { FiActivity, FiBarChart2, FiClock, FiList, FiTrendingUp, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../components/StatCard';
import type {
  DashboardExtraProps,
  IssueStatsProps,
} from '../../../utils/interfaces/issueInterface';
import toast from 'react-hot-toast';
import { getIssueStats } from '../../../services/issueservice';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  actionColor,
  CustomTooltip,
  PRIORITY_COLORS,
  SEVERITY_COLORS,
  STATUS_COLORS,
  timeFormatter,
} from '../../../utils/helpers/issueBadge';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<IssueStatsProps>({
    open: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0,
  });
  const [extras, setExtras] = useState<DashboardExtraProps>({
    overdueCount: 0,
    unassignedCount: 0,
    priorityStats: { low: 0, medium: 0, high: 0, critical: 0 },
    severityStats: { minor: 0, major: 0, critical: 0 },
    recentActivities: [],
    estimatedHoursTotal: 0,
    actualHoursTotal: 0,
  });

  const totalIssues = stats.open + stats.in_progress + stats.resolved + stats.closed;
  const resolvedAndClosed = stats.resolved + stats.closed;
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedAndClosed / totalIssues) * 100) : 0;
  const activeIssues = stats.open + stats.in_progress;
  const hoursVariance = extras.actualHoursTotal - extras.estimatedHoursTotal;
  const hoursOverrun =
    extras.estimatedHoursTotal > 0
      ? Math.round((hoursVariance / extras.estimatedHoursTotal) * 100)
      : 0;

  const statusPieData = [
    { name: 'Open', value: stats.open },
    { name: 'In Progress', value: stats.in_progress },
    { name: 'Resolved', value: stats.resolved },
    { name: 'Closed', value: stats.closed },
  ];

  const resolutionRadialData = [
    { name: 'Resolution Rate', value: resolutionRate, fill: '#10b981' },
  ];

  const activeRadialData = [
    {
      name: 'Active Issues',
      value: totalIssues > 0 ? Math.round((activeIssues / totalIssues) * 100) : 0,
      fill: '#f97316',
    },
  ];

  const severityBarData = [
    { name: 'Critical', value: extras.severityStats.critical, fill: SEVERITY_COLORS[0] },
    { name: 'Major', value: extras.severityStats.major, fill: SEVERITY_COLORS[1] },
    { name: 'Minor', value: extras.severityStats.minor, fill: SEVERITY_COLORS[2] },
  ];

  const priorityBarData = [
    { name: 'Critical', value: extras.priorityStats.critical, fill: PRIORITY_COLORS[0] },
    { name: 'High', value: extras.priorityStats.high, fill: PRIORITY_COLORS[1] },
    { name: 'Medium', value: extras.priorityStats.medium, fill: PRIORITY_COLORS[2] },
    { name: 'Low', value: extras.priorityStats.low, fill: PRIORITY_COLORS[3] },
  ];

  useEffect(() => {
    fetchStats();
  }, []);
  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getIssueStats();
      if (res?.data.success) {
        const data = res.data.data;

        setStats({
          open: data.open,
          in_progress: data.in_progress,
          resolved: data.resolved,
          closed: data.closed,
        });

        setExtras({
          overdueCount: data.overdueCount,
          unassignedCount: data.unassignedCount,
          priorityStats: data.priorityStats,
          severityStats: data.severityStats,
          recentActivities: data.recentActivities,
          estimatedHoursTotal: data.estimatedHoursTotal,
          actualHoursTotal: data.actualHoursTotal,
        });
      } else {
        toast.error(res?.data.message);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to load issue stats');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full space-y-4 pb-24">
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Open" value={stats.open} />
        <StatCard label="In Progress" value={stats.in_progress} />
        <StatCard label="Resolved" value={stats.resolved} />
        <StatCard label="Closed" value={stats.closed} />
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <figure className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <FiBarChart2 className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-700">Status Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Open', value: stats.open },
                  { name: 'In Progress', value: stats.in_progress },
                  { name: 'Resolved', value: stats.resolved },
                  { name: 'Closed', value: stats.closed },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {statusPieData.map((_, i) => (
                  <Cell key={i} fill={STATUS_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => <span className="text-xs text-slate-600">{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </figure>
        <figure className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <FiTrendingUp className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-700">Resolution Rate</h3>
          </div>
          <div className="relative flex flex-col items-center">
            <ResponsiveContainer width={200} height={180}>
              <RadialBarChart
                cx="50%"
                cy="55%"
                innerRadius={55}
                outerRadius={80}
                barSize={14}
                data={resolutionRadialData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={8} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-emerald-600">{resolutionRate}%</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {resolvedAndClosed} of {totalIssues} resolved
            </p>
          </div>
        </figure>
        <figure className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <FiTrendingUp className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-700">Active Issues</h3>
          </div>
          <div className="relative flex flex-col items-center">
            <ResponsiveContainer width={200} height={180}>
              <RadialBarChart
                cx="50%"
                cy="55%"
                innerRadius={55}
                outerRadius={80}
                barSize={14}
                data={activeRadialData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={8} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-orange-500">{activeIssues}</span>
              <span className="text-[10px] text-slate-400">issues</span>
            </div>
            <div className="mt-1 flex gap-2 text-xs">
              <span className="rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue-600">
                {stats.open} open
              </span>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-600">
                {stats.in_progress} in progress
              </span>
            </div>
          </div>
        </figure>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <figure className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <FiActivity className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-700">Priority Breakdown</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={priorityBarData}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
              barSize={14}
            >
              <CartesianGrid horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                width={52}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {priorityBarData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </figure>
        <figure className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <FiActivity className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-700">Severity Breakdown</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={severityBarData}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
              barSize={14}
            >
              <CartesianGrid horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                width={52}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {severityBarData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </figure>
        <div className="flex flex-col gap-3">
          <section className="flex items-center justify-between rounded-xl border border-red-50 bg-red-50 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-500 p-2.5">
                <FiClock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-red-500">Overdue Issues</p>
                <p className="text-sm font-semibold text-red-800">Past due, still open</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-red-600">
              {loading ? '—' : extras.overdueCount}
            </span>
          </section>

          <section className="flex items-center justify-between rounded-xl border border-purple-50 bg-purple-50 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500 p-2.5">
                <FiUser className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-purple-500">Unassigned</p>
                <p className="text-sm font-semibold text-purple-800">No owner assigned</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {loading ? '—' : extras.unassignedCount}
            </span>
          </section>

          <section className="flex flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <FiClock className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-700">Time Tracking</h3>
            </div>

            <div className="flex items-end justify-between">
              <div className="space-y-0.5 text-xs text-slate-500">
                <p>
                  Estimated:{' '}
                  <span className="font-semibold text-slate-700">
                    {extras.estimatedHoursTotal}h
                  </span>
                </p>
                <p>
                  Actual:{' '}
                  <span className="font-semibold text-slate-700">{extras.actualHoursTotal}h</span>
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-sm font-bold ${
                  hoursVariance > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                {hoursVariance > 0 ? '+' : ''}
                {hoursOverrun}%
              </span>
            </div>
          </section>
        </div>
      </section>
      <section className="flex flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiActivity className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-700">Recent Activity</h3>
          </div>
        </div>
        <div className="hide-scrollbar max-h-80 overflow-y-auto">
          <ul className="w-full divide-y divide-slate-50">
            {extras.recentActivities.map((act) => (
              <li key={act.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-500 text-xs font-bold text-white">
                  {act.userName}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">{act.userName}</span>{' '}
                    <span
                      className={`inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium ${actionColor[act.action]}`}
                    >
                      {act.action}
                    </span>{' '}
                    <button
                      onClick={() => navigate(`/dashboard/issues/${act.issueId}`)}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {act.issueTitle}
                    </button>
                  </p>
                  {act.comment && (
                    <p className="mt-0.5 truncate text-[11px] text-slate-400 italic">
                      "{act.comment}"
                    </p>
                  )}
                </div>
                <span className="shrink-0 text-[11px] text-slate-400">
                  {timeFormatter(act.timeStamp)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
