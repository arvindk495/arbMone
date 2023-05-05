import React from 'react';


const Tokenomics = () => {
  return (
    <div className="container containername">
      <h1 className="title">Tokenomics</h1>
      <div className="pie-chart">
        <div className="pie-chart__legend">
        <div className="legend-item">
            <span className="legend-color legend-color--red"></span>
            <span className="legend-label">Red (70%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color legend-color--blue"></span>
            <span className="legend-label">Blue (10%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color legend-color--green"></span>
            <span className="legend-label">Green (10%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color legend-color--orange"></span>
            <span className="legend-label">Orange (10%)</span>
          </div>

        </div>
        <div className="pie-chart__chart">
          <div className="slice slice--blue">
            <div className="slice__fill"></div>
            {/* <div className="slice__percentage">30%</div> */}
          </div>
          <div className="slice slice--green">
            <div className="slice__fill"></div>
            {/* <div className="slice__percentage">20%</div> */}
          </div>
          <div className="slice slice--orange">
            <div className="slice__fill"></div>
            {/* <div className="slice__percentage">25%</div> */}
          </div>
          <div className="slice slice--red">
            <div className="slice__fill"></div>
            {/* <div className="slice__percentage">25%</div> */}
          </div>
        </div>
      </div>
      <p className="tokenDescription">Token supply: 210,000,000,000,000,000</p>
      <p className="tokenDescription">Initial circulating supply: 210,000,000,000,000,000</p>
      <p className="tokenDescription">Token distribution: Private sale (10%), Dex & Cex (10%), Development (10%), Airdrop (70%)</p>
    </div>
  );
};

export default Tokenomics;
