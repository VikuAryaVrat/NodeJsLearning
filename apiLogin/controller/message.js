message = module.exports;

message.success = (message,data) =>{
    return {
             status: "success",
             message: message,
             data: data || []
            }
}

message.fail = (message) =>{
    return {
             status: "error",
             message: message,
             data: []
            }
}

// module.exports = {success, fail};