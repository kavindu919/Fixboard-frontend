import * as z from 'zod';
export const issueSchema = z.object({
  title: z.string({
    message: 'Title is required',
  }),
  description: z.string({
    message: 'Description is required',
  }),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed'], {
    message: 'Please select the issue status',
  }),
  priority: z.enum(['low', 'medium', 'high', 'critical'], {
    message: 'Please select a priority level',
  }),
  severity: z.enum(['minor', 'major', 'critical'], { message: 'Please select the issue severity' }),
  assignedToId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  dueDate: z.preprocess(
    (val) => {
      if (!val) return null;
      const date = new Date(val as string);
      return isNaN(date.getTime()) ? null : date;
    },
    z.date({ message: 'Please select the issue due date' }).nullable(),
  ),
  estimatedHours: z
    .number({
      message: 'Estimated hours must be a number',
    })
    .int()
    .positive()
    .nullable(),
  attachments: z
    .array(
      z.object({
        name: z.string({ message: 'Attachment name is required' }),
        url: z.string().url({ message: 'Attachment URL must be valid' }),
        uploadedAt: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
          message: 'Invalid date format for uploadedAt',
        }),
      }),
    )
    .optional(),
});
export const issueUpdatePageSchema = z.object({
  id: z.string({
    message: 'Issue Id is required',
  }),
  title: z.string({
    message: 'Title is required',
  }),
  description: z.string({
    message: 'Description is required',
  }),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed'], {
    message: 'Please select the issue status',
  }),
  priority: z.enum(['low', 'medium', 'high', 'critical'], {
    message: 'Please select a priority level',
  }),
  severity: z.enum(['minor', 'major', 'critical'], { message: 'Please select the issue severity' }),
  assignedToId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  dueDate: z.preprocess(
    (val) => {
      if (!val) return null;
      const date = new Date(val as string);
      return isNaN(date.getTime()) ? null : date;
    },
    z.date({ message: 'Please select the issue due date' }).nullable(),
  ),
  estimatedHours: z
    .number({
      message: 'Estimated hours must be a number',
    })
    .int()
    .positive()
    .nullable(),
  actualHours: z
    .number({
      message: 'Actual hours must be a number',
    })
    .int()
    .positive()
    .nullable()
    .optional(),
  attachments: z
    .array(
      z.object({
        name: z.string({ message: 'Attachment name is required' }),
        url: z.string().url({ message: 'Attachment URL must be valid' }),
        uploadedAt: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
          message: 'Invalid date format for uploadedAt',
        }),
      }),
    )
    .optional(),
});
