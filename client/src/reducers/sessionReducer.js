import { saveSettings } from '../shared/requests';

const INITIAL_STATE = {
    token: null,
    checkoutInfo: {
        itemPrice: null,
        storeId: null,
        offerId: null,
        itemName: null,
        itemFullPrice: null
    },
    settings: {
        radius: 5,
        lat: 0,
        lng: 0
    },
    role: 'USER',
};

const setToken = (state, action) => ({
    ...state,
    token: action.token,
});

const setCheckoutInfo = (state, action) => ({
    ...state,
    checkoutInfo: action.checkoutInfo,
});

const setSettings = (state, action) => ({
    ...state,
    settings: action.settings,
});

const setRole = (state, action) => ({
    ...state,
    role: action.role,
});

function sessionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_TOKEN': {
            return setToken(state, action);
        }
        case 'SET_CHECKOUT_INFO': {
            return setCheckoutInfo(state, action);
        }
        case 'SET_SETTINGS': {
            saveSettings(state.token, action.settings);
            return setSettings(state, action);
        }
        case 'SET_ROLE': {
            return setRole(state, action);
        }
        default:
            return state;
    }
}

export default sessionReducer;
