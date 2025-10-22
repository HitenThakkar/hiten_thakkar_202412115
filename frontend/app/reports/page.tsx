'use client';

import { useState, useEffect, useContext } from 'react';
import { apiFetch } from '../../lib/api';
import { AuthContext } from '../../components/AuthContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Reports() {
  const [dailyRevenue, setDailyRevenue] = useState<any[]>([]);
  const [categoryAvg, setCategoryAvg] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        setError(null);
        const [revenue, avg] = await Promise.all([
          apiFetch('/reports/daily-revenue'),
          apiFetch('/reports/category-average'),
        ]);
        setDailyRevenue(revenue || []);
        setCategoryAvg(avg || []);
      } catch (e) {
        console.error('Reports fetch error:', e);
        setError('Failed to load reports. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    if (auth?.user?.role === 'admin') fetchReports();
  }, [auth]);

  if (auth?.user?.role !== 'admin') return <p className="text-red-500">Forbidden</p>;
  if (loading) return <p className="text-center">Loading reports...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Prepare data for charts
  const dailyRevenueData = {
    labels: dailyRevenue.map(r => r.date),
    datasets: [
      {
        label: 'Daily Revenue ($)',
        data: dailyRevenue.map(r => r.revenue || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const categoryAvgData = {
    labels: categoryAvg.map(a => a.category),
    datasets: [
      {
        data: categoryAvg.map(a => a._avg?.price || 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Daily Revenue' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Revenue ($)' } },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Average Price by Category' },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4 text-center">Reports</h1>
      
      <section className="mb-6 p-4 border rounded">
        <h2 className="text-xl mb-2">Daily Revenue Chart</h2>
        {dailyRevenue.length > 0 ? (
          <div className="h-80">
            <Bar data={dailyRevenueData} options={barOptions} />
          </div>
        ) : (
          <p className="text-gray-500 italic">No revenue data available. Create some orders to see the chart.</p>
        )}
      </section>

      <section className="p-4 border rounded">
        <h2 className="text-xl mb-2">Category Average Price Chart</h2>
        {categoryAvg.length > 0 ? (
          <div className="h-80">
            <Pie data={categoryAvgData} options={pieOptions} />
          </div>
        ) : (
          <p className="text-gray-500 italic">No category data available.</p>
        )}
      </section>
    </div>
  );
}