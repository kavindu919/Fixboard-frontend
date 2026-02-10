import FormDropdown from './FormDropdown';
import FormInput from './FormInput';

const Filters = () => {
  return (
    <form className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-end md:gap-3">
      <section>
        <FormInput name="search" type="text" label="" placeholder="Seacrch" />
      </section>
      <fieldset className="grid grid-cols-2 gap-3 md:flex md:gap-3">
        <FormDropdown
          label="Status"
          name="status"
          options={[
            { value: 'open', label: 'Open' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'resolved', label: 'Resolved' },
            { value: 'closed', label: 'Closed' },
          ]}
          //   value={status}
          //   onChange={(e) => setStatus(e.target.value)}
        />
        <FormDropdown
          label="Priority"
          name="priority"
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'critical', label: 'Critical' },
          ]}
          //   value={priority}
          //   onChange={(e) => setPriority(e.target.value)}
        />
      </fieldset>
    </form>
  );
};

export default Filters;
