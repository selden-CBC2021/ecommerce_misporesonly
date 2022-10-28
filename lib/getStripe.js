
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;


const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe('pk_test_51LA12ZJk7vanRdWtoy1EymrHMcmSiqbOT2udxK8tFHuVeqorCYCvRvWYmapcP9wu8PYOX3si1j6sbMeXZrIBAVhe00nf3uRmv6');
    }
    return stripePromise;
}

export default getStripe;