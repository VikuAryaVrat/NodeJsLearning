const success = (status,mesg, statusCode) =>{
    return {
             status: status,
             mesg: mesg,
             statusCode: statusCode,
             data: []
            }
}

const fail = (status,mesg, statusCode) =>{
    return {
             status: status,
             mesg: mesg,
             statusCode: statusCode,
             data: []
            }
}

module.exports = {success, fail};