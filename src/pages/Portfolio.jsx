import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MarketNavBar from '../components/MarketNavBar';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const fetchPortfolioData = async () => {
  // Simulating API call with mock data
  return {
    holdings: [
      { name: 'Bitcoin', amount: 0.5, price: 50000, value: 25000, profitLoss: 5000 },
      { name: 'Ethereum', amount: 5, price: 3000, value: 15000, profitLoss: 2000 },
      { name: 'Cardano', amount: 1000, price: 1.5, value: 1500, profitLoss: -200 },
      { name: 'Polkadot', amount: 100, price: 20, value: 2000, profitLoss: 300 },
    ],
    portfolioHistory: [
      { date: '2023-01-01', value: 30000 },
      { date: '2023-02-01', value: 35000 },
      { date: '2023-03-01', value: 32000 },
      { date: '2023-04-01', value: 40000 },
      { date: '2023-05-01', value: 43500 },
    ]
  };
};

const Portfolio = () => {
  const { data: portfolioData, isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolioData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const totalValue = portfolioData.holdings.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MarketNavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Asset Allocation */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Asset Allocation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioData.holdings}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {portfolioData.holdings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Portfolio Value Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Portfolio Value Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioData.portfolioHistory}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Holdings</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Profit/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioData.holdings.map((asset) => (
                <TableRow key={asset.name}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.amount}</TableCell>
                  <TableCell>${asset.price.toFixed(2)}</TableCell>
                  <TableCell>${asset.value.toFixed(2)}</TableCell>
                  <TableCell className={asset.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                    ${asset.profitLoss.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;