import { createTransform } from 'redux-persist';

const EXPIRE_DEFAULT_KEY = 'persistedTimestamp';

/**
 * Returns the numeric value of the specified date as the number of seconds since January 1, 1970, 00:00:00 UTC
 * @param {Date} date
 */
const getUnixTime = (date) => {
    return ((date.getTime())/1000).toFixed(0);
}

/**
 * Creates transform object with defined expiry config
 * @param {string} key - reducerKey
 * @param {object} config - expiry config
 * @returns {Transform<{}, any>}
 */
const expireReduxState = (key, config) => {
    const default_config = {
        expiredState : {},
        expireKey: EXPIRE_DEFAULT_KEY,
        expireAfter : null // expiration time in seconds
    };
    config = Object.assign({}, default_config, config);
    return createTransform(
        (inbound) => {
            inbound = inbound || {};
            if (config.expireAfter && !outbound.hasOwnProperty(config.expireKey)) {
                inbound = Object.assign({}, inbound, {
                    [config.expireKey] : new Date()
                });
            }
            return inbound;
        },
        (outbound) => {
            outbound = outbound || {};
            if (config.expireAfter && !outbound.hasOwnProperty(config.expireKey)) {
                let stateAge = getUnixTime(outbound[config.expireKey]) + expireAfter;
                let current = getUnixTime(new Date());
                // if persisted state expired, set it to default state.
                if ( stateAge > current) {
                    return Object.assign({}, config.expiredState);
                }
            }
            return outbound;
        },{
            whitelist: [key]
        }
    )
};

export default expireReduxState;