import type React from 'react';
import type { QueryProps } from '../utils/interfaces/issueInterface';
import FormDropdown from './FormDropdown';
import FormInput from './FormInput';

interface FilterProps {
  query: QueryProps;
  setQuery: React.Dispatch<React.SetStateAction<QueryProps>>;
}

const Filters = ({ setQuery, query }: FilterProps) => {
  const handleChnage = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-end md:gap-3">
      <section>
        <FormInput
          name="search"
          type="text"
          label=""
          placeholder="Search issue title"
          onChange={handleChnage}
          value={query.search}
        />
      </section>
      <fieldset className="grid grid-cols-2 gap-3 md:flex md:gap-3">
        <FormDropdown
          label="Status"
          name="status"
          options={[
            { value: '', label: 'All' },
            { value: 'open', label: 'Open' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'resolved', label: 'Resolved' },
            { value: 'closed', label: 'Closed' },
          ]}
          value={query.status}
          onChange={handleChnage}
        />
        <FormDropdown
          label="Priority"
          name="priority"
          options={[
            { value: '', label: 'All' },
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'critical', label: 'Critical' },
          ]}
          value={query.priority}
          onChange={handleChnage}
        />
        <FormDropdown
          label="Severity"
          name="severity"
          options={[
            { value: '', label: 'All' },
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
          value={query.severity}
          onChange={handleChnage}
        />
        <FormDropdown
          label="Sort by"
          name="sortBy"
          options={[
            { value: 'createdAt', label: 'Created date' },
            { value: 'updatedAt', label: 'Updated date' },
          ]}
          value={query.sortBy}
          onChange={handleChnage}
        />
        <FormDropdown
          label="Sort order"
          name="sortOrder"
          options={[
            { value: 'desc', label: 'Newest first' },
            { value: 'asc', label: 'Oldest first' },
          ]}
          value={query.sortOrder}
          onChange={handleChnage}
        />
      </fieldset>
    </form>
  );
};

export default Filters;
