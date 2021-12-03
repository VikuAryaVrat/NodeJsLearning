message = module.exports;

message.success = (mesg,data) =>{
    return {
             status: "Success",
             mesg: mesg,
             data: data || []
            }
}

message.fail = (mesg) =>{
    return {
             status: "Error",
             mesg: mesg,
             data: []
            }
}

// module.exports = {success, fail};