import React, { useState, useEffect } from 'react'

import { DisplayCampaigns, FundCard } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  console.log(getCampaigns)

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }
  <FundCard/>


  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);
}

export default Home