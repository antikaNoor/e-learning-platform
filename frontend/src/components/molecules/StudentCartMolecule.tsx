import { useEffect, useState } from "react";
import useSubscription from "../../hooks/SubscriptionHooks"
import { useSelector } from "react-redux"

type Carts = {
    _id?: string;
    studentID?: string;
    courseID?: {
        title?: string;
        thumbnail?: string;
        topicName?: string;
        description?: string;
        _id?: string;
        rating?: number;
        language?: string;
    }
}
const StudentCartMolecule = () => {
    const { getYourCart } = useSubscription();
    const [carts, setCarts] = useState<Carts[]>([]);

    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    useEffect(() => {
        getYourCart(checkString).then((data: Carts[] | void) => {
            if (Array.isArray(data)) {
                setCarts(data);
            }
        });
    }, []);
    console.log(carts)
    return (
        <div>
            {/* show the cart on the div*/}
        </div>
    )
}

export default StudentCartMolecule