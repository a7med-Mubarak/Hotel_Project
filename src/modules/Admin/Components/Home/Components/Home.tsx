import * as React from 'react';
import axios from "axios";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';
import { AUTH_ADMIN_ENDPOINTS } from '../../../../../utils/ENDPOINTS';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [dashboardData, setDashboardData] = React.useState<any>(null);

  const Submit = async () => {
    try {
      const response = await axios.get(AUTH_ADMIN_ENDPOINTS.CHART, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setDashboardData(response.data.data);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  React.useEffect(() => {
    Submit();
  }, []);



  const userAdminData = {
    labels: ['User', 'Admin'],
    datasets: [
      {
        label: 'Users and Admins',
        data: [300 , 131],
        backgroundColor: ['#22c55e', '#3b82f6'], 
        hoverBackgroundColor: ['#16a34a', '#2563eb'], 
      },
    ],
  };

  const userAdminOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  const bookingData = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        label: 'Booking Status',
        data: [180, 50, 35, 90], 
        backgroundColor: ['#3b82f6', '#a855f7', 'orange', 'red'], 
        hoverBackgroundColor: ['#2563eb', '#9333ea', 'orange', 'red'], 
      },
    ],
  };

  const bookingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-around px-5">
        <div className="mt-20 flex justify-around">
          <div className="w-80 bg-gray-950 h-32 rounded text-white p-8 flex justify-between">
            <div>
              <h1>
                {dashboardData ? (
                  `${dashboardData.rooms}`
                ) : (
                  <button className="bg-gray-950 ..." disabled>
                    <svg
                      className="text-black bg-white animate-spin h-5 w-5 mr-3 ..."
                      viewBox="0 0 24 24"
                    ></svg>
                  </button>
                )}
              </h1>
              <h5>Rooms</h5>
            </div>
            <div>
              <WorkOutlineIcon />
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-around">
          <div className="w-80 bg-gray-950 h-32 rounded text-white p-8 flex justify-between">
            <div>
              <h1>
                {dashboardData ? (
                  `${dashboardData.facilities}`
                ) : (
                  <button className="bg-gray-950 ..." disabled>
                    <svg
                      className="text-black bg-white animate-spin h-5 w-5 mr-3 ..."
                      viewBox="0 0 24 24"
                    ></svg>
                  </button>
                )}
              </h1>
              <h5>Facilities</h5>
            </div>
            <div>
              <WorkOutlineIcon />
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-around">
          <div className="w-80 bg-gray-950 h-32 rounded text-white p-8 flex justify-between">
            <div>
              <h1>
                {dashboardData ? (
                  `${dashboardData.ads}`
                ) : (
                  <button className="bg-gray-950 ..." disabled>
                    <svg
                      className="text-black bg-white animate-spin h-5 w-5 mr-3 ..."
                      viewBox="0 0 24 24"
                    ></svg>
                  </button>
                )}
              </h1>
              <h5>Ads</h5>
            </div>
            <div>
              <WorkOutlineIcon />
            </div>
          </div>
        </div>
      </div>

  <div className='flex justify-around mt-10 items-center'>
          <div className="w-64">
          <Doughnut data={bookingData} options={bookingOptions} />
        </div>

        <div className="w-64 mt-10">
          <Doughnut data={userAdminData} options={userAdminOptions} />
          
          <div className='flex justify-between mb-7'>
            <h4>User</h4>
            {dashboardData ? (`${dashboardData.users.user}`) : ("! loading")}
          </div>
          <div className='flex justify-between'>
            <h4>Admin</h4>
            {dashboardData ? (`${dashboardData.users.admin}`) : ("! loading")}
          </div>



        </div>
  </div>

    </>
  );
}
