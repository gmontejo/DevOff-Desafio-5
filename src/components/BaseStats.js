import React from "react";

export default function BaseStats(props) {
  let stats = props.stats;
  let total = 0;
  return (
    <div id="statsSection" className="stats">
      <ul className="main-data">
        {stats.map((stat, i) => {
          total += stat.base_stat;
          return (
            <li key={i}>
              <span className="info-name">
                {stat.stat.name
                  .replace("special-", "Sp. ")
                  .replace("attack", "Atk")
                  .replace("defense", "def")}
              </span>{" "}
              <div className="stat-number"> {stat.base_stat}</div>
              <div className="full-bar">
                <div
                  style={{
                    height: "5px",
                    width: `${Math.floor((stat.base_stat * 100) / 180)}%`,
                    backgroundColor:
                      stat.base_stat < 50
                        ? "#ff7f0f"
                        : stat.base_stat < 80
                        ? "#ffdd57"
                        : stat.base_stat < 120
                        ? "#a0e515"
                        : "#00c2b8",
                  }}
                ></div>
              </div>
            </li>
          );
        })}
        <li>
          <span className="info-name">Total</span>{" "}
          <div className="stat-number"> {total}</div>
          <div className="full-bar">
            <div
              style={{
                height: "5px",
                width: `${Math.floor((total * 100) / (180 * 6))}%`,
                backgroundColor:
                  total < 50 * 6
                    ? "#ff7f0f"
                    : total < 80 * 6
                    ? "#ffdd57"
                    : total < 120 * 6
                    ? "#a0e515"
                    : "#00c2b8",
              }}
            ></div>
          </div>
        </li>
      </ul>
    </div>
  );
}
