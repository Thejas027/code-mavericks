import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend API
    fetch("http://localhost:3000/admin/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        return response.json();
      })
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading dashboard data...</p>;

  if (!dashboardData) return <p>Error loading dashboard data.</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Buses: {dashboardData.totalBuses}</p>

      <h2>Students</h2>
      <ul>
        {dashboardData.students.map((student) => (
          <li key={student._id}>
            {student.name} - Assigned Bus: {student.assignedBus}- Pickup:{" "}
            {student.pickupLocation} - Drop: {student.dropLocation}
          </li>
        ))}
      </ul>

      <h2>Drivers</h2>
      <ul>
        {dashboardData.drivers.map((driver) => (
          <li key={driver._id}>
            {driver.name} - License: {driver.licenseNumber} - Assigned Bus:{" "}
            {driver.assignedBus?.busNo}
          </li>
        ))}
      </ul>

      <h2>Routes</h2>
      <ul>
        {dashboardData.routes.map((route) => (
          <li key={route._id}>
            Route ID: {route.routeId} - Stops: {route.stops.join(", ")} -
            Estimated Time: {route.estimatedTime} mins
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
