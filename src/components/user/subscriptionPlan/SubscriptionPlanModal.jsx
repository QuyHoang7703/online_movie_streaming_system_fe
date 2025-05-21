import { useGetSubscriptionPlansForMovieQuery } from "@service/admin/subscriptionPlanApi";

import { useNavigate } from "react-router-dom";
import MoviePlanItem from "@components/user/subscriptionPlan/MoviePlanItem";
import SubscriptionPlanItem from "./SubscriptionPlanItem";

const SubscriptionPlanModal = ({
  movieId,
  onCancel,
  movieTitle,
  backdropUrl,
  originalTitle,
}) => {
  const navigate = useNavigate();
  const subscriptionPlanResponse =
    useGetSubscriptionPlansForMovieQuery(movieId);
  const subscriptionPlans = subscriptionPlanResponse.data?.data || [];
  console.log({ subscriptionPlans: subscriptionPlanResponse.data?.data });
  const handleSubscribe = (planId) => {
    navigate(`/user/subscription-plan/${planId}`);
    onCancel();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
      {subscriptionPlans.map((plan) => (
        // <MoviePlanItem
        //   key={plan.id}
        //   movieTitle={movieTitle}
        //   backdropUrl={backdropUrl}
        //   originalTitle={originalTitle}
        //   onCancel={onCancel}
        //   handleSubscribe={handleSubscribe}
        //   subscriptionPlan={plan}
        // />
        <SubscriptionPlanItem
          key={plan.id}
          movieTitle={movieTitle}
          backdropUrl={backdropUrl}
          originalTitle={originalTitle}
          onCancel={onCancel}
          subscriptionPlan={plan}
        />
      ))}
    </div>
  );
};

export default SubscriptionPlanModal;
