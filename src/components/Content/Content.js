import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const LayoutComponent = () => {
  const [statistics, setStatistics] = useState({
    mean: {},
    median: {},
    mode: {},
    variance: {},
    standard_deviation: {},
    interquartilerange: {},
  });

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const statTypes = ['mean', 'median', 'mode', 'variance', 'standard_deviation', 'interquartilerange'];
        const promises = statTypes.map(async (statistic) => {
          const response = await axios.get(`http://localhost:5000/api/all_statistics2/${statistic}`);
          return [statistic, response.data];
        });
        const results = await Promise.all(promises);
        const updatedStatistics = Object.fromEntries(results);
        setStatistics(updatedStatistics);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    }
    fetchStatistics();
  }, []);

  const renderLineChart = (statistic) => {
    const data = Object.keys(statistics[statistic]).map((attribute) => ({
      name: attribute,
      value: statistics[statistic][attribute],
    }));

    return (
      <div className="box">
        <h3 className='statistic'>{statistic}</h3>
        <div className="chart">
          <LineChart className='linechart' width={240} height={240} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    );
  };

  return (
    <div className="layout-container">
      <div className="left-half">
        {renderLineChart('mean')}
        {renderLineChart('median')}
        {renderLineChart('mode')}
        {renderLineChart('variance')}
        {renderLineChart('standard_deviation')}
        {renderLineChart('interquartilerange')}
      </div>

      <div className="right-half">
        <div className='para'>
          <h1>About the Data</h1>
          <p>
            The dataset in question encompasses essential attributes that play a pivotal role in the evaluation and understanding of wine quality. Fixed acidity denotes the non-volatile acids, particularly tartaric acid, that contribute to the wine's overall acidity, impacting its taste and ability to age gracefully. Volatile acidity measures the presence of volatile acids, primarily acetic acid, which, if excessive, can introduce unwanted vinegar-like flavors. Citric acid, present in small quantities, enhances the wine's freshness and tartness. Residual sugar defines the wine's sweetness post-fermentation, influencing its perceived taste. Chlorides quantify the salt content, affecting mouthfeel and flavor. Free and total sulfur dioxide levels are crucial for preserving wine quality, protecting against oxidation and spoilage. Finally, the 'quality' attribute provides a subjective assessment of the wine's overall sensory appeal, vital for both consumers and winemakers seeking to produce exceptional wines. This dataset serves as a valuable resource for exploring the intricate relationships between chemical composition and wine quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;
