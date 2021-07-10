/**
 * This is the suite configuration
 * it is available to all test cases
 */

/**
 * Helper method to parse a string of comma seperated sub-strings as array
 * @param {string} str - The input string
 * @returns {Array}
 */
const parseArray = str => str.split(',');

/**
 * Format environment var and return its value
 * @param {string} str - The original variable name
 * @returns {string} env var value
 */
const readFromEnv = str => process.env[`${process.env.ENV}_QA_FRAMEWORK_${str}`];

/**
 * TC E2E Test Suite configuration
 * Try load from environment variables
 * when not fallback to default values
 * @type {Object}
 */
const TEST_SUITE_CONFIG = {
  SUIT_NAME: readFromEnv('SUIT_NAME') || 'TC-ConnApp',
  SEND_RESULTS_FROM: readFromEnv('SEND_RESULTS_FROM') || '',
  SEND_RESULTS_TO: readFromEnv('SEND_RESULTS_TO') ? parseArray(readFromEnv('SEND_RESULTS_TO')) : ['kranitsasthomas@gmail.com'],
  SENDGRID_API_KEY: readFromEnv('SENDGRID_API_KEY') || '',
  AWS_S3_SERVICE: {
    ACCESS_KEY_ID: readFromEnv('AWS_S3_ACCESS_KEY_ID') || '',
    SECRET_KEY: readFromEnv('AWS_S3_SECRET_KEY') || '',
    REGION: readFromEnv('AWS_S3_REGION') || 'us-west-1',
    BUCKET: readFromEnv('AWS_S3_BUCKET') || '',
  },
  // Suite specific configuration
  TC_CONN_APP: {
    URL: readFromEnv('TC_CONN_APP_URL') || 'https://connect.topcoder-dev.com',
    URL_FORGOT_PWD: readFromEnv('TC_CONN_APP_URL_FORGOT_PWD') || 'https://accounts.topcoder-dev.com/connect/forgot-password',
    URL_REGISTER: readFromEnv('TC_CONN_APP_URL_REGISTER') || 'https://accounts.topcoder-dev.com/connect/registration',
    TC_CONN_APP_VALID_LOGIN_AS_MANAGER: {
      USER: readFromEnv('TC_CONN_APP_MANAGER_USER') || 'pshah_manager',
      PASS: readFromEnv('TC_CONN_APP_MANAGER_PASS') || 'topcoder123',
      NAME: readFromEnv('TC_CONN_APP_MANAGER_NAME') || 'Parth Manager',
      AVATAR: readFromEnv('TC_CONN_APP_MANAGER_AVATAR') || 'PM',
    },
    TC_CONN_APP_VALID_LOGIN_AS_USER: {
      USER: readFromEnv('TC_CONN_APP_CUSTOMER_USER') || 'pshah_customer',
      PASS: readFromEnv('TC_CONN_APP_CUSTOMER_PASS') || 'topcoder123',
      NAME: readFromEnv('TC_CONN_APP_CUSTOMER_NAME') || 'Parth Customer',
      AVATAR: readFromEnv('TC_CONN_APP_CUSTOMER_AVATAR') || 'PC',
    },
    TC_CONN_APP_VALID_LOGIN_AS_COPILOT: {
      USER: readFromEnv('TC_CONN_APP_COPLIOT_USER') || 'pshah_copilot',
      PASS: readFromEnv('TC_CONN_APP_COPLIOT_PASS') || 'topcoder123',
      NAME: readFromEnv('TC_CONN_APP_COPILOT_NAME') || 'Parth Copilot',
      AVATAR: readFromEnv('TC_CONN_APP_COPILOT_AVATAR') || 'PC',
    }
  }
};

// Export it in test context
if (module.parent.context) {
  const { context } = module.parent.context;
  context.TEST_SUITE_CONFIG = TEST_SUITE_CONFIG;
}
// Export configuration as module
module.exports = TEST_SUITE_CONFIG;
