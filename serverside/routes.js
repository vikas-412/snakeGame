const controllers = require ('./controllers')

module.exports = (app)=>{
    const { authCtrl } = controllers(app);
    app.post('/signup', authCtrl.signup);
    app.post('/login', authCtrl.login);
    app.get('/', (req,res)=>{res.send("challe hai")});
}