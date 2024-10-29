//DashboardCard.jsx
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import image11 from "../assests/image11.png";
import axios from "axios";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 460px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin: 10px;
`;

const Card = styled.div`
  background-color: #333;
  color: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const CardImage = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const CardTitle = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;

const CardValue = styled.div`
  font-size: 16px;
  color: red;
`;

const DashboardCard = ({ setDisableOrderButton }) => {
  const [customerId, setCustomerId] = useState("");
  const [membershipProductCount, setMembershipProductCount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/userinfo", { withCredentials: true })
      .then((res) => {
        setCustomerId(res.data.id);
      })
      .catch((err) => {
        console.error("Failed to fetch user info", err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (customerId) {
        try {
          // Today tasks
          const membershipResponse = await axios.get(
            `http://localhost:3000/getMembershipProductCount/${customerId}`
          );

          setMembershipProductCount(membershipResponse.data.productCount);

          // Obtaining commission
          const profitResponse = await axios.get(
            `http://localhost:3000/totalProfit/${customerId}`
          );
          setTotalProfit(profitResponse.data.totalProfit);

          // Completed Today
          setCompletedToday(profitResponse.data.totalPaidToday);

          // Available balance
          const balanceResponse = await axios.get(
            `http://localhost:3000/user/${customerId}`
          );

          setAvailableBalance(balanceResponse.data.total_profit);

          if (
            membershipResponse.data.productCount ===
            profitResponse.data.totalPaidToday
          ) {
            setDisableOrderButton(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (customerId) {
      fetchData();
    }
  }, [customerId, setDisableOrderButton]);

  return (
    <CardContainer>
      <Card>
        <CardImage src={image11} alt="Commission" />
        <CardTitle>Obtaining commission</CardTitle>
        <CardValue>${totalProfit.toFixed(2)}</CardValue>
      </Card>
      <Card>
        <CardImage src={image11} alt="Balance" />
        <CardTitle>Available balance</CardTitle>
        <CardValue>${availableBalance.toFixed(2)}</CardValue>
      </Card>
      <Card>
        <CardImage src={image11} alt="Task" />
        <CardTitle>Today's Task</CardTitle>
        <CardValue>{membershipProductCount}</CardValue>
      </Card>
      <Card>
        <CardImage src={image11} alt="Completed" />
        <CardTitle>Completed today</CardTitle>
        <CardValue>{completedToday}</CardValue>
      </Card>
    </CardContainer>
  );
};

export default DashboardCard;
