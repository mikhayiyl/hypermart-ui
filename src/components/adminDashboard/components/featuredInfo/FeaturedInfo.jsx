import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import asyncErrors from "../../../../middleware/AsyncErrors";
import axios from "axios";


export default function FeaturedInfo() {
  const [income, setIncome] = useState([{ _id: 1, total: 0 }, { _id: 2, total: 0 }]);
  const [percent, setPercent] = useState(0);


  useEffect(() => {
    // fetch stats
    const cancelToken = axios.CancelToken.source();

    const fetchIncome = asyncErrors(async () => {
      const { data } = await axios.get("/orders/income", { cancelToken: cancelToken.token });
      setIncome(data);

      //percent =( latest sales * 100) / previous sales - 100;
      data.length > 1 && setPercent((data[1].total * 100) / data[0].total - 100);

    });

    fetchIncome();

  }
    , []);



  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income.length > 1 ? income[1].total : 0}</span>
          <span className="featuredMoneyRate">
            % {Math.round(percent)}{percent < 0 ? <ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}

          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
