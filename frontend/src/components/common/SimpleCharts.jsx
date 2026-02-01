import React from 'react';

// --- Simple SVG Bar Chart ---
// Data format: [{ name: 'Label', value: 100 }, ...]
export const SimpleBarChart = ({ data, color = '#3b82f6', height = 200 }) => {
    if (!data || data.length === 0) return <div className="text-gray-400 text-sm">No data available</div>;

    const maxValue = Math.max(...data.map(d => d.value));
    const chartHeight = height - 30; // Reserve space for labels

    return (
        <div style={{ height: `${height}px` }} className="flex items-end space-x-2 w-full pt-4 pb-2">
            {data.map((item, index) => {
                const barHeight = maxValue > 0 ? (item.value / maxValue) * chartHeight : 0;
                return (
                    <div key={index} className="flex-1 flex flex-col items-center group relative">
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            {item.name}: {item.value}
                        </div>

                        {/* Bar */}
                        <div
                            className="w-full mx-1 rounded-t opacity-80 hover:opacity-100 transition-all duration-300"
                            style={{
                                height: `${Math.max(barHeight, 4)}px`, // Minimum height for visibility 
                                backgroundColor: color
                            }}
                        />

                        {/* Label */}
                        <div className="mt-2 text-xs text-gray-500 truncate w-full text-center">
                            {item.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// --- Simple Line Chart ---
// Data format: [{ name: 'Label', value: 100 }, ...]
export const SimpleLineChart = ({ data, color = '#10b981', height = 200 }) => {
    if (!data || data.length === 0) return <div className="text-gray-400 text-sm">No data available</div>;

    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100; // Percentage width
        const y = 100 - ((d.value / maxValue) * 100); // Inverted Y percentage
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="relative w-full" style={{ height: `${height}px` }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                {/* Line */}
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    points={points}
                    vectorEffect="non-scaling-stroke"
                />

                {/* Fill Area (Optional, minimal implementation) */}
                <polygon
                    fill={color}
                    fillOpacity="0.1"
                    points={`0,100 ${points} 100,100`}
                    vectorEffect="non-scaling-stroke"
                />

                {/* Dots */}
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    const y = 100 - ((d.value / maxValue) * 100);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="1.5"
                            fill="white"
                            stroke={color}
                            strokeWidth="0.5"
                            vectorEffect="non-scaling-stroke"
                            className="hover:r-2 transition-all cursor-pointer"
                        >
                            <title>{`${d.name}: ${d.value}`}</title>
                        </circle>
                    );
                })}
            </svg>

            {/* X-Axis Labels */}
            <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-500 transform translate-y-full pt-1">
                {data.map((d, i) => (
                    <span key={i}>{d.name}</span>
                ))}
            </div>
        </div>
    );
};
