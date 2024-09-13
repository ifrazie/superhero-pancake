import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MarketNavBar from '../components/MarketNavBar';

const fetchCryptoData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const CryptoRow = ({ crypto }) => (
  <TableRow>
    <TableCell className="font-medium">{crypto.name}</TableCell>
    <TableCell>${crypto.current_price.toFixed(2)}</TableCell>
    <TableCell className={crypto.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}>
      {crypto.price_change_percentage_24h.toFixed(2)}%
    </TableCell>
    <TableCell>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={crypto.sparkline_in_7d.price.map((price, index) => ({ price, index }))}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </TableCell>
  </TableRow>
);

const MarketOverview = () => {
  const { data: cryptos, isLoading, error } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptoData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MarketNavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Market Overview</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead>7d Chart</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cryptos.map((crypto) => (
              <CryptoRow key={crypto.id} crypto={crypto} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MarketOverview;
