
'use client';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { useEffect } from "react"
//@ts-ignore
function Page() {
  useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: "https://charts.mongodb.com/charts-wearableapp-tbgez",
    });

    // Embed a chart
    const chart = sdk.createChart({
      chartId: "64e23012-4c49-4561-8bca-1d31cbbd9f9a",
      height: "700px"
    });

    // Get chart container element
    const chartContainer = document.getElementById("chart");

    if (chartContainer) {
      // Render the chart into the container
      chart.render(chartContainer).catch(() => window.alert("Chart failed to initialize"));
    }

    // Refresh the chart whenever #refreshButton is clicked
    const refreshButton = document.getElementById("refreshButton");

    if (refreshButton) {
      refreshButton.addEventListener("click", () => chart.refresh());
    }

    // Embed a dashboard
    const dashboard = sdk.createDashboard({
      dashboardId: "91f7a894-9e35-4311-8da2-3a2a072c3a40",
    });

    // Get dashboard container element
    const dashboardContainer = document.getElementById("dashboard");

    if (dashboardContainer) {
      // Render the dashboard into the container
      dashboard.render(dashboardContainer).catch(() => window.alert("Dashboard failed to initialize"));
    }
  }, []);
  return (
    <> 
         <div className='w-[1500px] h-[1000px] border border-gray-400 pt-0 rounded-xl  w-full h-fit my-4  shadow-xl'>
      {/* Chart container */}
      <div id="chart" ></div>

      {/* Button to refresh the chart */}
      <button id="refreshButton" >Refresh Chart</button>
    </div>
    </>

  );
}

export default Page;     
            
