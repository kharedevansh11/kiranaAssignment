import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ContestGraph({ contests }) {
  const graphData = contests.map(contest => ({
    name: contest.name.substring(0, 10) + '...',
    duration: contest.durationSeconds / 3600
  })).slice(0, 10);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0 }}><strong>{label}</strong></p>
          <p style={{ margin: '5px 0', color: '#666' }}>
            Duration: {payload[0].value.toFixed(2)} hours
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ 
      width: '100%', 
      height: 400, 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={graphData}
          margin={{ top: 20, right: 30, left: 50, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={80}
            tick={{ fill: '#374151', fontSize: 12 }}
            label={{ 
              value: 'Contest Name', 
              position: 'bottom',
              offset: 50,
              style: { fill: '#1f2937', fontSize: 14, fontWeight: 600 }
            }}
          />
          <YAxis 
            tick={{ fill: '#374151', fontSize: 12 }}
            label={{ 
              value: 'Duration (hours)', 
              angle: -90, 
              position: 'insideLeft',
              offset: -35,
              style: { fill: '#1f2937', fontSize: 14, fontWeight: 600 }
            }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="duration" 
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#4f46e5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ContestGraph;
