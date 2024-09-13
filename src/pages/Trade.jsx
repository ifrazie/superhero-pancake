import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MarketNavBar from '../components/MarketNavBar';

const fetchCryptoData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Trade = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ['cryptoChart'],
    queryFn: fetchCryptoData,
  });

  const mockOrderBook = [
    { price: 50000, amount: 0.5, type: 'buy' },
    { price: 49900, amount: 1.2, type: 'buy' },
    { price: 50100, amount: 0.8, type: 'sell' },
    { price: 50200, amount: 1.5, type: 'sell' },
  ];

  const mockRecentTrades = [
    { price: 50050, amount: 0.1, time: '14:30:25' },
    { price: 50025, amount: 0.3, time: '14:30:10' },
    { price: 50075, amount: 0.2, time: '14:29:55' },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const formattedChartData = chartData.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleString(),
    price,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MarketNavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Trade</h1>
        
        {/* Chart Area */}
        <div className="mb-8">
          <div className="flex justify-end mb-2">
            {['1h', '24h', '1w', '1m'].map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                className="ml-2"
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe}
              </Button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedChartData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Book */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Book</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrderBook.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className={order.type === 'buy' ? 'text-green-600' : 'text-red-600'}>
                      ${order.price.toFixed(2)}
                    </TableCell>
                    <TableCell>{order.amount.toFixed(4)}</TableCell>
                    <TableCell>${(order.price * order.amount).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Trade Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Place Order</h2>
            <form className="space-y-4">
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger>
                  <SelectValue placeholder="Order Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="limit">Limit</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
              {orderType === 'limit' && (
                <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
              )}
              <Button type="submit" className="w-full">Place Order</Button>
            </form>
          </div>

          {/* Recent Trades Ticker */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
            <div className="h-48 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Price</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRecentTrades.map((trade, index) => (
                    <TableRow key={index}>
                      <TableCell>${trade.price.toFixed(2)}</TableCell>
                      <TableCell>{trade.amount.toFixed(4)}</TableCell>
                      <TableCell>{trade.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;