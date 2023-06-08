import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import asyncErrors from "../../../../middleware/AsyncErrors";
import { Outlet } from "react-router-dom";

export default function Home() {
  const [statistics, setStats] = useState([]);



  const months = useMemo(() => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], []
  );

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    // fetch stats
    const fetchStats = asyncErrors(async () => {
      const { data } = await axios.get("/users/stats", { cancelToken: cancelToken.token });
      data.map(item => setStats((prev) => [...prev, { name: months[item._id - 1], "Active Users": item.total }]));
    });


    fetchStats();


    return () => {
      cancelToken.cancel();
    }

  }, [months]);



  return (
    <>
      <div className="home">
        <FeaturedInfo />
        <Chart data={statistics} title="User Analytics" grid dataKey="Active User" />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
      <Outlet />
    </>
  );
}
