import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axiosInstance";

type From = {
  _id: string;
  username: string;
  email: string;
};

type Req = {
  _id: string;
  type: string;
  message: string;
  to: string;
  from: From | null;
  courseID: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const AdminSubscriptionRequestsMolecule = () => {
  const [subscription, setSubscription] = useState<Req[]>([]);

  const state = useSelector((state: any) => state.user);
  const checkString = state.token;

  useEffect(() => {
    const fetchSubscriptionReq = async () => {
      try {
        const response = await axiosInstance.get(
          "/notification/show-all-subscription-request",
          {
            headers: {
              Authorization: `Bearer ${checkString}`,
              "Content-Type": "application/json",
            },
          }
        );
        setSubscription(response.data.data);
      } catch (error) {
        console.error("Error fetching subscription requests:", error);
      }
    };

    fetchSubscriptionReq();
  }, [checkString]);

  console.log(subscription);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Subscription Requests</h1>
        {subscription.length > 0 ? (
          <div className="mt-6">
            {subscription.map((req: Req) => (
              <div key={req._id} className="flex flex-col gap-3 shadow-md p-3">
                {req.from && (
                  <div>
                    <p>Student: {req.from.username}</p>
                    <p>{req.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>No Subscription Requests</p>
          </div>
        )}
      </div>
  );
};

export default AdminSubscriptionRequestsMolecule;
