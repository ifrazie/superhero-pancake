import { HomeIcon, LineChartIcon, TrendingUpIcon, BarChartIcon, NewspaperIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import MarketOverview from "./pages/MarketOverview.jsx";
import Trade from "./pages/Trade.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Market Overview",
    to: "/market-overview",
    icon: <LineChartIcon className="h-4 w-4" />,
    page: <MarketOverview />,
  },
  {
    title: "Trade",
    to: "/trade",
    icon: <TrendingUpIcon className="h-4 w-4" />,
    page: <Trade />,
  },
  {
    title: "Portfolio",
    to: "/portfolio",
    icon: <BarChartIcon className="h-4 w-4" />,
    page: <div>Portfolio Page</div>, // Placeholder for Portfolio page
  },
  {
    title: "News",
    to: "/news",
    icon: <NewspaperIcon className="h-4 w-4" />,
    page: <div>News Page</div>, // Placeholder for News page
  },
];
