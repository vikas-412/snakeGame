module.exports = (app)=>{
    return {
        authCtrl : require('./auth.controller')(app)
    }
}