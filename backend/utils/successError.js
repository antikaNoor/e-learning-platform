const success = (message, data = null) => {
    return {
        success: true,
        message: message,
        data: data
    }
}

const failure = (message, error = null, resendLink = null) => {
    return {
        success: false,
        message: message,
        error: error,
        resendLink: resendLink
    }
}

module.exports = { success, failure }