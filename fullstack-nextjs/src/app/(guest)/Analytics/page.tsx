
'use client';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { useEffect } from "react"
//@ts-ignore
function Page() {
  useEffect(() => {
  //@ts-ignore

  const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-wearableapp-tbgez',
  });
  

    // embed a dashboard
    const dashboard = sdk.createDashboard({
      dashboardId: '40505bd6-ca6d-40d4-9e99-04488adf07de',
    });
    // Get dashboard container element
    const dashboardContainer = document.getElementById("dashboard");

    if (dashboardContainer) {
      // Render the dashboard into the container
      dashboard.render(dashboardContainer).catch(() => window.alert("Dashboard failed to initialize"));
    }
}, []);
return (<>
   
  <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">Dashboard</h1>
  
  <div className='w-[1500px] h-[1000px] border border-gray-400 pt-0 rounded-xl  w-full h-fit my-4  shadow-xl'>
      
     { //<iframe className='w-[1500px] h-[1100px] border border-gray-400 pt-0 rounded-xl  w-full h-fit my-4  shadow-xl' src="https://charts.mongodb.com/charts-wearableapp-tbgez/embed/dashboards?id=40505bd6-ca6d-40d4-9e99-04488adf07de&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"></iframe>  
}
    {/* Chart container */}
    <div id="dashboard" className='w-[1500px] h-[1000px] ' ></div>
     </div>
  
</>
            )
          }
        
        export default Page;        
            
