interface StatCardPros {
  label: string;
  value: string;
}

const StatCard = ({ label, value }: StatCardPros) => {
  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50 text-blue-600',
    yellow: 'border-yellow-200 bg-yellow-50 text-yellow-600',
    green: 'border-green-200 bg-green-50 text-green-600',
    gray: 'border-gray-200 bg-gray-50 text-gray-600',
  };

  const textClasses = {
    blue: 'text-blue-800',
    yellow: 'text-yellow-800',
    green: 'text-green-800',
    gray: 'text-gray-800',
  };

  let statColor = '';
  let textColor = '';
  switch (label) {
    case 'Open':
      statColor = colorClasses.blue;
      textColor = textClasses.blue;
      break;
    case 'In Progress':
      statColor = colorClasses.yellow;
      textColor = textClasses.yellow;
      break;
    case 'Resolved':
      statColor = colorClasses.green;
      textColor = textClasses.green;
      break;
    case 'Closed':
      statColor = colorClasses.gray;
      textColor = textClasses.gray;
      break;
  }

  return (
    <div className={`rounded-xl border p-4 ${statColor}`}>
      <p className="text-sm font-medium">{label}</p>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
};

export default StatCard;
