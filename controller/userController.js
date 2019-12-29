const query = require('../model/index')

//Homepage
exports.home = async function(req,res){
    let categories = await query("SELECT DISTINCT Category FROM `goods`")
    if (req.session.loggedin) {
        // console.log(res.json(categories))
        res.render('index', { title: '1958' ,categories});
	} else {
		res.redirect('/login');
	}
	res.end();
}

// Register New User
exports.register = async function(req, res){
    let {Name,Username,BD,Email,Tele, Password} = req.body
    if(!Email || !Password){
        return res.json("No Value!")
    }
    let exists =  await query("SELECT * FROM `user` WHERE `Email` = ?", [Email])
  
    if (exists.length >0){
        res.json("Already exists")
    }else{
        let result = await query("INSERT INTO `user` (`Name`, `Account`, `Password`, `Email`, `Phone`, `Birthday`) VALUES (?, ?, ?, ?,?, ?);", [Name,Username,Password,Email,Tele,BD])
        console.log("User created!")
        res.redirect('/login');
    }
}

// User Login
exports.login = async function (req, res) {
    let {Email, Password} = req.body
    let selection = await query("SELECT * FROM `user` WHERE `Email` = ?  AND `Password` = ?", [Email, Password]);
    if(selection.length > 0){
        req.session.loggedin = true;
        req.session.Email = Email;
        res.redirect('/');
    }else{
        return res.json(selection)
    }
 
}

// Update user password
exports.update = async function (req, res) {
    let userName = req.body.user_id
    let pword = req.body.password
    
    let result = await query("UPDATE `users` SET `password` = ? WHERE `users`.`username` = ?", [pword, userName])
    console.log("Password updated!")
    res.send("Account updated!")
};

// // Delete user Account
exports.delete = async function(req, res){
    let userID = req.body.user_id

    let result = await query("DELETE FROM `users` WHERE `users`.`user_id` = ?;", [userID]);
    console.log("Account deleted!")

    res.json(result)
    res.send("Account deleted!")
};