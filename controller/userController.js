const query = require('../model/index')

//Homepage
exports.home = async function(req,res){
    let categories = await query("SELECT DISTINCT Category FROM `goods`")
    let goods = await query("SELECT * FROM `goods`")
    if (req.session.loggedin) {
        // console.log(res.json(categories))
        res.render('index', { title: '1958' ,cats:categories, product:goods});
	} else {
		res.redirect('/login');
	}
	res.end();
}

exports.search = async function(req,res){
    let results = await query("SELECT * FROM `goods` WHERE `Category` LIKE '%遊%' OR `Description` LIKE '%遊%' OR `Name` LIKE '%遊%'")
    let cresults = await query("SELECT * FROM `goods` WHERE `Category` LIKE '%遊%'")
}

exports.cart = async function(req,res){

}

// USERS
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
        req.session.Id = selection[0].Id;
        res.redirect('/');
    }else{
        res.redirect('/login')
    }
 
}

// Update user password
exports.update = async function (req, res) {
    let Password = req.body.Password
    
    let result = await query("UPDATE `users` SET `Password` = ? WHERE `users`.`Id` = ?", [Password, req.session.Id])
    console.log("Password updated!")
    res.send("Account updated!")
};

// // Delete user Account
exports.delete = async function(req, res){
    let Email = req.body.Email

    let result = await query("DELETE FROM `users` WHERE `users`.`Id` = ?;", [req.session.Id]);
    console.log("Account deleted!")

    res.json(result)
    res.send("Account deleted!")
};

// PRODUCT

exports.product = async function(req,res){
    console.log(req.params)
    let ID = req.params.id
    let good = await query("SELECT * FROM `goods` WHERE `Id`=?", [ID])
    res.render('product', { title: '1958' ,prod: good});
}

exports.newproduct = async function(req,res){
    let categories = await query("SELECT DISTINCT Category FROM `goods`")
    if (req.session.loggedin) {
        // console.log(res.json(categories))
        res.render('upload', { title: '1958' ,cats:categories});
	}else{
        res.redirect('/login')
    }
}

exports.upload = async function(req, res){
    console.log(req.body);
    let {Picture, Name, Price, Category, GameName, Description, Quantity, Date} = req.body;
    if (!Name || !Price || !Category || !GameName || !Description || !Quantity || !Date)
    {
       return res.json("No Value!")
    }
    let selection = await query("SELECT `Id` FROM `user` WHERE `Email` = ?", [req.session.Email]);
    let result = await query("INSERT INTO `goods` (`Name`, `Category`, `Price`, `Game`, `Description`, `Quantity`, `Picture`, `Date`, `Seller_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [Name, Category, Price, GameName, Description, Quantity, Picture, Date, selection.Id]);
    let good = await query("SELECT * FROM `goods` WHERE `Name`= ? AND `Category` = ? AND `Price` = ? AND `Game` = ? AND `Description` = ? AND `Quantity` = ? AND `Seller_id` = ?", [Name, Category, Price, GameName, Description, Quantity, selection.Id])
    console.log("Goods Inserted")
    res.render('product', { title: '1958' ,prod: good});
  }